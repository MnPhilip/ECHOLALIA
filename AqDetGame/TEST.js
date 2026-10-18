//alert("Test of JS file worksssss");
document.addEventListener('DOMContentLoaded', () => {
    alert("DEBUG SPACE LOADED");
    start();
})


const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); 

const rectSize = 60;
var rectX;
var rectY;
const moveDistance = 5;

// Physics Contants
// Downward speed is added for each frame 
const gravity = 0.5;
const max_fall_speed = 12;
// Spacebar upward push
const jump_strength = 10;

// Physics State
let velocityY = 0;
let gameStart = false;

function spawn(){
    rectX = 23; 
    rectY = canvas.height/2;
    velocityY = 0;
}

function gravUpdate() {
    velocityY += gravity;
    if (velocityY > max_fall_speed) {
        velocityY = max_fall_speed;
    }
    //Update rectY by velocityY
    rectY += velocityY;
}

function updatePhysics() {

    gravUpdate();

    //If the square's bottom edge (rectY + rectSize) is below the bottom of the canvas (canvas.height), set rectY to canvas.height - rectSize and velocityY to 0
    if (rectY + rectSize > canvas.height) {
        // The square is below the bottom of the canvas
        rectY = canvas.height - rectSize;
        // Square stops falling
        velocityY = 0;
    }

    //Keep it from flying off the TOP (rectY < 0)
    if (rectY < 0) {
        rectY = 0;
        velocityY = 0;
    }
}


//const moveDistance = 5; 


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//let gameStart = false;

//function spawn(){
//   rectX = 23;
//    rectY = canvas.height/2;
//
//    ctx.fillStyle = "green";
//    ctx.fillRect(rectX, rectY, rectSize, rectSize);
//
//}

function start(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(!gameStart){
        ctx.fillStyle = "Black";
        ctx.font = "80px Arial";
        ctx. textAlign = "center";
        ctx.textBaseline = "middle"; //These elements will be replaced with function calls for printing the PC assets to the screen
        ctx.fillText("PRESS ENTER TO START", canvas.width/2, canvas.height/2);// DEBUG STATEMENT TESTING RESPONSIVENESS
    } else{
        spawn();
        updatePhysics();
    }
    requestAnimationFrame(start);
}

function reRender(movePosX, movePosY){
    rectX += movePosX;
    rectY += movePoxY;
    ctx.fillRect(rectX, rectY, rectSize, rectSize);
}

function move(moveKey){
    if (moveKey.key == "w"){
        reRender(0, moveDistance);
    } else if (moveKey.key == "a"){
	reRender(-moveDistance, 0);
    } else if (moveKey.key == "s"){
	reRender(0, -moveDistance);
    } else if (moveKey.key == "d"){
	reRender(moveDistance, 0);
    }
}

function jump() {
    velocityY = -jump_strength;
}

function interact() {
    const touchObject = 
    rectX < object.x + object.size &&
    rectX + rectSize > object.x &&
    rectY < object.y + object.size &&
    rectY + rectSize > object.y;

    interactMessage = "You interacted with the object!";
}


window.addEventListener("keydown", (e) =>{
    if(e.key === "Enter"){
        gameStart = true; 
        spawn();
    } else if(e.key == "w" || e.key == "a" || e.key == "s" || 
    	e.key == "d" || e.key == " " || e.key == "e" ){
            
        move(e);
    }

//respawn function
let RESPAWN_X = 0;
let RESPAWN_Y = 0;

function saveRespawnCoordinates(x, y) {
  RESPAWN_X = x;
  RESPAWN_Y = y;
}

    //WASD Movement 

    //But update() and draw() should handle the movement and drawing, not reRender()
});
