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
    //set canvas size
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

const lvlCanvas = document.getElementById('LevelDisplay');
const lvlLayout = lvlCanvas.getContext("2d"); //CANVAS LAYER FOR LEVEL LAYOUT, MOVEMENT/INTERACTABLES

const bckgrndCanvas = document.getElementById('BackgroundDisplay');
const background = bckgrndCanvas.getContext("2d");


var currentLevel = 0;
var currentScreen = 0;
const canvas = document.getElementById("PlrDisplay");
canvas.width = 1308;
canvas.height = 649;
canvas.style.width = "1308px";
canvas.style.height = "649px";
const playerPH = canvas.getContext("2d");

const initialSetupScreen = document.getElementById("initialSetup");
const beginGameButton = document.getElementById("beginGame");
const levelSelectScreen = document.querySelector(".level-select");
const gameScreen = document.getElementById("gameScreen");
const completionMenu = document.getElementById("completionMenu");
const completionWaiting = document.getElementById("completionWaiting");
const surrenderMenu = document.getElementById("surrenderMenu");
const cancelSurrenderOfferButton = document.getElementById("cancelSurrenderOffer");
const currentLevelTitle = document.getElementById("currentLevelTitle");
const offerSurrenderButton = document.getElementById("offerSurrender");

let stopMain = null;
let lastFrameTime = null;
let counter = 0;

const TOTAL_LEVELS = 5;
const STANDARD_MOVEMENT = 15;
const rectSize = 60;
var rectX; //player PlaceHolder
var rectY;
var gravVector;
var lastKeyPressed;

var RESPAWN_X;
var RESPAWN_Y;
//0,0, IS TOP LEFT
var bubbleResX = -1;
var bubbleResY = -1;

var signalFlareIndex = -1;
const moveDistance = 15;
const NO_MOVEMENT = 0;
const pressedKeys = new Set();

//Interactable Type Constants
const pushBlock = 11;
const bubble = 22;
const signalFlare = 33;
var interactActive = false;
var currObj = -1;


const moveDistance = 25; 
counter = 0;

const interactableSize = 75;
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




canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
lvlCanvas.width = window.innerWidth;
lvlCanvas.height = window.innerHeight;
bckgrndCanvas.width = window.innerWidth;
bckgrndCanvas.height = window.innerHeight;

const playerVelocity = { x: 0, y: 0 };
let activeMovementElement = null;

let currentLevel = 1;
let currentScreen = 0;
let rectX = 120;
let rectY = 500;
let gravVector = { x: 0, y: 0 };
let RESPAWN_X = rectX;
let RESPAWN_Y = rectY;
let gameStart = false;
let teleportState = null;
let firstTimeTunnel = true;
let spawnIndex = 0;

const ELEMENT_WATER_CURRENT = "waterCurrent";
const CURRENT_TYPES = {
  gentle: { speed: 60 },
  strong: { speed: 120 },
};

const TUNNEL_TIMING = {
  entering: 0.15,
  hidden: 1,
  exiting: 0.15,
};

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
const SEAWEED_SIZE = 40;
const PUDDLE_SIZE = 50;
const ROCKET_SIZE = 70;
const BUBBLE_SIZE = 80;
const PUSH_ROCK_SIZE = PUDDLE_SIZE;

const level1spawn = [
  { screen: 0, x: 120, y: 480 },
  { screen: 1, x: 120, y: 190 },
  { screen: 2, x: 120, y: 190 },
  { screen: 3, x: 120, y: 190 },
];

function drawBarriers() {
    for (const b of barriers[currentScreen]) {
        playerPH.fillStyle = b.color;
        playerPH.fillRect(b.x,b.y,b.width,b.height);
    }
    drawObjectBarriers();
}

