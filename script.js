const wideDiv = document.querySelector('.wide-div');
const modifyStyleRightValue = (() => wideDiv.style.right = '0px')(); //style.right's value is ('') by default
const getStyleRightValue = () => wideDiv.style.right; 

const rightBtn = document.querySelector('.right-btn');
const leftBtn = document.querySelector('.left-btn');
rightBtn.addEventListener( 'click', () => moveRight() );
leftBtn.addEventListener( 'click', () => moveLeft() );

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


let countingUp;
let countingDown;
let counter = 0;
const timeoutBtn = document.querySelector('.auto-timeout-btn');
timeoutBtn.addEventListener('click', () => {
    countUp();

    function countUp() {
        clearInterval(countingDown);
        countingUp = setInterval(() => {
            if (counter == 2) {
                clearInterval(countingUp);
                counter--;
                moveLeft();
                countDown();
                console.log('counting down, now at img: ' + counter);
            } else {
                counter++;
                moveRight();
                console.log('counting up, now at img: ' + counter);
            }
        }, 3000);
    }

    function countDown() {
        clearInterval(countingUp);
        countingDown = setInterval(() => {
            if (counter == 0) {
                clearInterval(countingDown);
                counter++;
                moveRight();
                countUp();   
                console.log('counting up, now at img: ' + counter);
            } else {
                counter--;  
                moveLeft();
                console.log('counting down, now at img: ' + counter);
            }    
        }, 3000);
    }

});

const stopAutoBtn = document.querySelector('.stop-auto-btn');
stopAutoBtn.addEventListener('click', () => {
    clearInterval(countingUp);
    clearInterval(countingDown);
    console.log('Stopping Auto-advance');
});


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


/* -ACHIEVED-
I want counter to start from 0 and count up to 2, like this: 0 -> 1 -> 2
when counter reaches 2, I want the code to count down to 0, like this: 2 -> 1 -> 0
when it reaches 0 it starts to go up to 2 again, when it reaches 2 it counts back down to 0
I want it to keep looping indefinitely until I tell the code to stop
*/

// let counter = 0;
// let countingUp;
// let countingDown;

// function countUp() {
//     clearInterval(countingDown);
//     countingUp = setInterval(() => {
//         if (counter == 2) {
//             console.log('now at img: ' + counter);
//             clearInterval(countingUp);
//             counter--;
//             countDown();
//         } else {
//             console.log('counting up, now at img: ' + counter);
//             counter++;
//         }
//     }, 2000);
// }

// function countDown() {
//     clearInterval(countingUp);
//     countingDown = setInterval(() => {
//         if (counter == 0) {
//             console.log('now at img: ' + counter);
//             clearInterval(countingDown);
//             counter++;
//             countUp();   
//         } else {
//             console.log('counting down, now at img: ' + counter);
//             counter--;  
//         }    
//     }, 2000);
// }


//-------------------------

//might be good idea to: write up an explanation of how my code works, explaining all of its different parts for the sake of my future self coming back to this mini project

//navigation dots TO DO TASK: Make each circle link to that particular slide, so you can click on the circle and it will jump to that slide.


//something im probably going to have to fix up: the website is able to scroll to the right because the wide-div is wide
//something to note: on page refresh, clicking left or right btn initially loads the next image slow