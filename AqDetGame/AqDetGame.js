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
    counter++;
    updatePhysics(deltaTime);
    stopMain = window.requestAnimationFrame(main);
}

function start(){
    canvas.style.width = '1308px';
    canvas.style.height = '649px';
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
var currentLevel = 0;
var currentScreen = 0;


const rectSize = 60;
var rectX; //player PlaceHolder
var rectY;
var gravVector;

var RESPAWN_X;
var RESPAWN_Y;
//0,0, IS TOP LEFT

const moveDistance = 50; 
const STANDARD_MOVEMENT = 50; // pixels per frame
const NO_MOVEMENT = 0;
//const pressedKeys = new Set();

let counter = 0;
const playerVelocity = {x: 0, y: 0};
let activeMovementElement = null;

const ELEMENT_WATER_CURRENT = "waterCurrent";
const CURRENT_TYPES = {
    gentle: { speed: 60 }, // pixels per second
    strong: { speed: 120 }
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameStart = false;
let teleportState = null;
let firstTimeTunnel = true;

const spawnArr = [
    {
        spawnPoints: level3spawn
    }
];

let spawnIndex = 0;

const SEAWEED_SIZE = 40;
const PUDDLE_SIZE = 50;
const ROCKET_SIZE = 70;
const BUBBLE_SIZE = 80;
const PUSH_ROCK_SIZE = PUDDLE_SIZE;


const barriers = createBarrier(canvas);
const interactableItems = createInteractables(canvas);
const jumpPuddles = createJumpPuddle(canvas);
const waterCurrents = createWaterCurrents(canvas);

function drawBarriers() {
    for (const b of barriers[currentScreen]) {
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
}; //color is a default, as the enemies will have pngs mapped to them

/* const waterCurrents = [
    {
    x: 100,
    y: 200,
    width: 250,
    height: 150,
    type: "strong",
    direction: {x: 1, y: 0}, // rightward   (y: -1 up, y: 1 down)
    }
];
*/

const tunnels = [ //Value of X and Y will change based on later implementation of each levels tunnels
    {
        id: "A",
        partnerId: "B",
        x: 100,
        y: canvas.height - 400,
        width: 90,
        height: 45
    },
    {
        id: "B",
        partnerId: "A",
        x: 500,
        y: canvas.height - 500,
        width: 90,
        height: 45
    }
];

const TUNNEL_TIMING = {
    entering: 0.15,
    hidden: 1,
    exiting: 0.15
};

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
    /*
    playerPH.strokeStyle = "lightblue";
    playerPH.fillStyle = "rgba(148, 210, 231, 0.5)"; // light blue with transparency
    playerPH.lineWidth = 3;
    */

    for (const current of waterCurrents[currentScreen]) {
        playerPH.fillStyle = current.color;
        playerPH.fillRect(current.x, current.y, current.width, current.height);
    }
    playerPH.restore();
}

function drawTunnels() {
    playerPH.save();
    playerPH.lineWidth = 4;
    playerPH.font = "14px Arial";
    playerPH.textAlign = "center";
    playerPH.textBaseline = "bottom";

    for(const tunnel of tunnels) {
        const centerX = tunnel.x + tunnel.width/2;
        const centerY = tunnel.y + tunnel.height/2;
        playerPH.beginPath(); //shows connecting paths for the tunnels.
        playerPH.ellipse(centerX, centerY, tunnel.width/2, tunnel.height/2, 0, 0, Math.PI * 2);

        playerPH.fillStyle = "MediumSpringGreen";
        playerPH.fill();
        playerPH.strokeStyle = "orange";
        playerPH.stroke();
        if (firstTimeTunnel) {
            playerPH.fillText(`Press E to teleport`, centerX, tunnel.y - 8);
        }
    }
    playerPH.restore();
}

function drawPlayer() {
    if (teleportState?.phase === "hidden") return; //dont draw player if their state is hidden
    let scale = 1; //scaler for teleporting animation
    if (teleportState) {
        const progress = Math.min(teleportState.elapsed / TUNNEL_TIMING[teleportState.phase], 1); //shrinks / grows player based on elapsed state
        scale = teleportState.phase === "entering" ? 1 - progress : progress;
    }
    const size = rectSize * scale; // updates player size based on previously defined size
    playerPH.fillStyle = "green";
    playerPH.fillRect(rectX + (rectSize - size) / 2, rectY + (rectSize - size) / 2, size, size);
}

function drawAll() {
    playerPH.clearRect(0,0, canvas.width, canvas.height); // clear player so they dont duplicate at the starting teleporter

    drawPlayer();
    drawWaterCurrents();
    drawTunnels();
    drawBarriers();
    drawEnemy();
    drawInteractables();
    drawJumpPuddles();
}

function WCCollision() {
    if (!gameStart) return;

     const overlappingCurrents = waterCurrents.filter(current => {
        return rectX < current.x + current.width && //boundary check for whether the player is in a current
               rectX + rectSize > current.x &&
               rectY < current.y + current.height &&
               rectY + rectSize > current.y;
    });

    for (const current of overlappingCurrents) {
        const currentType = CURRENT_TYPES[current.type]; //apply movement to player based on the defined speed tyoe for current 
        if (!currentType) continue;
        elementMovement(ELEMENT_WATER_CURRENT, current.direction, currentType.speed); //defines movement speed of player based on the kind of current type
    }
}

function tunnelExit(tunnel) {
    return {
        x: tunnel.x + (tunnel.width - rectSize) / 2,
        y: tunnel.y - rectSize + 4};
    }

function elementMovement(elementType, direction, speed) {
    //Check if speed is valid or current is being passed
    if (elementType !== ELEMENT_WATER_CURRENT || !Number.isInteger(speed) || speed <= 0) return false;

    let directionVector;
    if (typeof direction === "string") {
        const normalizedDirection = direction.toLocaleLowerCase(); //
        const directions = {
            up: {x: 0, y: -1},
            down: {x: 0, y: 1},
            left: {x: -1, y: 0},
            right: {x: 1, y: 0}
        };
        directionVector = directions[normalizedDirection];
    }
    else if (direction && Number.isFinite(direction.x) && Number.isFinite(direction.y)) { //Validates nums are in bounds
        directionVector = direction;
    }
    if (!directionVector) {return false;}

    const length = Math.hypot(directionVector.x, directionVector.y);
    if (length === 0) return false;

    //Determine player velocity given the parameters
    playerVelocity.x += directionVector.x / length * speed;
    playerVelocity.y += directionVector.y / length * speed;

    //For future use when we implement animations for interactables and other objects
    //Calls only when a movement element becomes active rather than every frame
    if (activeMovementElement !== elementType) {
        activeMovementElement = elementType;
        //alert("Animation Called"); Commented out for sake of it not appearing everytime for testing, specified in task #249
    }
    return true;
}

function ableToExitTunnel(pcPosition) { //Ensures exit teleport isnt in a barrier or enemy
    return(pcPosition.x >= 0 && pcPosition.y >= 0 && 
        pcPosition.x + rectSize <= canvas.width &&
        pcPosition.y + rectSize <= canvas.height &&
        !collidesWithBarrier(pcPosition.x, pcPosition.y) && 
        !collidesWithEnemy(pcPosition.x, pcPosition.y)
    );
}

function tunnelCollision() {
    if (!gameStart || teleportState) {
        return false;
    }
    const entrance = tunnels.find(tunnel =>
        rectX < tunnel.x + tunnel.width && rectX + rectSize > tunnel.x &&
        rectY < tunnel.y + tunnel.height + 14 && rectY + rectSize > tunnel.y - 14); //define the entrance tunnel location and validate it

    if (!entrance) { return false;}

    const dest = tunnels.find(tunnel => tunnel.id === entrance.partnerId // validate destination tunnel and its partner match
        && tunnel.partnerId === entrance.id && tunnel.id !== entrance.id);
        
    if(!dest || !ableToExitTunnel(tunnelExit(dest))) { return false; } //check if player can exit from destination tunnel

    teleportState = {
        dest,
        elapsed: 0,
        sourceX: rectX,
        sourceY: rectY,
        phase: "entering",
    };
    drawAll();
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

function collidesWithEnemy(x, y) {
    if (x < enemy.x + enemy.width &&
        x + rectSize > enemy.x &&
        y < enemy.y + enemy.height &&
        y + rectSize > enemy.y) {
      return true;
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
    return spawnArr[currentLevel].spawnPoints[spawnIndex];
}

function updateCheckPoint(checknum){
    if(checknum == spawnIndex +1 && checknum < spawnArr[currentLevel].spawnPoints.length){
        spawnIndex = checknum;
    }
}

function spawn(){
  teleportState = null;
    const spawnPoint = getSpawnPoint();
    currentScreen = spawnPoint.screen;
    rectX = spawnPoint.x;
   rectY = spawnPoint.y;
    //alert("X: " + rectX  + "\n Y" + rectY)
    playerPH.clearRect(0, 0, canvas.width, canvas.height);
    drawAll();
}

function respawn(){
    teleportState = null;
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
  playerPH.clearRect(rectX, rectY, canvas.width, canvas.height);

}


function reRender(movePosX, movePosY){
    if (teleportState) {return false; } // prevent movement during teleportation
    const newX = rectX + movePosX;
    const nextY = rectY + movePosY;
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
        const coordinates =
            spawnArr[currentLevel].spawnPoints[currentScreen];

        rectX = coordinates.x;
        rectY = coordinates.y;

        // Draw new screen
        playerPH.clearRect(0, 0, canvas.width, canvas.height);

        drawAll();
        return;
    }

    if (collidesWithBarrier(rectX + movePosX, rectY + movePosY)) {
        return false;
    }
    if (collidesWithEnemy(rectX + movePosX, rectY + movePosY)) {
        respawn();
        return false;
    }
    
    console.log("X: " + newX + " Y: " + nextY);
    playerPH.clearRect(rectX, rectY, rectSize, rectSize);
    rectX = newX;
    rectY = nextY;

    drawAll();
    return true;
}

function pcInteract()
{   
    return tunnelCollision();
}

// moves the player a fixed amount, depending on the key pressed (WASD)
function moveCharacterWASD(moveKeys) {
    moveDistanceX = NO_MOVEMENT;
    let moveDistanceY = NO_MOVEMENT;
    if (moveKeys.has('a')){
        console.log("a pressed");
        moveDistanceX -= STANDARD_MOVEMENT;
    }
     if (moveKeys.has('w')){
        console.log("W pressed");
	    moveDistanceY -= STANDARD_MOVEMENT;
    }
    if (moveKeys.has('s')){
        console.log("S pressed")
        moveDistanceY += STANDARD_MOVEMENT;
    }
    if (moveKeys.has('d')){
        console.log("D pressed");
        moveDistanceX += STANDARD_MOVEMENT;
    }
    //alert(moveDistanceX + " " + moveDistanceY);
    reRender(moveDistanceX, moveDistanceY);
}

window.addEventListener("keydown", (e) =>{ 
    const pressedKeys = new Set();
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
    } else if (e.key.toLowerCase() === "e") { //'e' key pressed, call enter
        pcInteract();
    }
    else if ((e.key).toLowerCase() === 'c')
    {
        respawn();
    }
    else {}
})

function updatePhysics(deltaTime) {
    if (teleportState) {
        updateTeleport(deltaTime);
        return;
    }
    playerVelocity.x = 0; //reflect updates from elementMovement()
    playerVelocity.y = 0;
    WCCollision(deltaTime); // players velocity doesnt effect the currents ability to move player, so only use deltaTime

    if (playerVelocity.x !== 0 || playerVelocity.y !== 0) { // only rerender if the velocity is changing or player is not stationary
        reRender(playerVelocity.x * deltaTime, playerVelocity.y * deltaTime);
    }
    else {
        activeMovementElement = null;
    }
}

function updateTeleport(deltaTime) {
    if(!teleportState) return;

    teleportState.elapsed += deltaTime;
    while (teleportState && teleportState.elapsed >= TUNNEL_TIMING[teleportState.phase]) { // Checks progress of each state of teleporting
        teleportState.elapsed -= TUNNEL_TIMING[teleportState.phase];
        if (teleportState.phase === "entering") {
            teleportState.phase = "hidden";
        }
        else if (teleportState.phase === "hidden") { // update player location based on the respective exit tunnel
            const exit = tunnelExit(teleportState.dest);

            if (ableToExitTunnel(exit)) { // if player is able to exit dest tunnel, update player location vars
                rectX = exit.x;
                rectY = exit.y;
            }
            else {
                rectX = teleportState.sourceX; 
                rectY = teleportState.sourceY;
            }
            teleportState.phase = "exiting";
        }
        else { 
            teleportState = null; 
        }
    }
    drawAll();
}

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

start()
