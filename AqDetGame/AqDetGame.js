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
var rectX; //player PlaceHolder
var rectY;
var gravVector;

var RESPAWN_X;
var RESPAWN_Y;
//0,0, IS TOP LEFT

const NO_MOVEMENT = 0;
const STANDARD_MOVEMENT = 15; 

const pressedKeys = new Set();

counter = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameStart = false;

// Barriers 
const barriers =  [
    /*
    { // test barrier
        x: 400, 
        y: 0, 
        width: 20, 
        height: 600,
        color: "red"
    },
    */
    { // top barrier
        x: 0,
        y: 450,
        width: canvas.width,
        height: 20,
        color: "green"
    }, 
    { // bottom barrier
        x: 0,
        y: 0,
        width: canvas.width,
        height: 20,
        color: "green"
    }, 
];

function drawBarriers() {
    for (const b of barriers) {
        playerPH.fillStyle = b.color;
        playerPH.fillRect(b.x,b.y,b.width,b.height);
    }
}

function collidesWithBarrier(x, y, width, height) {
    for (const b of barriers) {
        if (x < b.x + b.width &&
            x + rectSize > b.x &&
            y < b.y + b.height &&
            y + rectSize > b.y) {
            return true;
            }
    }
    return false;
}

function populateLevel1MapScreen1() {

}

function spawn(){
    rectX = 23;
    rectY = canvas.height/2;

    playerPH.clearRect(0, 0, canvas.width, canvas.height);
    drawBarriers();

    playerPH.fillStyle = "green";
    playerPH.fillRect(rectX, rectY, rectSize, rectSize);

    
    // canvasTemp = document.getElementById("LayoutDisplay");
    // playerPHTEMP = canvasTemp.getContext("2d"); 
    // playerPHTEMP.fillStyle("red");
    // playerPHTEMP.fillRect(300, 300, rectSize, rectSize);
}

function respawn(){
    findRespawn();
    removeOldCharacter();
    rectX = RESPAWN_X;
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
    if (rectX >= 400){
        newResX = 700;
    }
    else if (rectX < 400){
        newResX = 100;
    }

    if (rectY >= 500){
        newResY = 900;
    }
    else if (rectY < 500){
        newResY = 100;
    }
    saveRespawnCoordinates(newResX, newResY);//AFTER CHANGE: By-level decision, CALL a function that changes based on what level is loaded
}

function removeOldCharacter() {
//   if (!player) return; // nothing to remove

//   // stop anything still running on the old PC
//   player.stopAnimations();
//   player.detachInputHandlers();

//   // take it out of the game and release the reference
//   removeFromEntityList(player);
//   player = null;
  playerPH.clearRect(rectX, rectY, canvas.width, canvas.height);
//   respawn();
}


function reRender(movePosX, movePosY){
    
    if (collidesWithBarrier(rectX + movePosX, rectY + movePosX)) {
        return;
    }
    
    playerPH.clearRect(rectX, rectY, rectSize, rectSize);
    rectX += movePosX;
    rectY += movePosY;

     drawBarriers();

    playerPH.fillStyle = "green";
    playerPH.fillRect(rectX, rectY, rectSize, rectSize);
}

function pcInteract()
{   
        // alert(rectX);
        // alert(rectY);
        alert("Interact Key Pressed!");
}

function moveCharacterWASD(moveKeys) {
    moveDistanceX = NO_MOVEMENT;
    moveDistanceY = NO_MOVEMENT;
    if (moveKeys.has('w')){
        moveDistanceY -= STANDARD_MOVEMENT;
    } else if (moveKeys.has('a')){
	    moveDistanceX -= STANDARD_MOVEMENT;
    } else if (moveKeys.has('s')){
        moveDistanceY += STANDARD_MOVEMENT;
    } else if (moveKeys.has('d')){
        moveDistanceX += STANDARD_MOVEMENT;
    }
    //alert(moveDistanceX + " " + moveDistanceY);
    reRender(moveDistanceX, moveDistanceY);
}

window.addEventListener("keydown", (e) =>{ 
    main(); //infinite loop
    pressedKeys.add(e.key.toLowerCase());
    //Fix to allow caps letters and multiple buttons being pressed
    if(e.key === "Enter" && !gameStart){
        gameStart = true; 
        spawn();
    } else if(pressedKeys.has('w') || pressedKeys.has('a') || 
    pressedKeys.has('s') || pressedKeys.has('d')){
        moveCharacterWASD(pressedKeys);
    } else if (e.key === " ") { //Space Entered - call jump
        // reRender(0, -50);Jump no longer needed
    } else if ((e.key).toLowerCase == "e") { //'e' key pressed, call enter
        pcInteract();
    } else if ((e.key).toLowerCase == 'c')
    {
        respawn();
    }
    else {}
})

window.addEventListener('keyup', (event) => {
    // Remove the key from the Set when released
    pressedKeys.delete(event.key.toLowerCase());
});

//DECOMMISIONED - Gravity Function, can be used as a reference for pushing the PC in a direction (CODEBASE : WATER CURRENT)
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
let chosenOption = null;

function levelCompleted() {
  chosenOption = null;
  showCompletionMenu(); // Continue and Exit buttons
}

function onOptionPressed(option) { // "continue" or "exit"
  if (chosenOption !== null) return; // ignore repeat presses
  chosenOption = option;
  darkenMenu();
  showMessage("Waiting");
  alertAlternatePlayer(option); // placeholder, see questions
}

function onAlternatePlayerResponse() { // called when the signal arrives
  hideMessage();
  closeMenu();
  if (chosenOption === "continue") loadNextLevel();
  else if (chosenOption === "exit") loadLevelSelect();
  chosenOption = null;
}
const TOTAL_LEVELS = 5;
let highestUnlocked = 1; // Level 1 always unlocked

function isUnlocked(level) {
  return level <= highestUnlocked;
}

function onLevelCompleted(level) {
  if (level === highestUnlocked && level < TOTAL_LEVELS) {
    highestUnlocked = level + 1;
  }
  //DISPLAY AN HTML POP_UP WINDOW THAT GIVES THE PLAYER CONTINUATINO OPTIONS
}

function onLevelSelected(level) {
  if (!isUnlocked(level)) return; // blocked: do nothing
  loadLevel(level);
}

function onOfferSurrender() {
  alertPartnerPlayer(SURRENDER_OFFERED); // flag value
}
let levelSelectShown = false;

function onSetupKeyDown(event) {
  if (event.key !== "Enter") return;
  if (levelSelectShown) return; // ignore repeats
  levelSelectShown = true;

  hideSetupScreen();
  document.removeEventListener("keydown", onSetupKeyDown);
  levelSelectDisplay();
}

function levelSelectDisplay() {
  const TOTAL_LEVELS = 5;
  for (let level = 1; level <= TOTAL_LEVELS; level++) {
    drawLevelOption(level, isUnlocked(level)); // positioned in order
  }
}

// document.addEventListener("keydown", onSetupKeyDown);

start() 
