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


const canvas = document.getElementById('PlrDisplay');
const playerPH = canvas.getContext("2d"); 

const lvlCanvas = document.getElementById('LevelDisplay');
const lvlLayout = lvlCanvas.getContext("2d"); //CANVAS LAYER FOR LEVEL LAYOUT, MOVEMENT/INTERACTABLES

const bckgrndCanvas = document.getElementById('BackgroundDisplay');
const background = bckgrndCanvas.getContext("2d");


const rectSize = 60;
var rectX = 100; //player PlaceHolder
var rectY = 200;
//0,0 of PlayerPH is top left of the canvas/square
var gravVector;
var lastKeyPressed;

var RESPAWN_X;
var RESPAWN_Y;
//0,0, IS TOP LEFT

//Interactable Type Constants
const pushBlock = 11;
const bubble = 22;
const signalFlare = 33;
var interactActive = false;
var currObj = -1;

const interactableSize = 50;
var interactableLoc = [
    {
        x: 80,
        y: 700,
        width: interactableSize,
        height: interactableSize,
        color: "purple",
        type: pushBlock,
        activated: false
    }, 

    {
        x: 380,
        y: 800,
        width: interactableSize,
        height: interactableSize,
        color: "aqua",
        type: bubble,
        activated: false
    },

    {
        x: 680,
        y: 800,
        width: interactableSize,
        height: interactableSize,
        color: "red",
        type: signalFlare,
        activated: false
    }
]; //[Xorigin][Yorigin][type_constant]



const moveDistance = 15; 

counter = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
lvlCanvas.width = window.innerWidth;
lvlCanvas.height = window.innerHeight;
bckgrndCanvas.width = window.innerWidth;
bckgrndCanvas.height = window.innerHeight;

let gameStart = false;

function renderInit() {
    drawBarriers();
    // drawBackground();
    drawInteractables();
    playerPH.fillStyle = "green";
    
    gameStart = true; 
}

function start(){
    playerPH.clearRect(0, 0, canvas.width, canvas.height);
    if(!gameStart){
        playerPH.fillStyle = "Yellow";
        playerPH.font = "80px Arial";
        playerPH.textAlign = "center";
        playerPH.textBaseline = "middle"; //These elements will be replaced with function calls for printing the PC assets to the screen
        playerPH.fillText("PRESS ENTER TO START", canvas.width/2, canvas.height/2);// DEBUG STATEMENT TESTING RESPONSIVENESS

        renderInit();
    } else{
        spawn(); //Initial Rendering and Spawning of Player Character
    }
    
    //requestAnimationFrame(start);
}

// Static Barriers 
const barriers =  [
    { 
        x: 400, 
        y: 0, 
        width: 20, 
        height: 600,
        color: "red"
    },

    {
        x: 200,
        y: 600,
        width: 200,
        height: 40, 
        color: "yellow"
    }, 
]; //To draw multiple barriers they'll be established in a separate file in a manner similar to this

function drawBarriers() {
    lvlLayout.clearRect(0, 0, canvas.width, canvas.height);
    for (const b of barriers) {
        lvlLayout.strokeStyle = b.color;
        lvlLayout.strokeRect(b.x,b.y,b.width,b.height, b.color);
    }
    drawObjectBarriers();
}

function drawObjectBarriers() {
    // lvlLayout.clearRect(0, 0, canvas.width, canvas.height);
    for (const obj of interactableLoc) {
        lvlLayout.strokeStyle = 'green';
        lvlLayout.strokeRect(obj.x, obj.y, obj.width, obj.height);
    }
    
}

function collidesWithBarrier(x, y, width, height) {
    for (const b of barriers) { //Checks if player is running into a barrier
        if (x < b.x + b.width &&
            x + rectSize > b.x &&
            y < b.y + b.height &&
            y + rectSize > b.y) {
            return true;
            }
    }
    return false;
}

//Checks if an interactable will collide with a barrer
function collidesWithObject(x, y, width, height) {
    if (interactActive) {
        return false;
    }
    for (const b of interactableLoc) {
        if (x < b.x + b.width &&
            x + rectSize > b.x &&
            y < b.y + b.height &&
            y + rectSize > b.y) {
            return true;
            }
    }
    return false;
}

function drawBackground() {
    background.clearRect(0, 0, canvas.width, canvas.height);
    var backImg = new Image();
    backImg.src = url('test.jpg');
    background.drawImage(backImg, 0, 0);  
}

//Draws Push Blocks, Flares, and Bubbles - Will need integration to get applicable data from a file with Level-specific layouts
function drawInteractables() {
    //TESTING STATEMENT AND LOOP

    for (const obj of interactableLoc)
    {
        lvlLayout.textAlign = "center";
        lvlLayout.textBaseline = "middle";
        lvlLayout.font = "12px Arial";
        lvlLayout.fillText = "PB";
        lvlLayout.fillStyle = obj.color;
        lvlLayout.fillRect(obj.x, obj.y, obj.width, obj.height);
    }
    
    // drawObjectBarriers();
}


//Exclusively for first spawns of a level when the level is rendered, anything else should be done via Respawn()
function spawn(){ 
    playerPH.clearRect(0, 0, canvas.width, canvas.height);
    lvlLayout.clearRect(0, 0, canvas.width, canvas.height);
    drawBarriers(); //Can be replaced with a function to draw a level and its layout
    drawInteractables();
    playerPH.clearRect(0, 0, canvas.width, canvas.height);
    respawn(); 
}


