const wideDiv = document.querySelector('.wide-div');
const modifyStyleRightValue = (() => wideDiv.style.right = '0px')(); //style.right's value is ('') by default
const getStyleRightValue = () => wideDiv.style.right; 

const rightBtn = document.querySelector('.right-btn');
const leftBtn = document.querySelector('.left-btn');
rightBtn.addEventListener( 'click', () => {
    changeImage.right();
    showCurrentImage(); 
    showCurrentNavDot();
});
leftBtn.addEventListener( 'click', () => {
    changeImage.left(); 
    showCurrentImage();
    showCurrentNavDot();
});

const changeImage = (function() {
    const isFurthestLeftImage = () => wideDiv.style.right == '0px';
    const isFurthestRightImage = () => wideDiv.style.right == '800px';
    function left() {
        if ( !isFurthestLeftImage() ) {
            let pixelVal = pixelSize.decrease(getStyleRightValue(), 400);
            wideDiv.style.right = pixelVal;
        }
    }
    function right() {
        if ( !isFurthestRightImage() ) {
            let pixelVal = pixelSize.increase(getStyleRightValue(), 400);
            wideDiv.style.right = pixelVal;
        }
    }
    return {left, right};
})();

const pixelSize = (function() {
    function increase(input, amount) {
        let stringNum = input.slice(0, -2);     //slices out the 'px' from the string
        return (Number(stringNum) + amount) + 'px'; 
    }
    function decrease(input, amount) {
        let stringNum = input.slice(0, -2)
        return (Number(stringNum) - amount) + 'px'; 
    }
    return {increase, decrease}
})();


const img1 = document.querySelector('.img1');
const img2 = document.querySelector('.img2');
const img3 = document.querySelector('.img3');
const currentImage = (function() {
    const isImg1 = () => (wideDiv.style.right == '0px');
    const isImg2 = () => (wideDiv.style.right == '400px');
    const isImg3 = () => (wideDiv.style.right == '800px');
    return { isImg1, isImg2, isImg3 }
})();

function showCurrentImage() {
    if ( currentImage.isImg1() ) {
        img1.style.visibility = 'visible';
        img2.style.visibility = 'hidden';
        img3.style.visibility = 'hidden';
    } else if ( currentImage.isImg2() ) {
        img1.style.visibility = 'hidden';
        img2.style.visibility = 'visible';
        img3.style.visibility = 'hidden';
    } else if ( currentImage.isImg3() ) {
        img1.style.visibility = 'hidden';
        img2.style.visibility = 'hidden';
        img3.style.visibility = 'visible';
    }
};

const navdot1 = document.querySelector('.img1-navdot');
const navdot2 = document.querySelector('.img2-navdot');
const navdot3 = document.querySelector('.img3-navdot');
const initialiseNavDot = (()=> navdot1.style.border = '1px solid red')();
function showCurrentNavDot() {
    if (currentImage.isImg1()) {
        navdot1.style.border = '1px solid red';
        navdot2.style.border = '';
        navdot3.style.border = '';
    } else if (currentImage.isImg2()) {
        navdot1.style.border = '';
        navdot2.style.border = '1px solid red';
        navdot3.style.border = '';
    } else if (currentImage.isImg3()) {
        navdot1.style.border = '';
        navdot2.style.border = '';
        navdot3.style.border = '1px solid red';
    }
}

//what i'm  trying to do rn: hide every img, and only show the one that is in the centre/picture-frame
//something im probably going to have to fix up: the website is able to scroll to the right because the wide-div is wide

//something to note: on page refresh, clicking left or right btn initially loads the next image slow