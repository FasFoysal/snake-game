'use strict';
// --------- game condition-------
// --------const file------
const eat = new Audio('../sound/food.mp3');
const move = new Audio('../sound/move.mp3');
const backSound = new Audio('../sound/music.mp3');
backSound.volume = 0.2
const gameOver = new Audio('../sound/gameover.mp3');

// -----let file------
let exes = { x: 0, y: 0 };
let lastTime = 0;
let snakeArr = [
    { x: 10, y: 10 }
];
let foodOb = { x: 5, y: 12 };
let snakeBox = document.getElementById('snakBox');
let gamePoint = 0;
let gameOut = document.getElementById('gameOver');
let newScore = document.getElementById('newScore');
let highScore = document.getElementById('highScore');
let score = 0;
let newhighScore = 0;

// -------runtime----
function againCall(time) {
    window.requestAnimationFrame(againCall);
    if ((time - lastTime) / 400 < 1 / 4) {
        return
    }
    lastTime = time;
    gameLogic()
}
// -------- output------- 
function gameLogic() {

    // make snake
    snakeBox.innerHTML = '';
    snakeArr.forEach((p, inNo) => {
        let snEle = document.createElement('div');
        snEle.style.gridRowStart = p.y;
        snEle.style.gridColumnStart = p.x;
        if (inNo === 0) {
            snEle.classList.add('head')
        } else {
            snEle.classList.add('line')
        }
        snakeBox.appendChild(snEle);

    })

    // make food
    let foodEl = document.createElement('div');
    foodEl.classList.add('food')
    foodEl.style.gridRowStart = foodOb.x;
    foodEl.style.gridColumnStart = foodOb.y;
    snakeBox.appendChild(foodEl);

    // movie the snake
    for (let sum = snakeArr.length - 2; sum >= 0; sum--) {
        snakeArr[sum + 1] = {...snakeArr[sum] }
    }
    snakeArr[0].x += exes.x;
    snakeArr[0].y += exes.y;

    // eat food ganerate new food , update score , snake add food in back
    // snake add food in back
    if (snakeArr[0].x == foodOb.y && snakeArr[0].y == foodOb.x) { //changing x y
        score += 1;
        snakeArr.unshift({ x: snakeArr[0].x + exes.x, y: snakeArr[0].y + exes.y })
        eat.play();

        //ganerate new food
        let a = 1;
        let b = 19;
        foodOb = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }

        // score add
        newScore.innerHTML = `New Score: ${score}`
    }
    // high score

    if (score > newhighScore) {
        newhighScore++;
        newhighScore.innerHTML = ` High score: ${newhighScore}`
    } else {
        highScore.innerHTML = ` High score: ${newhighScore}`
    }

    // game over
    if (over(snakeArr)) {
        gameOver.play();
        backSound.pause();
        score = 0;
        newScore.innerHTML = `New Score: ${score}`
        exes = { x: 0, y: 0 };
        // alert("game over")
        snakeArr = [
            { x: 10, y: 8 }
        ];
        backSound.play;
        gamePoint = 0;
        gameOut.style.display = 'block';
    }
}

// keybord arryKey responce
window.addEventListener("keydown", f => {
    exes = {
        x: 0,
        y: 0
    }
    gameOut.style.display = 'none';
    move.play();
    backSound.play();
    switch (f.key) {
        case 'ArrowUp':
            exes.x = 0;
            exes.y = -1;
            break;
        case 'ArrowLeft':
            exes.x = -1;
            exes.y = 0;
            break;
        case 'ArrowRight':
            exes.x = 1;
            exes.y = 0;
            break;
        case 'ArrowDown':
            exes.x = 0;
            exes.y = 1;
            break
        default:
            break;
    }
})

// game over function
function over(snake) {
    //    wall touch gameOver
    if (snake[0].x > 23 || snake[0].x < 0 || snake[0].y > 23 || snake[0].y < 0) {
        return true;
    }
    // touch gameOver
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}
window.requestAnimationFrame(againCall);