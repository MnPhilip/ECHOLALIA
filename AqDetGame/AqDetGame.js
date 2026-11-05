//alert("Test of JS file worksssss");
// document.addEventListener('DOMContentLoaded', () => {
//     alert("DEBUG SPACE LOADED");
// })


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


const rectSize = 50;
var rectX = 120; //player PlaceHolder
var rectY = 300;
//0,0 of PlayerPH is top left of the canvas/square
var gravVector;
var lastKeyPressed;

var RESPAWN_X;
var RESPAWN_Y;
//0,0, IS TOP LEFT
var bubbleResX = -1;
var bubbleResY = -1;

var signalFlareIndex = -1;

//Interactable Type Constants
const pushBlock = 11;
const bubble = 22;
const signalFlare = 33;
var interactActive = false;
var currObj = -1;


const moveDistance = 25; 
var moveDistanceX;
var moveDistanceY;
counter = 0;

const interactableSize = 75;


const windowWidth = '1308px';
 const windowHeight = '649px';


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
lvlCanvas.width = window.innerWidth;
lvlCanvas.height = window.innerHeight;
bckgrndCanvas.width = window.innerWidth;
bckgrndCanvas.height = window.innerHeight;

function renderInit() {
    drawBarriers();
    // drawBackground();
    drawInteractables();

    
    playerPH.fillStyle = "green";
}

function start(){
    canvas.style.width = '1308px';
    canvas.style.height = '649px';

    playerPH.clearRect(0, 0, canvas.width, canvas.height);
    if(!gameStart){
        playerPH.fillStyle = "Yellow";
        playerPH.font = "80px Arial";
        playerPH.textAlign = "center";
        playerPH.fillRect(rectX, rectY, rectSize, rectSize);
        playerPH.textBaseline = "middle"; //These elements will be replaced with function calls for printing the PC assets to the screen
        playerPH.fillText("PRESS ENTER TO START", canvas.width/2, canvas.height/2);// DEBUG STATEMENT TESTING RESPONSIVENESS
        
        renderInit();
    } else{
        spawn(); //Initial Rendering and Spawning of Player Character
        alert("Spawned again");
    }
    
    //requestAnimationFrame(start);
}
 

var currentLevel = 0;
var currentScreen = 0;

var rectX; //player PlaceHolder
var rectY;
var gravVector;

var RESPAWN_X;
var RESPAWN_Y;
//0,0, IS TOP LEFT

const NO_MOVEMENT = 0;
const STANDARD_MOVEMENT = 25; 


counter = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameStart = false;

let spawnIndex = 0;


const SEAWEED_SIZE = 40;
const PUDDLE_SIZE = 50;
const ROCKET_SIZE = 70;
const BUBBLE_SIZE = 80;
const PUSH_ROCK_SIZE = PUDDLE_SIZE;


const barriers = createBarrier(canvas);
const interactableItems = createInteractables(canvas);
const jumpPuddles = createJumpPuddle(canvas);


var spawnArr = populateSpawnCoords();


function drawBarriers() {
    for (const b of barriers[currentScreen]) {
        lvlLayout.fillStyle = b.color;
        lvlLayout.fillRect(b.x,b.y,b.width,b.height);
    }
    
    // lvlLayout.clearRect(0, 0, canvas.width, canvas.height);
    for (const b of barriers[currentScreen]) {
        lvlLayout.strokeStyle = b.color;
        lvlLayout.strokeRect(b.x,b.y,b.width,b.height, b.color);
    }
    // drawObjectBarriers();
}

// function drawObjectBarriers() {
//     // lvlLayout.clearRect(0, 0, canvas.width, canvas.height);
//     for (const obj of interactableItems) {
//         lvlLayout.strokeStyle = 'green';
//         lvlLayout.strokeRect(obj.x, obj.y, obj.width, obj.height);
//     }
    
// }

function collidesWithBarrier(x, y, width, height) {
    for (const b of barriers[currentScreen]) {
        if (x < b.x + b.width &&
            x + rectSize > b.x &&
            y < b.y + b.height &&
            y + rectSize > b.y) {
            return true;
            }
    }
    return false;
}

function drawJumpPuddles() {
    for (const d of jumpPuddles[currentScreen]) {
        playerPH.fillStyle = d.color;
        playerPH.fillRect(d.x,d.y,d.width,d.height);
    }
}

function drawInteractables() {
    for (const d of interactableItems[currentScreen]) {
        playerPH.fillStyle = d.color;
        playerPH.fillRect(d.x,d.y,d.width,d.height);
    }
}

// returns true if player has reached left-most area, to proceed to the next screen
function reachScreenEnd(rectX) {
    if (rectX < 1 && rectX > -20) {
        return true;
    }
    return false;
}


