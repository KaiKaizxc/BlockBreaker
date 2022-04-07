const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 560;
const boardHeight = 300;
const userStart = [230, 10];
let currentPosition = userStart;
let timerId;
let xDirection = 2;
let yDirection = 2;
let ballDiameter = 20;
let score = 0;
//ball stats here 

const ballStart = [230, 40];
let ballCurrentPosition = ballStart;

//create Block class 
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];

    }
}

// all my array of blocks 
const blocks = [
    // row 1

    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

    // row 2

    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),

    //row 3 

    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),


]
//create block

console.log(blocks[0]);

function createBlocks() {



    for (let i = 0 ; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';


        grid.appendChild(block);
    }
}


createBlocks();

//add user 
const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);


//update the user position 


function drawUser() {
    user.style.left = currentPosition[0] + 'px';
    user.style.bottom = currentPosition[1] + 'px';
}

// update the ball position

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

console.log(user.style.width);
//move user
function moveUser(event) {
    switch(event.key) {
        case 'ArrowLeft' :
            // currentPosition[0] -= 10;
            // drawUser();
            if (currentPosition[0] > 0) {
                currentPosition[0] -= 10;
                drawUser();
            }
            break;
        
        case 'ArrowRight' :
            if (currentPosition[0] < boardWidth-blockWidth) {
                currentPosition[0] += 10;
                drawUser();
                break;
            }

    }
}

document.addEventListener('keydown', moveUser);

// add ball 
const ball = document.createElement('div');
ball.classList.add('ball');


grid.appendChild(ball);


//move the ball

function  moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}


timerId = setInterval(moveBall, 15);

// check for collisions 

function checkForCollisions() {
    // check for block collisions 
    for (let i = 0; i<blocks.length; i++) {
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0]) && 
            ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'));

            allBlocks[i].classList.remove('block');
            blocks.splice(i,1);
            changeDirection();
            score++;
            scoreDisplay.innerHTML = score;

            //check for win 
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = "You win!";
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
            }
        }
    }



    //check for user collisions

    if (
        (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
        (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ) {
        changeDirection();
    }




    if (
        ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiameter) || 
        ballCurrentPosition[0] <= 0) {
        changeDirection() 
    }
    //check for game over 

    if (ballCurrentPosition[1] <= 0 ) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = 'You Lose';

        document.removeEvenetListener
    }


    
}


function changeDirection() {
    if (xDirection === 2  && yDirection === 2) {
        yDirection = -2;
        return;
    }

    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }

    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }

    if (xDirection === -2 && yDirection ===2) {
        xDirection = 2;
        return;
    }
}