//Any spawning done AFTER initial level setup, 
function respawn(){
    findRespawn(); //Allows player to get spawn coordinates without hardcoding
    removeOldCharacter();
    rectX = RESPAWN_X;
    rectY = RESPAWN_Y;
    
    reRender(0, 0);
}

function saveRespawnCoordinates(x, y) {
  RESPAWN_X = x;
  RESPAWN_Y = y;
}

function findRespawn(){ //Will eventually be upgraded to search for respawn points based on the currently loaded level
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


//Currently a shorthand funtion, can eventually be used to house animations associated with respawning
function removeOldCharacter() {
  playerPH.clearRect(rectX, rectY, canvas.width, canvas.height); //Shorthand to clear old character instance, SHOULD BE CALLED BEFORE RECTX OR RECTY ARE MODIFIED
}


function reRender(movePosX, movePosY){
    var count = 0;
    
    if (collidesWithBarrier(rectX + movePosX, rectY + movePosX) || collidesWithObject(rectX+movePosX, rectY+movePosY)) {
        return;
    }
    
    removeOldCharacter(); //Must be called BEFORE RectX and RectY are modified
    rectX += movePosX;
    rectY += movePosY;
    drawBarriers();
    
    for (obj of interactableLoc){
        if (obj.activated && interactableLoc[currObj].type == pushBlock) {
            obj.x += movePosX;
            obj.y += movePosY;
            // objBarriers[count].x = obj.x; //These two lines allow barriers to be moved with their interactions
            // objBarriers[count].y = obj.y;
        }
        count++;
    }
    
    drawInteractables();    
    

    playerPH.fillStyle = "green";
    playerPH.fillRect(rectX, rectY, rectSize, rectSize);
}

function pcInteract()
{   
    var objType;
    
    if (!interactActive){
        objType = interactCheck();
        // alert("Interact Key Pressed!");
    } else {
        interactActive = !interactActive;
        interactableLoc[currObj].activated = false;
        currObj = -1;
        objType = -1;
    }

    alert(objType);

    if (objType < 0)
    {
        alert("No object found or object unbound");
        return;
    }
    else if (objType == pushBlock) {
        alert("push block active");
    }//PushBlock found
    else if (objType == bubble) {
      alert("Bubble Found");
    }//Bubble found
    else if (objType == signalFlare){
      alert("Signal Flare Found");
    } //Signal Flare found
}

//CONCEPT: if an interactable is found up, down, left, or right of the player when interact is called, return the type of interactable that was found
//      and set the "activated" boolean of that interactable to 'true'
function interactCheck(){
    if (directionalCheck()) {//Checks above and below the player object
        // alert(directionalCheck());
        interactActive = true;  //Allows other functions to know an interaction is active
        interactableLoc[currObj].activated = true;
        return interactableLoc[currObj].type;
    }
}

//PURPOSE: Will check all four directions around the player and find if an interactable is accessible 
function directionalCheck(){
  count = 0;
  //RectX, RectY+move -> RectX+move, RectY+move
  //
  //
  //RectX, RectY -> RectX+move, RectY
  if (lastKeyPressed == "w"){ //CHECK UP, NEG Y
    for (var obj of interactableLoc){
      if ((obj.y <= rectY-(moveDistance/2)) && (rectY-(moveDistance/2) <= obj.y+interactableSize) && Math.abs(rectX-obj.x) <= moveDistance) {
        currObj = count;
        return true;
      }
      count++;
    }
  } else if (lastKeyPressed == "a"){ //CHECK LEFT, NEG X
    for (var obj of interactableLoc){
      if ((obj.x < rectX-(moveDistance/2)) && (rectX-(moveDistance/2) <= obj.x+interactableSize) && Math.abs(rectY-obj.y) <= moveDistance) {
        currObj = count;
        return true;
      }
    count++;
    }
  } else if (lastKeyPressed == "s"){ //CHECK DOWN, POS Y
    for (var obj of interactableLoc){
      if ((obj.y < rectY+rectSize+(moveDistance/2)) && (rectY+rectSize+(moveDistance/2) < obj.y+interactableSize) && Math.abs(rectX-obj.x) <= moveDistance) {
        currObj = count;
        return true;
      }
    count++;
    }
  } else if (lastKeyPressed == "d"){ //CHECK RIGHT, POS X
    for (var obj of interactableLoc) {
      if ((obj.x >= rectX+rectSize+(moveDistance/2)) && (rectX+rectSize+(moveDistance/2) > obj.x+interactableSize) && Math.abs(rectY-obj.y) <= moveDistance) {
        currObj = count;
        return true;
      }
      count++;
    }
  } else {return false;}

  return false;
}

function move(moveKey) {
    
  lastKeyPressed = moveKey.key;
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
    main(); //infinite loop
    
    //Fix to allow caps letters and multiple buttons being pressed
    if(e.key == "Enter" && !gameStart){
        spawn();
    } else if(e.key == "w" || e.key == "a" || e.key == "s" || 
    	e.key == "d"){
        move(e);
    } else if (e.key === " ") { //Space Entered - call jump
        // reRender(0, -50);Jump no longer needed
    } else if (e.key == "e") { //'e' key pressed, call enter
        pcInteract();
    } else if (e.key == 'c') //Respawn keybind
    {
        respawn();
    } else if (e.key == 'o') { //DEBUG: Prints current location of the PC
        alert(rectX);
        alert(rectY);
    }
    else {}
})

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
