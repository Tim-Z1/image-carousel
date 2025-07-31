const wideDiv = document.querySelector('.wide-div');
const modifyStyleRightValue = (() => wideDiv.style.right = '0px')(); //style.right's value is ('') by default
const getStyleRightValue = () => wideDiv.style.right; 

const rightBtn = document.querySelector('.right-btn');
const leftBtn = document.querySelector('.left-btn');
rightBtn.addEventListener( 'click', () => {
    moveRight();
    currentImgCounter++; 
});
leftBtn.addEventListener( 'click', () => {
    moveLeft();
    currentImgCounter--; 
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
const initialiseNavDot = ( () => navdot1.style.border = '1px solid red' )();

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

navdot1.addEventListener('click', () => {
    wideDiv.style.right = '0px';
    showCurrentImage(); 
    showCurrentNavDot();
    currentImgCounter = 0;
});
navdot2.addEventListener('click', () => {
    wideDiv.style.right = '400px';
    showCurrentImage(); 
    showCurrentNavDot();
    currentImgCounter = 1;
});
navdot3.addEventListener('click', () => {
    wideDiv.style.right = '800px';
    showCurrentImage(); 
    showCurrentNavDot();
    currentImgCounter = 2;
});

let countingUp;
let countingDown;
let currentImgCounter = 0;
const autoNotifyMsg = document.querySelector('.auto-notification');
const timeoutBtn = document.querySelector('.auto-timeout-btn');
timeoutBtn.addEventListener('click', () => {
    console.log('Activating auto-advance.');
    autoNotifyMsg.style.visibility = 'visible';
    rightBtn.style.visibility = 'hidden';
    leftBtn.style.visibility = 'hidden';
    timeoutBtn.style.visibility = 'hidden';
    stopAutoBtn.style.visibility = 'visible';

    countUp();
    function countUp() {
        clearInterval(countingDown);
        countingUp = setInterval(() => {
            if (currentImgCounter == 2) {
                clearInterval(countingUp);
                currentImgCounter--;
                moveLeft();
                countDown();
                console.log('counting down, now at img: ' + currentImgCounter);
            } else {
                currentImgCounter++;
                moveRight();
                console.log('counting up, now at img: ' + currentImgCounter);
            }
        }, 3000);
    }

    function countDown() {
        clearInterval(countingUp);
        countingDown = setInterval(() => {
            if (currentImgCounter == 0) {
                clearInterval(countingDown);
                currentImgCounter++;
                moveRight();
                countUp();   
                console.log('counting up, now at img: ' + currentImgCounter);
            } else {
                currentImgCounter--;  
                moveLeft();
                console.log('counting down, now at img: ' + currentImgCounter);
            }    
        }, 3000);
    }

});

const stopAutoBtn = document.querySelector('.stop-auto-btn');
stopAutoBtn.addEventListener('click', () => {
    clearInterval(countingUp);
    clearInterval(countingDown);
    console.log('Stopping Auto-advance.');
    autoNotifyMsg.style.visibility = 'hidden';
    timeoutBtn.style.visibility = 'visible';
    stopAutoBtn.style.visibility = 'hidden';
    rightBtn.style.visibility = 'visible';
    leftBtn.style.visibility = 'visible';
});

// autoNotifyMsg.style.visibility = 'visible';
// timeoutBtn.style.visibility = 'hidden';
// stopAutoBtn.style.visibility = 'visible';
// rightBtn.style.visibility = 'hidden';
// leftBtn.style.visibility = 'hidden';


function moveRight(){
    changeImage.right();
    showCurrentImage(); 
    showCurrentNavDot();
};
function moveLeft(){
    changeImage.left(); 
    showCurrentImage();
    showCurrentNavDot();
};




//-------------------------
// to do: use CSS, probably flexbox to center the h1 header and auto-notification msg

//something to note: on page refresh, clicking left or right btn initially has a delay when loading the next image