function getSpawnPoint(){
    return spawnArr[currentLevel];//.spawnPoints[spawnIndex];
    
}

function updateCheckPoint(checknum){
    if(checknum == spawnIndex +1 && checknum < spawnArr[currentLevel].spawnPoints.length){
        spawnIndex = checknum;
    }
}

function spawn(){
    const spawnPoint = getSpawnPoint();
    currentScreen = spawnPoint.screen;
    rectX = spawnPoint.x;
    rectY = spawnPoint.y;
    //alert("X: " + rectX  + "\n Y" + rectY)
    playerPH.clearRect(0, 0, canvas.width, canvas.height);

    drawBarriers();
    drawInteractables();
    drawJumpPuddles();//draw movement element

    playerPH.fillStyle = "green";
    playerPH.fillRect(rectX, rectY, rectSize, rectSize);
}

//Checks if an interactable will collide with a barrer
function collidesWithObject(x, y, width, height) {
    if (interactActive) {
        return false;
    }
    for (const b of interactableItems[currentScreen]) {
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

    for (const obj of interactableItems)
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
// function spawn(){ 
//     playerPH.clearRect(0, 0, canvas.width, canvas.height);
//     lvlLayout.clearRect(0, 0, canvas.width, canvas.height);
//     drawBarriers(); //Can be replaced with a function to draw a level and its layout
//     drawInteractables();
//     playerPH.clearRect(0, 0, canvas.width, canvas.height);
//     respawn(); 
// }


//Any spawning done AFTER initial level setup, 
function respawn(){
    spawn();
    findRespawn(); //Allows player to get spawn coordinates without hardcoding
    removeOldCharacter();
    if (interactActive){
      interactActive = !interactActive;
      interactableItems[currObj].activated = false;
      if (interactableItems[currObj].type == bubble){
        bubblePop();
      }
    }
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
  playerPH.clearRect(rectX, rectY, canvas.width, canvas.height);
}


function reRender(movePosX, movePosY) {

    const newX = rectX + movePosX;
    const newY = rectY + movePosY;

    // Check if player reached the left edge
    if (reachScreenEnd(newX)) {

        // Check if this is the last screen
        if (currentScreen === 3) {
            alert("Level done");
            return;
        }

        // Unlock the next checkpoint
        updateCheckPoint(currentScreen + 1);

        // Change to next screen
        currentScreen++;

        // Get new screen coordinates
        var coordinates = spawnArr[currentLevel].spawnPoints[currentScreen];

        rectX = coordinates.x;
        rectY = coordinates.y;

        // Draw new screen
        playerPH.clearRect(0, 0, canvas.width, canvas.height);

        drawBarriers();
        drawInteractables();
        drawJumpPuddles();

        playerPH.fillStyle = "green";
        playerPH.fillRect(rectX, rectY, rectSize, rectSize);

        return;
    }

    // Check collisions before normal movement
    
    if (collidesWithBarrier(rectX + movePosX, rectY + movePosX) || collidesWithObject(rectX+movePosX, rectY+movePosY)) {
        return;
    }
    
    if (currObj != -1){
      if (interactableItems[currObj].type == pushBlock && interactableItems[currObj].activated){
        interactableItems[currObj].x += movePosX;
        interactableItems[currObj].y += movePosY;
      } else if (interactableItems[currObj].type == bubble && interactableItems[currObj].activated){
        interactableItems[currObj].x += movePosX;
        interactableItems[currObj].y += movePosY;
        bubbleCounter--;  
        if (bubbleCounter == 0 && interactableItems[currObj].type == bubble) {
          bubblePop();
        }
      }
    }

    // Clear old player
    playerPH.clearRect(rectX, rectY, canvas.width, canvas.height);

    // Update position
    rectX = newX;
    rectY = newY;

    // Redraw environment
    drawBarriers();
    drawInteractables();
    drawJumpPuddles();

    // Draw player
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
        interactableItems[currObj].activated = false;
        currObj = -1;
        objType = -1;
    }


    if (objType < 0)
    {
        // alert("No object found or object unbound");
        return;
    }
    else if (objType == pushBlock) {
        // alert("push block active");
    }//PushBlock found
    else if (objType == bubble) {
      // alert("Bubble Found");
      activateBubble();
    }//Bubble found
    else if (objType == signalFlare){
      // alert("Signal Flare Found");
      window.dispatchEvent(flareSent);
    } //Signal Flare found
}

// moves the player a fixed amount, depending on the key pressed (WASD)
function moveCharacterWASD(moveKeys) {
    moveDistanceX = NO_MOVEMENT;
    moveDistanceY = NO_MOVEMENT;

    if (moveKeys.has('w')){
        moveDistanceY -= STANDARD_MOVEMENT;
    }
    
    if (moveKeys.has('a')){
	    moveDistanceX -= STANDARD_MOVEMENT;
    }
    
    if (moveKeys.has('s')){
        moveDistanceY += STANDARD_MOVEMENT;
    }
    
    if (moveKeys.has('d')){
        moveDistanceX += STANDARD_MOVEMENT;
    }
  }
//CONCEPT: if an interactable is found up, down, left, or right of the player when interact is called, return the type of interactable that was found
//      and set the "activated" boolean of that interactable to 'true'
function interactCheck(){
    if (directionalCheck()) {//Checks above and below the player object
        // alert(directionalCheck());
        interactActive = true;  //Allows other functions to know an interaction is active
        interactableItems[currObj].activated = true;
        return interactableItems[currObj].type;
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
    for (var obj of interactableItems){
      if ((obj.y <= rectY-(moveDistance/2)) && (rectY-(moveDistance/2) <= obj.y+interactableSize) && Math.abs(rectX-obj.x) <= moveDistance*2) {
        currObj = count;
        return true;
      }
      count++;
    }
  } else if (lastKeyPressed == "a"){ //CHECK LEFT, NEG X
    for (var obj of interactableItems){
      if ((obj.x <= rectX-(moveDistance/2)) && (rectX-(moveDistance/2) <= obj.x+interactableSize) && Math.abs(rectY-obj.y) <= moveDistance*3) {
        currObj = count;
        return true;
      }
    count++;
    }
  } else if (lastKeyPressed == "s"){ //CHECK DOWN, POS Y
    for (var obj of interactableItems){
      if ((obj.y <= rectY+rectSize+(moveDistance/2)) && (rectY+rectSize+(moveDistance/2) <= obj.y+interactableSize) && Math.abs(rectX-obj.x) <= moveDistance*2) {
        currObj = count;
        return true;
      }
    count++;
    }
  } else if (lastKeyPressed == "d"){ //CHECK RIGHT, POS X
    for (var obj of interactableItems) {
      if ((obj.x <= rectX+rectSize+(moveDistance/2)) && (rectX+rectSize+(moveDistance/2) <= obj.x+interactableSize) && Math.abs(rectY-obj.y) <= moveDistance*2) {
        currObj = count;
        return true;
      }
      count++;
    }
  } else {return false;}

  return false;
}

function activateBubble(){
  if (interactableItems[currObj].type == bubble) {
    bubblePush(interactableItems[currObj].x, interactableItems[currObj].y);
  }
}

function bubblePush(newX, newY){
  bubbleCounter = bubble;
  removeOldCharacter();
  rectX = newX;
  bubbleResX = newX;
  rectY = newY;
  bubbleResY = newY;
  reRender(0, 0);
}

function bubblePop() {
    interactableItems[currObj].activated = false;
    interactableItems[currObj].x = bubbleResX;
    interactableItems[currObj].y = bubbleResY;
    interactActive = false;
    pcInteract();
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
    //alert(moveDistanceX + " " + moveDistanceY);
    reRender(moveDistanceX, moveDistanceY);
}

window.addEventListener("keydown", (e) =>{ 
    var pressedKeys = new Set();
    pressedKeys.add(e.key.toLowerCase());
    //Fix to allow caps letters and multiple buttons being pressed
    if(e.key == "Enter" && !gameStart){
        gameStart = true;
        start();
    } else if(pressedKeys.has('w') || pressedKeys.has('a') || 
    pressedKeys.has('s') || pressedKeys.has('d')){
        moveCharacterWASD(pressedKeys);
    } else if (e.key === " ") { //Space Entered - call jump
        // reRender(0, -50);Jump no longer needed
    } else if ((e.key).toLowerCase == "e") { //'e' key pressed, call enter
        pcInteract();
    } else if ((e.key).toLowerCase() == 'c')
    {
      alert("ERROR: RESPAWN NOT UP-TO-SPEC");
        // respawn();
    } else if (e.key == 'o') { //DEBUG: Prints current location of the PC
        alert(rectX);
        alert(rectY);
    }
    else {}
})

window.addEventListener('keyup', (event) => {
    // Remove the key from the Set when released
    pressedKeys.delete(event.key.toLowerCase());
    // alert("keyup");
});
window.addEventListener("flareSent", () => {
  interactableItems[currObj].color = "pink";
  window.dispatchEvent(flareLanded);
})

window.addEventListener("flareLanded", (sfx, sfy) => {
  lvlLayout.fillStyle = "Red";
  lvlLayout.fillRect(400, 400, rectSize*2, rectSize);
})

//DECOMMISIONED - Gravity Function, can be used as a reference for pushing the PC in a direction (CODEBASE : WATER CURRENT)
// function gravUpdate() {
//     if (rectY < 1400) {
//         gravVector = 10;
//         reRender(0, gravVector);
//     }
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

start();
