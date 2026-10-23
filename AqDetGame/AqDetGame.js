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
const levelSelectScreen = document.querySelector(".level-select");
const gameScreen = document.getElementById("gameScreen");
const completionMenu = document.getElementById("completionMenu");
const completionWaiting = document.getElementById("completionWaiting");
const currentLevelTitle = document.getElementById("currentLevelTitle");
const offerSurrenderButton = document.getElementById("offerSurrender");

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
let currentLevel = 1;
const SURRENDER_OFFERED = "surrender-offered";

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
    detail: { option: flag, flag }
  }));
}

function onAlternatePlayerResponse() {
  if (chosenOption === null) return;
  const responseOption = chosenOption;
  chosenOption = null;
  completionMenu.hidden = true;
  completionMenu.classList.remove("is-waiting");
  completionWaiting.hidden = true;

  if (responseOption === "continue") loadNextLevel();
  else loadLevelSelect();
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
  updateLevelSelectButtons();
}

function onLevelSelected(level) {
  if (!isUnlocked(level)) return; // blocked: do nothing
  loadLevel(level);
}

function updateLevelSelectButtons() {
  document.querySelectorAll(".level[data-level]").forEach((button) => {
    const unlocked = isUnlocked(Number(button.dataset.level));
    button.classList.toggle("is-locked", !unlocked);
    button.setAttribute("aria-disabled", String(!unlocked));
    if (!unlocked) button.setAttribute("aria-label", `Level ${button.dataset.level} locked`);
    else button.setAttribute("aria-label", `Level ${button.dataset.level}`);
  });
}

function loadLevel(level) {
  currentLevel = level;
  levelSelectScreen.hidden = true;
  gameScreen.hidden = false;
  currentLevelTitle.textContent = `Level ${level}`;
  gameStart = true;
  spawn();
}

function loadNextLevel() {
  if (currentLevel < TOTAL_LEVELS) {
    loadLevel(currentLevel + 1);
  } else {
    loadLevelSelect();
  }
}

function loadLevelSelect() {
  gameScreen.hidden = true;
  levelSelectScreen.hidden = false;
  gameStart = false;
  playerPH.clearRect(0, 0, canvas.width, canvas.height);
}

document.querySelectorAll(".level[data-level]").forEach((button) => {
  button.addEventListener("click", () => onLevelSelected(Number(button.dataset.level)));
});

completionMenu.querySelectorAll("[data-completion-option]").forEach((button) => {
  button.addEventListener("click", () => onOptionPressed(button.dataset.completionOption));
});

window.addEventListener("echolalia:alternate-player-response", onAlternatePlayerResponse);
window.levelCompleted = levelCompleted;
window.onAlternatePlayerResponse = onAlternatePlayerResponse;

function onOfferSurrender() {
  alertPartnerPlayer(SURRENDER_OFFERED);
}

offerSurrenderButton.addEventListener("click", onOfferSurrender);
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
