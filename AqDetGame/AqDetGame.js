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
    playerPH.imageSmoothingEnabled = false;
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

const moveDistance = 15; 

counter = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameStart = false;

const TILE = 60;

// Images
const tileSheet = new Image();
tileSheet.src = "tilesheet.png";
const playerSheet = new Image();
playerSheet.src = "playersheet.png";

// Column of each tile in tilesheet.png
const TILE_INDEX = {
    floor: 0, floor_alt: 1, wall: 2, background: 3, pit: 4,
    pit_cliff: 5, edge_up: 6, edge_down: 7, edge_left: 8, edge_right: 9
};
// Row of each direction in playersheet.png
const DIR_ROW = { down: 0, up: 1, left: 2, right: 3 };

let facing = "down";
let walkFrame = 0;   // 0 idle, 1 walk0, 2 walk1
let stepCount = 0;

// Level: 1 character = 1 tile
const levelMap = [
    "##############",
    "#............#",
    "#..,.........#",
    "#.......#....#",
    "#.......#....#",
    "#.....~~~....#",
    "#.....___..,.#",
    "#............#",
    "##############",
];
const CHAR_TO_TILE = { "#": "wall", ".": "floor", ",": "floor_alt", "_": "pit", "~": "pit_cliff", " ": "background" };
const SOLID = new Set(["#", "_", "~", " "]);

function drawTile(name, col, row) {
    const i = TILE_INDEX[name];
    playerPH.drawImage(tileSheet, i * TILE, 0, TILE, TILE, col * TILE, row * TILE, TILE, TILE);
}

function drawMap() {
    for (let row = 0; row < levelMap.length; row++)
        for (let col = 0; col < levelMap[row].length; col++)
            drawTile(CHAR_TO_TILE[levelMap[row][col]] || "background", col, row);
}

function drawPlayer() {
    playerPH.drawImage(playerSheet, walkFrame * TILE, DIR_ROW[facing] * TILE, TILE, TILE, rectX, rectY, TILE, TILE);
}

function draw() {
    playerPH.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawPlayer();
}

function tileAt(px, py) {
    const col = Math.floor(px / TILE), row = Math.floor(py / TILE);
    if (row < 0 || row >= levelMap.length || col < 0 || col >= levelMap[row].length) return " ";
    return levelMap[row][col];
}

function isBlocked(x, y) {
    const corners = [[x, y], [x + rectSize - 1, y], [x, y + rectSize - 1], [x + rectSize - 1, y + rectSize - 1]];
    return corners.some(([cx, cy]) => SOLID.has(tileAt(cx, cy)));
}

//const TILE = 60; // Size of each tile in pixels

//const tileArt = {
//   "0": "white", // Empty space
//    "1": "black", // Wall
//    "2": "blue"   // Water

//    playerPH.fillStyle = tileArt[tileType];
//    playerPH.fillRect(x * TILE, y * TILE, TILE, TILE);
//    playerPH.strokeStyle = "gray";
//    playerPH.lineWidth = 2;

//    playerPH.beginPath();
//    playerPH.moveTo(x, y + TILE /2);
//    playerPH.lineTo(x + TILE, y + TILE /2);
//    playerPH.moveTo(x + TILE / 2, y);
//    playerPH.lineTo(x + TILE / 2, y + TILE /2);
//    playerPH.moveTo(x, y + TILE / 2);
//    playerPH.lineTo(x, y + TILE);
//    playerPH.stroke();
//}

function spawn() {
    rectX = 1 * TILE;
    rectY = 1 * TILE;
    facing = "down";
    walkFrame = 0;
    draw();
}

function respawn(){
    findRespawn();
    rectX = RESPAWN_X;
    rectY = RESPAWN_Y;
    facing = "down";
    walkFrame = 0;
    draw();
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
    if (isBlocked(rectX + movePosX, rectY + movePosY)) {
        walkFrame = 0;
        draw();
        return;
    }
    rectX += movePosX;
    rectY += movePosY;
    stepCount++;
    walkFrame = (Math.floor(stepCount / 2) % 2) + 1;
    draw();
}

function pcInteract()
{   
        // alert(rectX);
        // alert(rectY);
        alert("Interact Key Pressed!");
}

function move(moveKey) {
if (moveKey.key == "w"){ facing = "up";    reRender(0, -moveDistance); }
else if (moveKey.key == "a"){ facing = "left";  reRender(-moveDistance, 0); }
else if (moveKey.key == "s"){ facing = "down";  reRender(0, moveDistance); }
else if (moveKey.key == "d"){ facing = "right"; reRender(moveDistance, 0); }
}

window.addEventListener("keydown", (e) =>{ 
    main(); //infinite loop
    
    //Fix to allow caps letters and multiple buttons being pressed
    if(e.key === "Enter" && !gameStart){
        gameStart = true; 
        spawn();
    } else if(gameStart && (e.key == "w" || e.key == "a" || e.key == "s" || 
    	e.key == "d")){
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

window.addEventListener("keyup", (e) => {
    if (gameStart && "wasd".includes(e.key)) {
        walkFrame = 0;
        draw();
    }
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
    drawLevelOption(level, isUnlocked(level));
  }
}

let imagesLoaded = 0;
function onImageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 2) start();
}
tileSheet.onload = onImageLoaded;
playerSheet.onload = onImageLoaded;