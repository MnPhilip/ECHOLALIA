// alert("Test of JS file worksssss");
document.addEventListener('DOMContentLoaded', () => {
    // alert("DEBUG SPACE LOADED");
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
canvas.style.width = window.innerWidth;
canvas.style.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const lvlCanvas = document.getElementById('LevelDisplay');
const lvlLayout = lvlCanvas.getContext("2d"); //CANVAS LAYER FOR LEVEL LAYOUT, MOVEMENT/INTERACTABLES
lvlCanvas.style.width = window.innerWidth;
lvlCanvas.style.height = window.innerHeight;
lvlCanvas.width = window.innerWidth;
lvlCanvas.height = window.innerHeight;


const bckgrndCanvas = document.getElementById('BackgroundDisplay');
const background = bckgrndCanvas.getContext("2d");
bckgrndCanvas.style.width = window.innerWidth;
bckgrndCanvas.style.height = window.innerHeight;
// bckgrndCanvas.width = 1308;
// bckgrndCanvas.height = 649;


var currentLevel = 0;
var currentScreen = 0;


const rectSize = 60;
var rectX; //player PlaceHolder
var rectY;
//INTERACTABLES MERGE
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
//INTERACTABLES MERGE


var moveDistanceX;
var moveDistanceY;
const NO_MOVEMENT = 0;
const STANDARD_MOVEMENT = 15; 
var moveDistance = STANDARD_MOVEMENT;

var pressedKeys = new Set();

counter = 0;

let gameStart = false;

const spawnArr = [
    {
        spawnPoints: level1spawn
    }
];

let spawnIndex = 0;



const SEAWEED_SIZE = 40;
const PUDDLE_SIZE = 50;
const ROCKET_SIZE = 70;
const BUBBLE_SIZE = 80;
const PUSH_ROCK_SIZE = PUDDLE_SIZE;
const interactableSize = 80;


const barriers = createBarrier(lvlCanvas);
const interactableItems = createInteractables(lvlCanvas);
const jumpPuddles = createJumpPuddle(lvlCanvas);
const respawnAnchors = populateSaves(lvlCanvas);


function start(){
    // canvas.style.width = '1308px';
    // canvas.style.height = '649px';
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



function drawBarriers() {
    for (const b of barriers[currentScreen]) {
        lvlLayout.fillStyle = b.color;
        lvlLayout.fillRect(b.x,b.y,b.width,b.height);
    }
    drawObjectBarriers();
}

function drawObjectBarriers() {
    // lvlLayout.clearRect(0, 0, canvas.width, canvas.height);
    for (const obj of interactableItems[currentScreen]) {
        lvlLayout.strokeStyle = 'red';
        lvlLayout.strokeRect(obj.x, obj.y, obj.width, obj.height);
    }
}

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

function drawJumpPuddles() {
    for (const d of jumpPuddles[currentScreen]) {
        lvlLayout.fillStyle = d.color;
        lvlLayout.fillRect(d.x,d.y,d.width,d.height);
    }
}


function drawInteractables() {
    for (const d of interactableItems[currentScreen]) {
        lvlLayout.fillStyle = d.color;
        lvlLayout.fillRect(d.x,d.y,d.width,d.height);
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
    return spawnArr[currentLevel].spawnPoints[spawnIndex];
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
    lvlLayout.clearRect(0, 0, lvlCanvas.width, lvlCanvas.height);

    drawBarriers();
    drawInteractables();
    drawJumpPuddles();//draw movement element

    playerPH.fillStyle = "green";
    playerPH.fillRect(rectX, rectY, rectSize, rectSize);
    

    
    // canvasTemp = document.getElementById("LayoutDisplay");
    // playerPHTEMP = canvasTemp.getContext("2d"); 
    // playerPHTEMP.fillStyle("red");
    // playerPHTEMP.fillRect(300, 300, rectSize, rectSize);
}


function respawn(){
    spawn();
    /*
    findRespawn(); //Allows player to get spawn coordinates without hardcoding
    removeOldCharacter();
    if (interactActive){
      interactActive = !interactActive;
      interactableItems[currentScreen][currObj].activated = false;
      if (interactableItems[currentScreen][currObj].type == bubble){
        bubblePop();
      }
    }
    rectX = RESPAWN_X;
    rectY = RESPAWN_Y;
    
    reRender(0, 0);
    */
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


function reRender(movePosX, movePosY) {

    const newX = rectX + movePosX;
    const newY = rectY + movePosY;

    // Check if player reached the left edge
    if (reachScreenEnd(newX)) {

        // Check if this is the last screen
        if (currentScreen === 3) {
            //alert("Level done");
            levelCompleted();
            return;
        }

        // Unlock the next checkpoint
        updateCheckPoint(currentScreen + 1);

        // Change to next screen
        currentScreen++;

        // Get new screen coordinates
        const coordinates =
            spawnArr[currentLevel].spawnPoints[currentScreen];

        rectX = coordinates.x;
        rectY = coordinates.y;

        // New screen spawn coords using newer implementation
        // var coordinates = {
        //     x: respawnAnchors[currentScreen].x,
        //     y: respawnAnchors[currentScreen].y
        // }

        // rectX = coordinates.x;
        // rectY = coordinates.y;

        // Draw new screen
        playerPH.clearRect(0, 0, canvas.width, canvas.height);
    lvlLayout.clearRect(0, 0, lvlCanvas.width, lvlCanvas.height);

        drawBarriers();
        drawInteractables();
        drawJumpPuddles();

        playerPH.fillStyle = "green";
        playerPH.fillRect(rectX, rectY, rectSize, rectSize);

        return;
    }

    // Check collisions before normal movement
    if (collidesWithBarrier(rectX + movePosX, rectY + movePosY) || collidesWithObject(rectX+movePosX, rectY+movePosY)) {
        return;
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

    //Checking if interactables are active and what needs to be changed about them
    if (currObj != -1){
      if (interactableItems[currentScreen][currObj].type == pushBlock && interactableItems[currentScreen][currObj].activated){
        interactableItems[currentScreen][currObj].x += movePosX;
        interactableItems[currentScreen][currObj].y += movePosY;
      } else if (interactableItems[currentScreen][currObj].type == bubble && interactableItems[currentScreen][currObj].activated){
        interactableItems[currentScreen][currObj].x += movePosX;
        interactableItems[currentScreen][currObj].y += movePosY;
        bubbleCounter--;  
        if (bubbleCounter == 0 && interactableItems[currentScreen][currObj].type == bubble) {
          bubblePop();
        }
      }
    }
    //NOTE: Required changing interactableLoc, AND uses "currObj which may not work anymore"

    // Draw player
    playerPH.fillStyle = "green";
    playerPH.fillRect(rectX, rectY, rectSize, rectSize);
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
    //alert(moveDistanceX + " " + moveDistanceY);
    reRender(moveDistanceX, moveDistanceY);
}

window.addEventListener("keydown", (e) => {

    if (!gameStart) {
        return;
    }

    pressedKeys.add(e.key.toLowerCase());

    if (e.key.toLowerCase() === "e") {
        pcInteract();
    }

    if (e.key.toLowerCase() === "c") {
         respawn();
    }

    if (pressedKeys.has("w") ||
        pressedKeys.has("a") ||
        pressedKeys.has("s") ||
        pressedKeys.has("d")) {

        lastKeyPressed = e.key.toLowerCase();
        moveCharacterWASD(pressedKeys);
    }
});
window.addEventListener('keyup', (event) => {
    // Remove the key from the Set when released
    // alert("keyup");
    // pressedKeys.delete(event.key.toLowerCase());
    pressedKeys.clear();
});

////INTERACTABLES IMPLEMENTATION


//Full interactable implementation

function pcInteract()
{   
    var objType;
    
    if (!interactActive){
        objType = interactCheck();
        // alert("Interact Key Pressed!");
    } else {
        interactActive = !interactActive;
        interactableItems[currentScreen][currObj].activated = false;
        currObj = -1;
        objType = -1;
    }


    if (objType < 0)
    {
        // alert("No object found or object unbound");
        return;
    }
    else if (objType == pushBlock) {
        alert("push block active");
    }//PushBlock found
    else if (objType == bubble) {
      alert("Bubble Found");
      activateBubble();
    }//Bubble found
    else if (objType == signalFlare){
      alert("Signal Flare Found");
      window.dispatchEvent(flareSent);
    } //Signal Flare found
}

//CONCEPT: if an interactable is found up, down, left, or right of the player when interact is called, return the type of interactable that was found
//      and set the "activated" boolean of that interactable to 'true'
function interactCheck(){
    if (directionalCheck()) {//Checks above and below the player object
        // alert(directionalCheck());
        interactActive = true;  //Allows other functions to know an interaction is active
        interactableItems[currentScreen][currObj].activated = true;
        return interactableItems[currentScreen][currObj].type;
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
    // alert("W Check");
    for (var obj of interactableItems[currentScreen]){
      if ((obj.y <= rectY-(moveDistance/2)) && (rectY-(moveDistance/2) <= obj.y+interactableSize) && Math.abs(rectX-obj.x) <= moveDistance*2) {
        currObj = count;
        alert(count);
        return true;
      }
      count++;
    }
  } else if (lastKeyPressed == "a"){ //CHECK LEFT, NEG X
    // alert("A Check");
    for (var obj of interactableItems[currentScreen]){
      if ((obj.x <= rectX-(moveDistance/2)) && (rectX-(moveDistance/2) <= obj.x+interactableSize) && Math.abs(rectY-obj.y) <= moveDistance*3) {
        currObj = count;
        return true;
      }
    count++;
    }
  } else if (lastKeyPressed == "s"){ //CHECK DOWN, POS Y
    // alert("S Check");
    for (var obj of interactableItems[currentScreen]){
      if ((obj.y <= rectY+rectSize+(moveDistance/2)) && (rectY+rectSize+(moveDistance/2) <= obj.y+interactableSize) && Math.abs(rectX-obj.x) <= moveDistance*2) {
        currObj = count;
        return true;
      }
    count++;
    }
  } else if (lastKeyPressed == "d"){ //CHECK RIGHT, POS X
    // alert("D Check");
    for (var obj of interactableItems[currentScreen]) {
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
  if (interactableItems[currentScreen][currObj].type == bubble) {
    bubblePush(interactableItems[currentScreen][currObj].x, interactableItems[currentScreen][currObj].y);
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
    interactableItems[currentScreen][currObj].activated = false;
    interactableItems[currentScreen][currObj].x = bubbleResX;
    interactableItems[currentScreen][currObj].y = bubbleResY;
    interactActive = false;
    pcInteract();
}
////INTERACTABLES IMPLEMENTATION

const TOTAL_LEVELS = 5; //total lvels
let highestUnlocked = 1; // start at level 1 for now
let levelSelectShown = false; //level select


const setupMenu = document.getElementById("initialSetup"); //begin 
const levelMenu = document.querySelector(".level-select"); //level select has no id so use query select
const gameScreen = document.getElementById("gameScreen");  //game

function showLevelSelect() {
    gameStart = false;
    pressedKeys.clear(); //clear keys so movement doesnt trigger
    levelSelectShown = true;
    setupMenu.hidden = true;
    gameScreen.hidden = true;
    levelMenu.hidden = false;
    levelSelectDisplay();
}


function levelSelectDisplay() {
    const buttons = document.querySelectorAll(".level");//get all level elements
    buttons.forEach(button => {
        const level = Number(button.dataset.level);
        const lock = button.querySelector(".level__lock");
        if (level == 1) {
            button.disabled = false;//make button clickable
          button.classList.remove("is-locked");//remove the faded level cover
            if (lock) {
              lock.hidden = true;//remove the lock png
            }
        } else {//if it is not level 1 make it seem that it is locked
            button.disabled = true;
            button.classList.add("is-locked");
            if (lock) {
                lock.hidden = false;
            }
        }
    });
}


function isUnlocked(level){
  return level <= highestUnlocked;
}


function gointoLevel(level){
  if(!isUnlocked(level) || level !==1){
    return;
  }
  loadLevel(level);
}


function loadLevel(level) {
    if (level !== 1) return; // Add Level 2-5 data before enabling them.
    currentLevel = level - 1;
    currentScreen = 0;
    spawnIndex = 0;
    pressedKeys.clear();
    document.getElementById("currentLevelTitle").textContent = `Level ${level}`;
    levelMenu.hidden = true;
    gameScreen.hidden = false;
    gameStart = true;
    spawn();
}


function levelCompleted(){
    gameStart = false;
    pressedKeys.clear();

    document.getElementById("completionMenu").hidden = false;
}

function onLevelCompleted(level) {
    if (level === highestUnlocked && level < TOTAL_LEVELS) {
        highestUnlocked = level + 1;
    }
}


document.getElementById("beginGame").addEventListener("click", showLevelSelect);
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !levelSelectShown) {
        showLevelSelect();
    }

});

document.querySelectorAll(".level").forEach(button => {
    button.addEventListener("click", () => gointoLevel(Number(button.dataset.level)));
});

window.addEventListener("flareSent", () => {
  interactableItems[currentScreen][currObj].color = "pink";
  window.dispatchEvent(flareLanded);
})

window.addEventListener("flareLanded", (sfx, sfy) => {
  lvlLayout.fillStyle = "Red";
  lvlLayout.fillRect(400, 400, rectSize*2, rectSize);
})
