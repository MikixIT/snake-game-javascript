const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const scoreHTML = document.querySelector("#score")

 class SnakePart{
     constructor (x ,y){
        this.x = x;
        this.y = y;
     }
 }

/* 
 Obiettivo 🎯:
                °Creare la schermata di gameover 🔴
                °Serpente che quando collide su stesso crepa 💀
                °Serpente non deve muover sopra se stesso 🔴
                °Serpente che esce fuori dal gioco crepa 💀  ✅
                °Score fuori da canva 👾

*/

var colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

let speed = 6;

let tileCount = 20;
let tileSize = canvas.width / tileCount -2;

//snake
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

//fruit
let fruitX = 5;
let fruitY = 5;

//special fruit
let fruitSPX = 7;
let fruitSPY = 7;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

//game loop
let drawGame = () => {
     changeSnakePosition();
     let result = isGameover();
     if(result){
        return;
     }
     clearScreen();
     drawSnake();
     drawFruit();
     drawScore();

     checkFruitCollision();
     setTimeout(drawGame, 1000/ speed);
}

let isGameover = () => {
    let gameOver = false;

    if( yVelocity === 0 && xVelocity === 0){
        return false;
    }

    //walls
    if(headX < 0 || headY < 0){
        gameOver = true;
    }
    //tail
    else if(headX === tileCount){
        gameOver = true;
    }
    //collision with himself
    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }


    return gameOver;
}

let clearScreen = () => {
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0, canvas.clientWidth, canvas.clientHeight);
}

let drawScore = () => {
    scoreHTML.innerHTML= score + "<span> Points </span>";  
}


let drawSnake = () => {
    ctx.fillStyle = 'orange'
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX, headY)); 
    while(snakeParts.length > tailLength){
        snakeParts.shift(); 
    }

}

let changeSnakePosition = () => {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

let drawFruit = () => {
    ctx.fillStyle = 'red'
    ctx.fillRect(fruitX * tileCount, fruitY * tileCount, tileSize, tileSize)
}

//FRUTTO SPECIAL CHE DA 5 PUNTI!
// let drawFruitSP = () => {
//     ctx.fillRect = 'white'
//     ctx.fillRect(fruitSPX * tileCount, fruitSPY * tileCount, tileSize, tileSize)
// }



 let checkFruitCollision = () => {
     if(fruitX == headX && fruitY == headY){
        fruitX = Math.floor(Math.random() * tileCount);
        fruitY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
     }
 }



// keys trigger
 let keyDown = (event) =>{

    //Arrow Up 
    if(event.keyCode == 38){  
        yVelocity = -1;
        xVelocity = 0;
        return
    }
         
    //Arrow Down 
    if(event.keyCode == 40){  
        yVelocity = 1;
        xVelocity = 0;
        return
    }

    //Arrow Left 
    if(event.keyCode == 37){  
        yVelocity = 0;
        xVelocity = -1;
        return
    }

    //Arrow Right
    if(event.keyCode == 39){  
        yVelocity = 0;
        xVelocity = +1;
        return
    }
}



document.body.addEventListener("keydown", keyDown);


drawGame() 


//request Animation Frame

//setInterval xtimes for a second