function drawObjectBarriers() {
    // lvlLayout.clearRect(0, 0, canvas.width, canvas.height);
    for (const obj of interactableLoc) {
        lvlLayout.strokeStyle = 'green';
        lvlLayout.strokeRect(obj.x, obj.y, obj.width, obj.height);
    }
    
const spawnArr = [{ spawnPoints: level1spawn }];

const SPRITES = [];
const UrchinImage = new Image();
UrchinImage.src = "AqDetImport/UrchinEnemy.png";
UrchinImage.onload = () => {
  SPRITES.push(UrchinImage);
};

const enemy = {
  x: 200,
  y: 500,
  width: 50,
  height: 50,
  color: "purple",
};

const waterCurrents = [
  {
    x: 100,
    y: 200,
    width: 250,
    height: 150,
    type: "strong",
    direction: { x: 1, y: 0 },
  },
];

const tunnels = [
  { id: "A", partnerId: "B", x: 100, y: canvas.height - 400, width: 90, height: 45 },
  { id: "B", partnerId: "A", x: 500, y: canvas.height - 600, width: 90, height: 45 },
];

function createBarrier() {
  return [
    [
      { x: 0, y: 0, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: canvas.height - 22, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: canvas.width - 22, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: 260, y: 330, width: 120, height: 24, color: "#2a4b5f" },
    ],
    [
      { x: 0, y: 0, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: canvas.height - 22, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: canvas.width - 22, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: 420, y: 260, width: 100, height: 26, color: "#2a4b5f" },
    ],
    [
      { x: 0, y: 0, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: canvas.height - 22, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: canvas.width - 22, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: 260, y: 210, width: 120, height: 22, color: "#2a4b5f" },
    ],
    [
      { x: 0, y: 0, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: canvas.height - 22, width: canvas.width, height: 22, color: "#7f9ea7" },
      { x: 0, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: canvas.width - 22, y: 0, width: 22, height: canvas.height, color: "#7f9ea7" },
      { x: 480, y: 320, width: 140, height: 24, color: "#2a4b5f" },
    ],
  ];
}

function createInteractables() {
  return [
    [
      { x: 180, y: 260, width: 26, height: 26, color: "#d0f0ff" },
      { x: 640, y: 300, width: 26, height: 26, color: "#d0f0ff" },
    ],
    [
      { x: 300, y: 200, width: 26, height: 26, color: "#d0f0ff" },
      { x: 720, y: 220, width: 26, height: 26, color: "#d0f0ff" },
    ],
    [
      { x: 200, y: 220, width: 26, height: 26, color: "#d0f0ff" },
      { x: 620, y: 330, width: 26, height: 26, color: "#d0f0ff" },
    ],
    [
      { x: 300, y: 250, width: 26, height: 26, color: "#d0f0ff" },
      { x: 760, y: 270, width: 26, height: 26, color: "#d0f0ff" },
    ],
  ];
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
const jumpPuddles = [
    [], // screen 0, no jump puddles
    [ // screen 1
        { // left puddle, swaps with [1][1]
            x: rectSize * 4 + canvas.width / 2,
            y: canvas.height / 2 + rectSize,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            color: "MediumPurple"
        },
        { // right puddle, swaps with [1][0]
            x: canvas.width / 1.2 - SEAWEED_SIZE * 2 + 5,
            y: canvas.height - rectSize * 4 - SEAWEED_SIZE / 2 - 5,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            color: "MediumPurple"
        }
    ], 
    [ // screen 2
        { // top right puddle, swaps with [2][1]
            x: canvas.width - rectSize * 2 - SEAWEED_SIZE,
            y: rectSize,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            color: "MediumPurple"
        },
        { // bottom right puddle, swaps with [2][0]
            x: canvas.width - rectSize * 6,
            y: canvas.height - rectSize * 2,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            color: "MediumPurple"
        }
function createJumpPuddle() {
  return [
    [
      { x: 120, y: 450, width: 55, height: 18, color: "#a1d4d6" },
      { x: 610, y: 380, width: 55, height: 18, color: "#a1d4d6" },
    ],
    [
      { x: 150, y: 480, width: 55, height: 18, color: "#a1d4d6" },
      { x: 700, y: 260, width: 55, height: 18, color: "#a1d4d6" },
    ],
    [
      { x: 190, y: 430, width: 55, height: 18, color: "#a1d4d6" },
      { x: 670, y: 300, width: 55, height: 18, color: "#a1d4d6" },
    ],
    [
      { x: 140, y: 470, width: 55, height: 18, color: "#a1d4d6" },
      { x: 660, y: 270, width: 55, height: 18, color: "#a1d4d6" },
    ],
  ];
}

const barriers = createBarrier();
const interactableItems = createInteractables();
const jumpPuddles = createJumpPuddle();

function drawBarriers() {
  for (const b of barriers[currentScreen] || []) {
    playerPH.fillStyle = b.color;
    playerPH.fillRect(b.x, b.y, b.width, b.height);
  }
}

function drawEnemy() {
  if (UrchinImage.complete && UrchinImage.naturalWidth !== 0) {
    playerPH.drawImage(UrchinImage, enemy.x, enemy.y, enemy.width, enemy.height);
    return;
  }
  playerPH.fillStyle = enemy.color;
  playerPH.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
}

function drawWaterCurrents() {
  playerPH.save();
  playerPH.strokeStyle = "lightblue";
  playerPH.fillStyle = "rgba(148, 210, 231, 0.5)";
  playerPH.lineWidth = 3;
  for (const current of waterCurrents) {
    playerPH.strokeRect(current.x, current.y, current.width, current.height);
    playerPH.fillRect(current.x, current.y, current.width, current.height);
  }
  playerPH.restore();
}

function tunnelExit(tunnel) {
  return {
    x: tunnel.x + (tunnel.width - rectSize) / 2,
    y: tunnel.y - rectSize + 4,
  };
}

function drawTunnels() {
  playerPH.save();
  playerPH.lineWidth = 4;
  playerPH.font = "14px Arial";
  playerPH.textAlign = "center";
  playerPH.textBaseline = "bottom";

  for (const tunnel of tunnels) {
    const centerX = tunnel.x + tunnel.width / 2;
    const centerY = tunnel.y + tunnel.height / 2;
    playerPH.beginPath();
    playerPH.ellipse(centerX, centerY, tunnel.width / 2, tunnel.height / 2, 0, 0, Math.PI * 2);
    playerPH.fillStyle = "MediumSpringGreen";
    playerPH.fill();
    playerPH.strokeStyle = "orange";
    playerPH.stroke();
    if (firstTimeTunnel) {
      playerPH.fillText("Press E to teleport", centerX, tunnel.y - 8);
    }
  }
  playerPH.restore();
}

function drawPlayer() {
  if (teleportState?.phase === "hidden") return;

  let scale = 1;
  if (teleportState) {
    const progress = Math.min(teleportState.elapsed / TUNNEL_TIMING[teleportState.phase], 1);
    scale = teleportState.phase === "entering" ? 1 - progress : progress;
  }

  const size = rectSize * scale;
  playerPH.fillStyle = "green";
  playerPH.fillRect(rectX + (rectSize - size) / 2, rectY + (rectSize - size) / 2, size, size);
}

function drawJumpPuddles() {
  for (const d of jumpPuddles[currentScreen] || []) {
    playerPH.fillStyle = d.color;
    playerPH.fillRect(d.x, d.y, d.width, d.height);
  }
}

function drawInteractables() {
  for (const d of interactableItems[currentScreen] || []) {
    playerPH.fillStyle = d.color;
    playerPH.fillRect(d.x, d.y, d.width, d.height);
  }
}

function drawAll() {
  playerPH.clearRect(0, 0, canvas.width, canvas.height);
  drawWaterCurrents();
  drawTunnels();
  drawBarriers();
  drawEnemy();
  drawPlayer();
  drawInteractables();
  drawJumpPuddles();
}

function WCCollision() {
  if (!gameStart) return;

  const overlappingCurrents = waterCurrents.filter((current) => {
    return rectX < current.x + current.width &&
      rectX + rectSize > current.x &&
      rectY < current.y + current.height &&
      rectY + rectSize > current.y;
  });

  for (const current of overlappingCurrents) {
    const currentType = CURRENT_TYPES[current.type];
    if (!currentType) continue;
    elementMovement(ELEMENT_WATER_CURRENT, current.direction, currentType.speed);
  }
}

function elementMovement(elementType, direction, speed) {
  if (elementType !== ELEMENT_WATER_CURRENT || !Number.isInteger(speed) || speed <= 0) return false;

  let directionVector = null;
  if (typeof direction === "string") {
    const normalizedDirection = direction.toLocaleLowerCase();
    const directions = {
      up: { x: 0, y: -1 },
      down: { x: 0, y: 1 },
      left: { x: -1, y: 0 },
      right: { x: 1, y: 0 },
    };
    directionVector = directions[normalizedDirection];
  } else if (direction && Number.isFinite(direction.x) && Number.isFinite(direction.y)) {
    directionVector = direction;
  }

  if (!directionVector) {
    return false;
  }

  const length = Math.hypot(directionVector.x, directionVector.y);
  if (length === 0) return false;

  playerVelocity.x += (directionVector.x / length) * speed;
  playerVelocity.y += (directionVector.y / length) * speed;

  if (activeMovementElement !== elementType) {
    activeMovementElement = elementType;
  }

  return true;
}

function ableToExitTunnel(pcPosition) {
  return (
    pcPosition.x >= 0 &&
    pcPosition.y >= 0 &&
    pcPosition.x + rectSize <= canvas.width &&
    pcPosition.y + rectSize <= canvas.height &&
    !collidesWithBarrier(pcPosition.x, pcPosition.y) &&
    !collidesWithEnemy(pcPosition.x, pcPosition.y)
  );
}

function tunnelCollision() {
  if (!gameStart || teleportState) return false;

  const entrance = tunnels.find((tunnel) => {
    return rectX < tunnel.x + tunnel.width &&
      rectX + rectSize > tunnel.x &&
      rectY < tunnel.y + tunnel.height + 14 &&
      rectY + rectSize > tunnel.y - 14;
  });

  if (!entrance) return false;

  const dest = tunnels.find((tunnel) => {
    return tunnel.id === entrance.partnerId &&
      tunnel.partnerId === entrance.id &&
      tunnel.id !== entrance.id;
  });

  if (!dest || !ableToExitTunnel(tunnelExit(dest))) return false;

  teleportState = {
    dest,
    elapsed: 0,
    sourceX: rectX,
    sourceY: rectY,
    phase: "entering",
  };
  drawAll();
  return true;
}

function collidesWithBarrier(x, y) {
  for (const b of barriers[currentScreen] || []) {
    if (x < b.x + b.width && x + rectSize > b.x && y < b.y + b.height && y + rectSize > b.y) {
      return true;
    }
  }
  return false;
}

function collidesWithEnemy(x, y) {
  if (x < enemy.x + enemy.width && x + rectSize > enemy.x && y < enemy.y + enemy.height && y + rectSize > enemy.y) {
    return true;
  }
  return false;
}

function reachScreenEnd(x) {
  return x < 1 && x > -20;
}

function getSpawnPoint() {
  return spawnArr[currentLevel - 1]?.spawnPoints[spawnIndex] ?? { screen: 0, x: 120, y: 480 };
}

function updateCheckPoint(checknum) {
  const total = spawnArr[currentLevel - 1]?.spawnPoints.length ?? 0;
  if (checknum === spawnIndex + 1 && checknum < total) {
    spawnIndex = checknum;
  }
}

function spawn() {
  teleportState = null;
  const spawnPoint = getSpawnPoint();
  currentScreen = spawnPoint.screen;
  rectX = spawnPoint.x;
  rectY = spawnPoint.y;
  playerPH.clearRect(0, 0, canvas.width, canvas.height);
  drawAll();
}

function respawn() {
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


function findRespawn(){ //Will eventually be upgraded to search for respawn points based on the currently loaded level
    var newResX;
    var newResY;
    if (rectX >= 400){
        newResX = 700;
    }
    else if (rectX < 400){
        newResX = 100;
    }

  if (rectX >= 400) newResX = 700;
  else if (rectX < 400) newResX = 100;


//Currently a shorthand funtion, can eventually be used to house animations associated with respawning
function removeOldCharacter() {
  playerPH.clearRect(rectX, rectY, canvas.width, canvas.height); //Shorthand to clear old character instance, SHOULD BE CALLED BEFORE RECTX OR RECTY ARE MODIFIED
  if (rectY >= 500) newResY = 900;
  else if (rectY < 500) newResY = 100;

  saveRespawnCoordinates(newResX, newResY);
}


function reRender(movePosX, movePosY) {
  if (teleportState) return false;

function reRender(movePosX, movePosY){
    var count = 0;
    
    if (collidesWithBarrier(rectX + movePosX, rectY + movePosX) || collidesWithObject(rectX+movePosX, rectY+movePosY)) {
        return;
    }

  if (reachScreenEnd(nextX)) {
    if (currentScreen === 3) {
      levelCompleted();
      return;
    }
    
    removeOldCharacter(); //Must be called BEFORE RectX and RectY are modified
    rectX += movePosX;
    rectY += movePosY;
    drawBarriers();
    
    if (currObj != -1){
      if (interactableLoc[currObj].type == pushBlock && interactableLoc[currObj].activated){
        interactableLoc[currObj].x += movePosX;
        interactableLoc[currObj].y += movePosY;
      } else if (interactableLoc[currObj].type == bubble && interactableLoc[currObj].activated){
        interactableLoc[currObj].x += movePosX;
        interactableLoc[currObj].y += movePosY;
        bubbleCounter--;  
        if (bubbleCounter == 0 && interactableLoc[currObj].type == bubble) {
          bubblePop();
        }
      }
    }


    

    //TO IMPLEMENT: Function for checking if the player character is standing on a kill-you tile


    updateCheckPoint(currentScreen + 1);
    currentScreen += 1;

    const coordinates = spawnArr[currentLevel - 1].spawnPoints[currentScreen];
    rectX = coordinates.x;
    rectY = coordinates.y;
    playerPH.clearRect(0, 0, canvas.width, canvas.height);
    drawAll();
    return;
  }

  if (collidesWithBarrier(nextX, nextY)) {
    return false;
  }

  if (collidesWithEnemy(nextX, nextY)) {
    respawn();
    return false;
  }

  playerPH.clearRect(rectX, rectY, rectSize, rectSize);
  rectX = nextX;
  rectY = nextY;
  drawAll();
  return true;
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
      if ((obj.y <= rectY-(moveDistance/2)) && (rectY-(moveDistance/2) <= obj.y+interactableSize) && Math.abs(rectX-obj.x) <= moveDistance*2) {
        currObj = count;
        return true;
      }
      count++;
    }
  } else if (lastKeyPressed == "a"){ //CHECK LEFT, NEG X
    for (var obj of interactableLoc){
      if ((obj.x <= rectX-(moveDistance/2)) && (rectX-(moveDistance/2) <= obj.x+interactableSize) && Math.abs(rectY-obj.y) <= moveDistance*3) {
        currObj = count;
        return true;
      }
    count++;
    }
  } else if (lastKeyPressed == "s"){ //CHECK DOWN, POS Y
    for (var obj of interactableLoc){
      if ((obj.y <= rectY+rectSize+(moveDistance/2)) && (rectY+rectSize+(moveDistance/2) <= obj.y+interactableSize) && Math.abs(rectX-obj.x) <= moveDistance*2) {
        currObj = count;
        return true;
      }
    count++;
    }
  } else if (lastKeyPressed == "d"){ //CHECK RIGHT, POS X
    for (var obj of interactableLoc) {
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
  if (interactableLoc[currObj].type == bubble) {
    bubblePush(interactableLoc[currObj].x, interactableLoc[currObj].y);
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
    interactableLoc[currObj].activated = false;
    interactableLoc[currObj].x = bubbleResX;
    interactableLoc[currObj].y = bubbleResY;
    interactActive = false;
    pcInteract();
}


// function move(moveKey) {
    
//   lastKeyPressed = moveKey.key;
//     if (moveKey.key == "w"){
//         reRender(0, -moveDistance);
//     } else if (moveKey.key == "a"){
// 	reRender(-moveDistance, 0);
//     } else if (moveKey.key == "s"){
// 	reRender(0, moveDistance);
//     } else if (moveKey.key == "d"){
// 	reRender(moveDistance, 0);
// moves the player a fixed amount, depending on the key pressed (WASD)
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
    if(e.key == "Enter" && !gameStart){
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
    } else if (e.key == 'o') { //DEBUG: Prints current location of the PC
        alert(rectX);
        alert(rectY);
    }
    else {}
})

window.addEventListener("flareSent", () => {
  interactableLoc[currObj].color = "pink";
  window.dispatchEvent(flareLanded);
})

window.addEventListener("flareLanded", (sfx, sfy) => {
  lvlLayout.fillStyle = "Red";
  lvlLayout.fillRect(400, 400, rectSize*2, rectSize);
})
window.addEventListener('keyup', (event) => {
    // Remove the key from the Set when released
    pressedKeys.delete(event.key.toLowerCase());
});
function pcInteract() {
  return tunnelCollision();
}

function moveCharacterWASD(moveKeys) {
  let moveDistanceX = NO_MOVEMENT;
  let moveDistanceY = NO_MOVEMENT;

  if (moveKeys.has("w")) {
    moveDistanceY -= STANDARD_MOVEMENT;
  } else if (moveKeys.has("a")) {
    moveDistanceX -= STANDARD_MOVEMENT;
  } else if (moveKeys.has("s")) {
    moveDistanceY += STANDARD_MOVEMENT;
  } else if (moveKeys.has("d")) {
    moveDistanceX += STANDARD_MOVEMENT;
  }

  reRender(moveDistanceX, moveDistanceY);
}

function updatePhysics(deltaTime) {
  if (teleportState) {
    updateTeleport(deltaTime);
    return;
  }

  playerVelocity.x = 0;
  playerVelocity.y = 0;
  WCCollision();

  if (playerVelocity.x !== 0 || playerVelocity.y !== 0) {
    reRender(playerVelocity.x * deltaTime, playerVelocity.y * deltaTime);
  } else {
    activeMovementElement = null;
  }
}

function updateTeleport(deltaTime) {
  if (!teleportState) return;

  teleportState.elapsed += deltaTime;
  while (teleportState && teleportState.elapsed >= TUNNEL_TIMING[teleportState.phase]) {
    teleportState.elapsed -= TUNNEL_TIMING[teleportState.phase];

    if (teleportState.phase === "entering") {
      teleportState.phase = "hidden";
    } else if (teleportState.phase === "hidden") {
      const exit = tunnelExit(teleportState.dest);
      if (ableToExitTunnel(exit)) {
        rectX = exit.x;
        rectY = exit.y;
      } else {
        rectX = teleportState.sourceX;
        rectY = teleportState.sourceY;
      }
      teleportState.phase = "exiting";
    } else {
      teleportState = null;
    }
  }

  drawAll();
}

function levelCompleted() {
  onLevelCompleted(currentLevel);
  chosenOption = null;
  completionMenu.hidden = false;
  completionMenu.classList.remove("is-waiting");
  completionWaiting.hidden = true;
  completionMenu.querySelectorAll("[data-completion-option]").forEach((button) => {
    button.disabled = false;
  });
}

function onOptionPressed(option) {
  if (chosenOption !== null || !["continue", "exit"].includes(option)) return;
  chosenOption = option;
  completionMenu.classList.add("is-waiting");
  completionWaiting.hidden = false;
  completionMenu.querySelectorAll("[data-completion-option]").forEach((button) => {
    button.disabled = true;
  });
  alertPartnerPlayer(option);
}

function alertPartnerPlayer(flag) {
  window.dispatchEvent(new CustomEvent("echolalia:alternate-player-alert", {
    detail: { option: flag, flag },
  }));
}

function onAlternatePlayerResponse() {
  if (surrenderOfferPending) {
    surrenderOfferPending = false;
    surrenderMenu.hidden = true;
    return;
  }

  if (chosenOption === null) return;

  const responseOption = chosenOption;
  chosenOption = null;
  completionMenu.hidden = true;
  completionMenu.classList.remove("is-waiting");
  completionWaiting.hidden = true;

  if (responseOption === "continue") loadNextLevel();
  else loadLevelSelect();
}

let chosenOption = null;
let surrenderOfferPending = false;
let highestUnlocked = 1;

function isUnlocked(level) {
  return level <= highestUnlocked;
}

function onLevelCompleted(level) {
  if (level === highestUnlocked && level < TOTAL_LEVELS) {
    highestUnlocked = level + 1;
  }
  updateLevelSelectButtons();
}

function onLevelSelected(level) {
  if (!isUnlocked(level)) return;
  loadLevel(level);
}

function updateLevelSelectButtons() {
  document.querySelectorAll(".level[data-level]").forEach((button) => {
    const unlocked = isUnlocked(Number(button.dataset.level));
    button.classList.toggle("is-locked", !unlocked);
    button.disabled = !unlocked;
    button.setAttribute("aria-disabled", String(!unlocked));
    const lock = button.querySelector(".level__lock");
    if (lock) lock.hidden = unlocked;
    if (!unlocked) button.setAttribute("aria-label", `Level ${button.dataset.level} locked`);
    else button.setAttribute("aria-label", `Level ${button.dataset.level}`);
  });
}

function loadLevel(level) {
  currentLevel = level;
  currentScreen = 0;
  levelSelectScreen.hidden = true;
  gameScreen.hidden = false;
  currentLevelTitle.textContent = `Level ${level}`;
  gameStart = true;
  spawn();
  if (stopMain === null) {
    stopMain = window.requestAnimationFrame(main);
  }
}

function loadNextLevel() {
  if (currentLevel < TOTAL_LEVELS) loadLevel(currentLevel + 1);
  else loadLevelSelect();
}

function loadLevelSelect() {
  gameScreen.hidden = true;
  levelSelectScreen.hidden = false;
  gameStart = false;
  playerPH.clearRect(0, 0, canvas.width, canvas.height);
}

function drawLevelOption(level, unlocked) {
  const button = document.querySelector(`.level[data-level="${level}"]`);
  if (!button) return;
  const lock = button.querySelector(".level__lock");
  button.disabled = !unlocked;
  button.classList.toggle("is-locked", !unlocked);
  if (lock) lock.hidden = unlocked;
}

function levelSelectDisplay() {
  for (let level = 1; level <= TOTAL_LEVELS; level++) {
    drawLevelOption(level, isUnlocked(level));
  }
  initialSetupScreen.hidden = true;
  levelSelectScreen.hidden = false;
}

function onSetupKeyDown(event) {
  if (event.key !== "Enter") return;
  if (levelSelectShown) return;
  levelSelectShown = true;
  levelSelectDisplay();
}

window.main = (timestamp = performance.now()) => {
  if (!gameStart) {
    stopMain = null;
    lastFrameTime = null;
    return;
  }

  const deltaTime = lastFrameTime === null ? 0 : Math.min((timestamp - lastFrameTime) / 1000, 0.05);
  lastFrameTime = timestamp;
  counter += 1;
  updatePhysics(deltaTime);
  stopMain = window.requestAnimationFrame(main);
};

function start() {
  canvas.style.width = "1308px";
  canvas.style.height = "649px";
  playerPH.clearRect(0, 0, canvas.width, canvas.height);

  if (!gameStart) {
    playerPH.fillStyle = "Black";
    playerPH.font = "80px Arial";
    playerPH.textAlign = "center";
    playerPH.textBaseline = "middle";
    playerPH.fillText("PRESS ENTER TO START", canvas.width / 2, canvas.height / 2);
  } else {
    spawn();
  }
}

function onOfferSurrender() {
  if (surrenderOfferPending) return;
  surrenderOfferPending = true;
  surrenderMenu.hidden = false;
  alertPartnerPlayer("surrender-offered");
}

function startLoopFromKeydown() {
  if (!gameStart || !stopMain) {
    return;
  }
  stopMain = window.requestAnimationFrame(main);
}

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (event.key === "Enter" && !gameStart) {
    gameStart = true;
    loadLevel(1);
    return;
  }

  if (!gameStart || gameScreen.hidden || !completionMenu.hidden) return;

  if (["w", "a", "s", "d"].includes(key)) {
    pressedKeys.add(key);
    moveCharacterWASD(pressedKeys);
  }

  if (key === "e") {
    pcInteract();
  } else if (key === "c") {
    respawn();
  }

  if (key === " ") {
    return;
  }
});

window.addEventListener("keyup", (event) => {
  pressedKeys.delete(event.key.toLowerCase());
});

window.addEventListener("echolalia:alternate-player-response", onAlternatePlayerResponse);
window.levelCompleted = levelCompleted;
window.onAlternatePlayerResponse = onAlternatePlayerResponse;
window.levelSelectDisplay = levelSelectDisplay;

beginGameButton.addEventListener("click", () => {
  levelSelectDisplay();
});

document.querySelectorAll(".level[data-level]").forEach((button) => {
  button.addEventListener("click", () => onLevelSelected(Number(button.dataset.level)));
});

completionMenu.querySelectorAll("[data-completion-option]").forEach((button) => {
  button.addEventListener("click", () => onOptionPressed(button.dataset.completionOption));
});

offerSurrenderButton.addEventListener("click", onOfferSurrender);
cancelSurrenderOfferButton.addEventListener("click", () => {
  if (!surrenderOfferPending) return;
  surrenderOfferPending = false;
  surrenderMenu.hidden = true;
  alertPartnerPlayer("surrender-offer-cancelled");
});

document.addEventListener("keydown", onSetupKeyDown);

let levelSelectShown = false;
updateLevelSelectButtons();
initialSetupScreen.hidden = true;
levelSelectScreen.hidden = false;
start();
