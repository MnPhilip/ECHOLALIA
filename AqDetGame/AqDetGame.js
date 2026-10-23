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

var currentLevel = 0;
var currentScreen = 0;

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

const SEAWEED_SIZE = 40;
const PUDDLE_SIZE = 50;
const ROCKET_SIZE = 70;
const BUBBLE_SIZE = 80;
const PUSH_ROCK_SIZE = PUDDLE_SIZE;

// Barriers 
const barriers =  [
    [ // screen 0
        /*
        { // test barrier
            x: 400, 
            y: 0, 
            width: 20, 
            height: 600,
            color: "red"
        },
    */
        { // bottom barrier
            x: 0,
            y: canvas.height - SEAWEED_SIZE,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 
        { // top barrier
            x: 0,
            y: 0,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 
        { // right barrier
            x: canvas.width - SEAWEED_SIZE,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height,
            color: "purple"
         },

        // top blocks of seaweed barriers
        {
            x: 0,
            y: SEAWEED_SIZE,
            width: canvas.width / 2 - SEAWEED_SIZE,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 
        {
            x: 0,
            y: SEAWEED_SIZE * 2,
            width: canvas.width / 2 - SEAWEED_SIZE * 2,
            height: SEAWEED_SIZE,
            color: "yellow"
        },
        {
            x: 0,
            y: SEAWEED_SIZE * 3,
            width: canvas.width / 2 - SEAWEED_SIZE * 3,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 
        {
            x: 0,
            y: SEAWEED_SIZE * 4,
            width: canvas.width / 2 - SEAWEED_SIZE * 4,
            height: SEAWEED_SIZE,
            color: "yellow"
        },

        // bottoms blocks of seaweed barriers
        {
            x: 0,
            y: canvas.height - SEAWEED_SIZE * 2,
            width: canvas.width / 2 - SEAWEED_SIZE,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 
        {
            x: 0,
            y: canvas.height - SEAWEED_SIZE * 3,
            width: canvas.width / 2 - SEAWEED_SIZE * 2,
            height: SEAWEED_SIZE,
            color: "yellow"
        },
        {
            x: 0,
            y: canvas.height - SEAWEED_SIZE * 4,
            width: canvas.width / 2 - SEAWEED_SIZE * 3,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 
        {
            x: 0,
            y: canvas.height - SEAWEED_SIZE * 5,
            width: canvas.width / 2 - SEAWEED_SIZE * 4,
            height: SEAWEED_SIZE,
            color: "yellow"
        },

        
        // generic beach barriers (shells?)
        {
            x: canvas.width / 2 + SEAWEED_SIZE * 3,
            y: canvas.height / 2,
            width: SEAWEED_SIZE,
            height: SEAWEED_SIZE,
            color: "orange"
        }, 
        {
            x: canvas.width / 4,
            y: canvas.height / 2 + SEAWEED_SIZE,
            width: SEAWEED_SIZE,
            height: SEAWEED_SIZE,
            color: "orange"
        }, 
        {
            x: canvas.width / 4 + SEAWEED_SIZE * 4,
            y: canvas.height / 2 - SEAWEED_SIZE * 2,
            width: SEAWEED_SIZE,
            height: SEAWEED_SIZE,
            color: "orange"
        },
        
        { // deep water
            x: canvas.width / 10,
            y: canvas.height / 2 - PUDDLE_SIZE * 2.5,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE * 5,
            color: "purple"
        }
    
    ], // end of screen 0

    [ // screen 1
        { // bottom barrier
            x: 0,
            y: canvas.height - SEAWEED_SIZE,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 
        { // top barrier
            x: 0,
            y: 0,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 
        { // right barrier
            x: canvas.width - SEAWEED_SIZE,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height,
            color: "purple"
         },
         { // left barrier
            x: 0,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height / 2,
            color: "yellow"
         },

         // maze barriers
         { // vertical barrier to right of rocket
            x: ROCKET_SIZE * 2,
            y: SEAWEED_SIZE,
            width: SEAWEED_SIZE,
            height: canvas.height / 6 + rectSize / 2,
            color: "yellow"
         },
         { // top left horizontal barrier
            x: ROCKET_SIZE * 2 + SEAWEED_SIZE,
            y: canvas.height / 6 + rectSize / 2,
            width: rectSize * 3,
            height: SEAWEED_SIZE,
            color: "yellow"
         },
         { // top right horizontal barrier
            x: canvas.width / 2.5,
            y: canvas.height / 6 + rectSize / 2,
            width: canvas.width / 3,
            height: SEAWEED_SIZE,
            color: "yellow"
         },
         { // right-most vertical barrier
            x: canvas.width / 2.5 + canvas.width / 3,
            y: canvas.height / 6 + rectSize / 2,
            width: SEAWEED_SIZE,
            height: canvas.height / 2,
            color: "yellow"
         },
         { // horizontal bar under rocket
            x: 0,
            y: canvas.height / 2,
            width: rectSize * 3.5,
            height: SEAWEED_SIZE,
            color: "yellow"
         },
         { // small vertical barrier attached to horizontal bar under rocket
            x: rectSize * 3.5,
            y: canvas.height / 2,
            width: SEAWEED_SIZE,
            height: rectSize * 2 + SEAWEED_SIZE,
            color: "yellow"
         },
         { // middle vertical barrier 
            x: ROCKET_SIZE * 2 + SEAWEED_SIZE + rectSize * 3,
            y: canvas.height / 6 + rectSize / 2,
            width: SEAWEED_SIZE,
            height: canvas.height / 3 - SEAWEED_SIZE,
            color: "yellow"
         },
         { // bottom horizontal maze barrier
            x: rectSize * 2 + SEAWEED_SIZE,
            y: canvas.height - SEAWEED_SIZE * 2 - rectSize * 2,
            width: canvas.width / 1.3,
            height: SEAWEED_SIZE,
            color: "yellow"
         },
         { // most middle horizontal maze barrier
            x: ROCKET_SIZE * 2 + SEAWEED_SIZE + rectSize * 3,
            y: canvas.height / 2 - SEAWEED_SIZE,
            width: canvas.width / 4,
            height: SEAWEED_SIZE,
            color: "yellow"
         },

         // rock barrier (rocket erases it)
         { // bottom part of rock
            x: 0,
            y: canvas.height - SEAWEED_SIZE * 2,
            width: rectSize * 2,
            height: SEAWEED_SIZE,
            color: "orange"
         },
         { // top part of rock
            x: 0,
            y: canvas.height - SEAWEED_SIZE * 2 - rectSize * 2,
            width: rectSize * 2,
            height: SEAWEED_SIZE,
            color: "orange"
         },
         
         { // vertical edge of rock
            x: rectSize * 2,
            y: canvas.height - SEAWEED_SIZE * 2 - rectSize * 2,
            width: SEAWEED_SIZE,
            height: rectSize * 2 + SEAWEED_SIZE,
            color: "orange"
         }
        
    ], // end of screen 1
    [ // screen 2
        { // bottom barrier
            x: 0,
            y: canvas.height - SEAWEED_SIZE,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 
        { // top barrier
            x: 0,
            y: 0,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 
        { // right barrier
            x: canvas.width - SEAWEED_SIZE,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height,
            color: "purple"
         },
         { // left barrier
            x: 0,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height / 2,
            color: "yellow"
         },

         // maze components
         { // right vertical barrier
            x: canvas.width - 4 * rectSize,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height / 1.5,
            color: "yellow"
        }, 
        { // middle right vertical barrier
            x: canvas.width / 1.5,
            y: canvas.height / 2.5,
            width: SEAWEED_SIZE,
            height: canvas.height - canvas.height / 2.5,
            color: "yellow"
        }, 
        { // middle left vertical barrier
            x: canvas.width / 2.5,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height / 1.5,
            color: "yellow"
        }, 
        { // left vertical barrier
            x: canvas.width / 5,
            y: canvas.height / 2.5,
            width: SEAWEED_SIZE,
            height: canvas.height - canvas.height / 2.5,
            color: "yellow"
        }, 
        { // right-most horizontal barrier
            x: canvas.width / 1.8,
            y: canvas.height / 2.5,
            width: canvas.width / 8,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 

        
        // deep water barriers
        { // left-most water
            x: SEAWEED_SIZE,
            y: canvas.height / 2.5,
            width: PUDDLE_SIZE * 4.4,
            height: PUDDLE_SIZE,
            color: "purple"
        }, 
        { // middle water
            x: canvas.width / 5 + SEAWEED_SIZE + 1,
            y: canvas.height / 2.5,
            width: PUDDLE_SIZE * 4.4,
            height: PUDDLE_SIZE,
            color: "purple"
        }, 
        { // right-most water
            x: canvas.width / 1.7,
            y: SEAWEED_SIZE,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE * 4.4 - 1,
            color: "purple"
        }

    ], // end of screen 2
    [ // screen 3
        { // bottom barrier
            x: 0,
            y: canvas.height - SEAWEED_SIZE,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 
        { // top barrier
            x: 0,
            y: 0,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "yellow"
        }, 
        { // right barrier
            x: canvas.width - SEAWEED_SIZE,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height,
            color: "purple"
         },
         { // left barrier
            x: 0,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height / 2,
            color: "yellow"
         },

         // deep waters
         { // left deep water
            x: canvas.width / 6,
            y: SEAWEED_SIZE,
            width: PUDDLE_SIZE,
            height: canvas.height - SEAWEED_SIZE * 2,
            color: "purple"
         },
         { // middle deep water
            x: canvas.width / 2.5,
            y: SEAWEED_SIZE,
            width: PUDDLE_SIZE,
            height: canvas.height - SEAWEED_SIZE * 2,
            color: "purple"
         },
         { // right deep water
            x: canvas.width - canvas.width / 3.5,
            y: SEAWEED_SIZE,
            width: PUDDLE_SIZE,
            height: canvas.height - SEAWEED_SIZE * 2,
            color: "purple"
         },
         // rock to explode
         { // upper rock
            x: canvas.width / 2.5 + SEAWEED_SIZE,
            y: PUSH_ROCK_SIZE * 2,
            width: PUSH_ROCK_SIZE * 2,
            height: PUSH_ROCK_SIZE / 2,
            color: "purple"
         },
         { // vertical rock
            x: canvas.width / 2.5 + SEAWEED_SIZE + PUSH_ROCK_SIZE * 2,
            y: PUSH_ROCK_SIZE * 2,
            width: PUSH_ROCK_SIZE / 2,
            height: PUSH_ROCK_SIZE * 2.5,
            color: "purple"
         },
         { // lower rock
            x: canvas.width / 2.5 + SEAWEED_SIZE,
            y: PUSH_ROCK_SIZE * 4,
            width: PUSH_ROCK_SIZE * 2,
            height: PUSH_ROCK_SIZE / 2,
            color: "purple"
         },
    ] // end of screen 3
];

function drawBarriers() {
    for (const b of barriers[currentScreen]) {
        playerPH.fillStyle = b.color;
        playerPH.fillRect(b.x,b.y,b.width,b.height);
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

const jumpPuddles = [
    [], // screen 0, no jump puddles
    [ // screen 1
        { // left puddle, swaps with [1][1]
            x: rectSize * 4 + canvas.width / 2,
            y: canvas.height / 2 + rectSize,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            color: "orange"
        },
        { // right puddle, swaps with [1][0]
            x: canvas.width / 1.2 - SEAWEED_SIZE * 2 + 5,
            y: canvas.height - rectSize * 4 - SEAWEED_SIZE / 2 - 5,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            color: "orange"
        }
    ], 
    [ // screen 2
        { // top right puddle, swaps with [2][1]
            x: canvas.width - rectSize * 2 - SEAWEED_SIZE,
            y: rectSize,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            color: "orange"
        },
        { // bottom right puddle, swaps with [2][0]
            x: canvas.width - rectSize * 6,
            y: canvas.height - rectSize * 2,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            color: "orange"
        }
    ],
    [ // screen 3
        { // right puddle, swaps with [3][1]
            x: canvas.width - rectSize * 2,
            y: canvas.height - rectSize * 2,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            color: "orange"
        },
        { // left puddle, swaps with [3][0]
            x: canvas.width / 2,
            y: canvas.height - rectSize * 2,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            color: "orange"
        }
    ]
]

function drawJumpPuddles() {
    for (const d of jumpPuddles[currentScreen]) {
        playerPH.fillStyle = d.color;
        playerPH.fillRect(d.x,d.y,d.width,d.height);
    }
}

const interactableItems = [
    [ // screen 0
        { // bubble
            x: canvas.width / 6,
            y: canvas.height / 2 - PUDDLE_SIZE * 2,
            width: BUBBLE_SIZE,
            height: BUBBLE_SIZE,
            color: "red"
        }
    ], 
    [ // screen 1
        { // rocket
            x: rectSize,
            y: rectSize,
            width: ROCKET_SIZE,
            height: ROCKET_SIZE,
            color: "red"
        }
    ], 
    [ // screen 2
        { // right pushable rock
            x: canvas.width / 1.5,
            y: rectSize * 2,
            width: PUSH_ROCK_SIZE,
            height: PUSH_ROCK_SIZE,
            color: "red"
        },
        { // middle pushable rock
            x: canvas.width / 5 + PUSH_ROCK_SIZE * 3,
            y: canvas.height / 2,
            width: PUSH_ROCK_SIZE,
            height: PUSH_ROCK_SIZE,
            color: "red"
        },
        { // left pushable rock
            x: canvas.width / 6 - PUSH_ROCK_SIZE,
            y: canvas.height / 3 - PUSH_ROCK_SIZE,
            width: PUSH_ROCK_SIZE,
            height: PUSH_ROCK_SIZE,
            color: "red"
        }
    ], 
    [ // screen 3
        { // pushable rock
            x: canvas.width / 2.2,
            y: PUSH_ROCK_SIZE * 2.8,
            width: PUSH_ROCK_SIZE,
            height: PUSH_ROCK_SIZE,
            color: "red"
        },
        { // left bubble
            x: canvas.width / 4.5,
            y: canvas.height / 2,
            width: BUBBLE_SIZE,
            height: BUBBLE_SIZE,
            color: "red"
        },
        { // right bubble
            x: canvas.width - canvas.width / 4.5,
            y: canvas.height / 1.5,
            width: BUBBLE_SIZE,
            height: BUBBLE_SIZE,
            color: "red"
        },
        { // rocket
            x: canvas.width - canvas.width / 5,
            y: rectSize,
            width: ROCKET_SIZE,
            height: ROCKET_SIZE,
            color: "red"
        }
    ]
]

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

function spawn(){
    rectX = canvas.width - 40 - rectSize;
    rectY = canvas.height/2;

    playerPH.clearRect(0, 0, canvas.width, canvas.height);

    drawBarriers();
    drawInteractables();
    drawJumpPuddles();

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
    
    if (collidesWithBarrier(rectX + movePosX, rectY + movePosY)) {
        return;
    }

    if (reachScreenEnd(rectX + movePosX)) {
        playerPH.clearRect(0, 0, canvas.width, canvas.height);
        if (currentScreen == 3) { 
            // goes to the next level if player reached end of first level
            currentLevel++;
            currentScreen = 0;
        } else {
            // goes to next screen
            currentScreen++;
            spawn();
            //alert(`POS is: ${rectX}, ${rectY}`);
        }
    }
    
    playerPH.clearRect(rectX, rectY, rectSize, rectSize);
    rectX += movePosX;
    rectY += movePosY;

     drawBarriers();
     drawInteractables();
     drawJumpPuddles();

    playerPH.fillStyle = "green";
    playerPH.fillRect(rectX, rectY, rectSize, rectSize);
}

function pcInteract()
{   
        // alert(rectX);
        // alert(rectY);
        alert("Interact Key Pressed!");
}

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
