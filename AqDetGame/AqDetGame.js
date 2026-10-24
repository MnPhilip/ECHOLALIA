//alert("Test of JS file worksssss");
document.addEventListener('DOMContentLoaded', () => {
    alert("DEBUG SPACE LOADED");
})

let stopMain = null;
let lastFrameTime = null;

//Consider this function the Main of the entire game AND the infinite "While loop" that will call
//      All natually-occuring events like gravity, enemy movement, and stuff like water currents
window.main = (timestamp = performance.now()) => {
    if (!gameStart) {
        stopMain = null;
        lastFrameTime = null;
        return;
    }

    const deltaTime = lastFrameTime === null
        ? 0 : Math.min((timestamp - lastFrameTime) / 1000, 0.05);
    lastFrameTime = timestamp;
    // alert(counter);     
    counter++;
    updatePhysics(deltaTime);
    stopMain = window.requestAnimationFrame(main);
    
    //window.cancelAnimationFrame(stopMain);
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


const SPRITES = [];
const UrchinImage = new Image();
UrchinImage.src = "AqDetImport/UrchinEnemy.png"; //TEMP ASSET, will be replaced with a more appropriate asset later
//Note the hitbox for the enemy is 50x50, so the asset should be scaled to that size for proper collision detection.

UrchinImage.onload = () => {
    SPRITES.push(UrchinImage);
    console.log("Urchin image loaded successfully.");
}


const rectSize = 60;
var rectX; //player PlaceHolder
var rectY;
var gravVector;

var RESPAWN_X;
var RESPAWN_Y;
//0,0, IS TOP LEFT

const moveDistance = 15; 

counter = 0;

const ELEMENT_WATER_CURRENT = "waterCurrent";
const CURRENT_TYPES = {
    gentle: { speed: 60 }, // pixels per second
    strong: { speed: 120 }
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameStart = false;

// Barriers 
const barriers =  [
    { 
        x: 400, 
        y: 0, 
        width: 20, 
        height: 600,
        color: "red"
    }
];

function drawBarriers() {
    for (const b of barriers) {
        playerPH.fillStyle = b.color;
        playerPH.fillRect(b.x,b.y,b.width,b.height);
    }
}

const enemy = {
    x: 200,
    y: 500,
    width: 50,
    height: 50,
    color: "purple"
};

const waterCurrents = [{
    x: 100,
    y: 200,
    width: 250,
    height: 150,
    type: "strong",
    direction: {x: 1, y: 0}, // rightward
}];

function drawEnemy() {
    if( UrchinImage.complete && UrchinImage.naturalWidth !== 0) {
        playerPH.drawImage(UrchinImage, enemy.x, enemy.y, enemy.width, enemy.height);
    } else {
        playerPH.fillStyle = enemy.color;
    playerPH.fillRect(enemy.x, enemy.y, enemy.width, enemy.height); //Default loading if the asset art fails to load
    }
}

function drawWaterCurrents() {
    playerPH.save();
    playerPH.strokeStyle = "lightblue";
    playerPH.fillStyle = "rgba(148, 210, 231, 0.5)"; // light blue with transparency
    playerPH.lineWidth = 3;
    for (const current of waterCurrents) {
        playerPH.strokeRect(current.x, current.y, current.width, current.height);
        playerPH.fillRect(current.x, current.y, current.width, current.height);
    }
    playerPH.restore();
}

function WCCollision(deltaTime = 1/60) { // deltaTime is the time elapsed since the last frame, defaulting to 60fps
    if (!gameStart) return;

    const overlappingCurrents = waterCurrents.filter(current => {
        return rectX < current.x + current.width &&
               rectX + rectSize > current.x &&
               rectY < current.y + current.height &&
               rectY + rectSize > current.y;
    });

    for (const current of overlappingCurrents) {
        const currentType = CURRENT_TYPES[current.type];
        if (!currentType) continue;
        elementMovement(ELEMENT_WATER_CURRENT,
            current.direction,
            currentType.speed * deltaTime);
    }
}

function elementMovement(elementType, direction, movement) {
    if (elementType !== ELEMENT_WATER_CURRENT) return;
    if (!direction || !Number.isFinite(direction.x) ||
        !Number.isFinite(direction.y) || !Number.isFinite(movement) 
        || movement <= 0) return;

    const length = Math.hypot(direction.x, direction.y);
    if (length === 0) return;

    const moveX = direction.x / length * movement;
    const moveY = direction.y / length * movement;
    
    const steps = Math.ceil(movement / (rectSize / 2));
    for (let step = 0; step < steps; step++) {
        if (!reRender(moveX / steps, moveY / steps)) break;
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

function collidesWithEnemy(x, y) {
    if (x < enemy.x + enemy.width &&
        x + rectSize > enemy.x &&
        y < enemy.y + enemy.height &&
        y + rectSize > enemy.y) {
        return true;
    }
    return false;
}

function spawn(){
    rectX = 23;
    rectY = canvas.height/2;

    playerPH.clearRect(0, 0, canvas.width, canvas.height);
    drawWaterCurrents();
    drawBarriers();

    playerPH.fillStyle = "green";
    playerPH.fillRect(rectX, rectY, rectSize, rectSize);

    drawEnemy();
    
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
    if (collidesWithEnemy(rectX + movePosX, rectY + movePosY)) {
        alert("You have collided with an enemy!"); //JUST FOR TESING ENEMY COLLISION.
        respawn();
        return;
    }
    
    playerPH.clearRect(rectX, rectY, rectSize, rectSize);
    rectX += movePosX;
    rectY += movePosY;

    drawWaterCurrents();
     drawBarriers();
     drawEnemy();

    playerPH.fillStyle = "green";
    playerPH.fillRect(rectX, rectY, rectSize, rectSize);
}

function pcInteract()
{   
        // alert(rectX);
        // alert(rectY);
        alert("Interact Key Pressed!");
}

function move(moveKey) {
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

//DECOMMISIONED - Gravity Function, can be used as a reference for pushing the PC in a direction (CODEBASE : WATER CURRENT)
// function gravUpdate() {
//     if (rectY < 1400) {
//         gravVector = 10;
//         reRender(0, gravVector);
//     }
// }
function updatePhysics(deltaTime) {
    WCCollision(deltaTime);
}
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
