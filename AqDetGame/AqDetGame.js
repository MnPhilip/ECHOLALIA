//alert("Test of JS file worksssss");
document.addEventListener('DOMContentLoaded', () => {
    alert("DEBUG SPACE LOADED");
})


//Consider this function the Main of the entire game AND the infinite "While loop" that will call
//      All natually-occuring events like gravity, enemy movement, and stuff like water currents
window.main = () => {
    stopMain = window.requestAnimationFrame(main);
    // alert(counter);
    counter++;
    // updatePhysics();
    
    window.cancelAnimationFrame(stopMain);
    
    
}

function start(){
    playerPH.clearRect(0, 0, canvas.width, canvas.height);
    if(!gameStart){
        playerPH.fillStyle = "Black";
        playerPH.font = "80px Arial";
        playerPH.textAlign = "center";
        playerPH.textBaseline = "middle"; //These elements will be replaced with function calls for printing the PC assets to the screen
        playerPH.fillText("PRESS ENTER TO START", canvas.width/2, canvas.height/2);// DEBUG STATEMENT TESTING RESPONSIVENESS
    } else{
        spawn();
    }
    
    //requestAnimationFrame(start);
}



const canvas = document.getElementById('PlrDisplay');
const playerPH = canvas.getContext("2d"); 

const rectSize = 60;
var replayerPH; //player PlaceHolder
var rectY;
var gravVector;

var RESPAWN_X;
var RESPAWN_Y;
//0,0, IS TOP LEFT

const moveDistance = 15; 

counter = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameStart = false;

function spawn(){
    replayerPH = 23;
    rectY = canvas.height/2;

    playerPH.fillStyle = "green";
    playerPH.clearRect(0, 0, canvas.width, canvas.height);
    playerPH.fillRect(replayerPH, rectY, rectSize, rectSize);

    
    // canvasTemp = document.getElementById("LayoutDisplay");
    // playerPHTEMP = canvasTemp.getContext("2d"); 
    // playerPHTEMP.fillStyle("red");
    // playerPHTEMP.fillRect(300, 300, rectSize, rectSize);
}

function respawn(){
    findRespawn();
    removeOldCharacter();
    replayerPH = RESPAWN_X;
    rectY = RESPAWN_Y;
    reRender(0, 0);
}

function saveRespawnCoordinates(x, y) {
  RESPAWN_X = x;
  RESPAWN_Y = y;
}

function findRespawn(){
    var newResX;
    var newResY;
    if (replayerPH >= 400){
        newResX = 700;
    }
    else if (replayerPH < 400){
        newResX = 100;
    }

    if (rectY >= 500){
        newResY = 900;
    }
    else if (rectY < 500){
        newResY = 100;
    }
    saveRespawnCoordinates(newResX, newResY);
}

function removeOldCharacter() {
//   if (!player) return; // nothing to remove

//   // stop anything still running on the old PC
//   player.stopAnimations();
//   player.detachInputHandlers();

//   // take it out of the game and release the reference
//   removeFromEntityList(player);
//   player = null;
  playerPH.clearRect(replayerPH, rectY, canvas.width, canvas.height);
//   respawn();
}


function reRender(movePosX, movePosY){
    playerPH.clearRect(replayerPH, rectY, rectSize, rectSize);
    replayerPH += movePosX;
    rectY += movePosY;
    playerPH.fillStyle = "green";
    playerPH.fillRect(replayerPH, rectY, rectSize, rectSize);
}

function pcInteract()
{   
        alert(replayerPH);
        alert(rectY);
        alert("Interact Key Pressed!");
}

function move(moveKey){
    if (moveKey.key == "w"){
        reRender(0, -moveDistance);
    } else if (moveKey.key == "a"){
	reRender(-moveDistance, 0);
    } else if (moveKey.key == "s"){
	reRender(0, moveDistance);
    } else if (moveKey.key == "d"){
	reRender(moveDistance, 0);
    }
}

window.addEventListener("keydown", (e) =>{
    main();
    if(e.key === "Enter" && !gameStart){
        gameStart = true; 
        spawn();
    } else if(e.key == "w" || e.key == "a" || e.key == "s" || 
    	e.key == "d"){
        move(e);
    } else if (e.key === " ") { //Space Entered - call jump
        // reRender(0, -50);Jump no longer needed
    } else if (e.key == "e") { //'e' key pressed, call enter
        pcInteract();
    } else if (e.key == 'c')
    {
        respawn();
    }
    else {}
})

//DECOMMISIONED - Gravity Function, can be used as a reference for pushing the PC in a direction
// function gravUpdate() {
//     if (rectY < 1400) {
//         gravVector = 10;
//         reRender(0, gravVector);
//     }
// }

// function updatePhysics() {
//     // var pcPos = playerPH.rect.x;

//     // //If the square's bottom edge (rectY + rectSize) is below the bottom of the canvas (canvas.height), set rectY to canvas.height - rectSize and velocityY to 0
//     // if (rectY + rectSize > canvas.height) {
//     //     // The square is below the bottom of the canvas
//     //     rectY = canvas.height - rectSize;
//     //     // Square stops falling
//     //     velocityY = 0;
//     // }

//     // velocityY += gravity;
//     // if (velocityY > max_fall_speed) {
//     //     velocityY = max_fall_speed;
//     // }
//     // //Update rectY by velocityY
//     // rectY += velocityY;
//     // //Keep it from flying off the TOP (rectY < 0)
//     // if (rectY < 0) {
//     //     rectY = 0;
//     //     velocityY = 0;
//     // }

    
//     gravUpdate();
// }

    start();