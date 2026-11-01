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
const NO_MOVEMENT = 0;
const STANDARD_MOVEMENT = 15; 

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
const SEAWEED_SIZE = 40;
const PUDDLE_SIZE = 50;
const ROCKET_SIZE = 70;
const BUBBLE_SIZE = 80;
const PUSH_ROCK_SIZE = PUDDLE_SIZE;

// Barriers 
const barriers =  [
    [ // screen 0
        { // bottom barrier
            x: 0,
            y: canvas.height - SEAWEED_SIZE,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "Aqua"
        }, 
        { // top barrier
            x: 0,
            y: 0,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "Green"
        }, 
        { // right barrier
            x: canvas.width - SEAWEED_SIZE,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height,
            color: "Aqua"
         },

        // top blocks of seaweed barriers
        {
            x: 0,
            y: SEAWEED_SIZE,
            width: canvas.width / 2 - SEAWEED_SIZE,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
        }, 
        {
            x: 0,
            y: SEAWEED_SIZE * 2,
            width: canvas.width / 2 - SEAWEED_SIZE * 2,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
        },
        {
            x: 0,
            y: SEAWEED_SIZE * 3,
            width: canvas.width / 2 - SEAWEED_SIZE * 3,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
        }, 
        {
            x: 0,
            y: SEAWEED_SIZE * 4,
            width: canvas.width / 2 - SEAWEED_SIZE * 4,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
        },

        // bottoms blocks of seaweed barriers
        {
            x: 0,
            y: canvas.height - SEAWEED_SIZE * 2,
            width: canvas.width / 2 - SEAWEED_SIZE,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
        }, 
        {
            x: 0,
            y: canvas.height - SEAWEED_SIZE * 3,
            width: canvas.width / 2 - SEAWEED_SIZE * 2,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
        },
        {
            x: 0,
            y: canvas.height - SEAWEED_SIZE * 4,
            width: canvas.width / 2 - SEAWEED_SIZE * 3,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
        }, 
        {
            x: 0,
            y: canvas.height - SEAWEED_SIZE * 5,
            width: canvas.width / 2 - SEAWEED_SIZE * 4,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
        },

        
        // generic beach barriers (shells?)
        {
            x: canvas.width / 2 + SEAWEED_SIZE * 3,
            y: canvas.height / 2,
            width: SEAWEED_SIZE,
            height: SEAWEED_SIZE,
            color: "LightCoral"
        }, 
        {
            x: canvas.width / 4,
            y: canvas.height / 2 + SEAWEED_SIZE,
            width: SEAWEED_SIZE,
            height: SEAWEED_SIZE,
            color: "LightCoral"
        }, 
        {
            x: canvas.width / 4 + SEAWEED_SIZE * 4,
            y: canvas.height / 2 - SEAWEED_SIZE * 2,
            width: SEAWEED_SIZE,
            height: SEAWEED_SIZE,
            color: "LightCoral"
        },
        /*
        { // deep water
            x: canvas.width / 10,
            y: canvas.height / 2 - PUDDLE_SIZE * 2.5,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE * 5,
            color: "DarkBlue"
        }
            */
    
    ], // end of screen 0

    [ // screen 1
        { // bottom barrier
            x: 0,
            y: canvas.height - SEAWEED_SIZE,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "Aqua"
        }, 
        { // top barrier
            x: 0,
            y: 0,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "Green"
        }, 
        { // right barrier
            x: canvas.width - SEAWEED_SIZE,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height,
            color: "DarkBlue"
         },
         { // left barrier
            x: 0,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height / 2,
            color: "DarkBlue"
         },

         // maze barriers
         { // vertical barrier to right of rocket
            x: ROCKET_SIZE * 2,
            y: SEAWEED_SIZE,
            width: SEAWEED_SIZE,
            height: canvas.height / 6 + rectSize / 2,
            color: "SeaGreen"
         },
         { // top left horizontal barrier
            x: ROCKET_SIZE * 2 + SEAWEED_SIZE,
            y: canvas.height / 6 + rectSize / 2,
            width: rectSize * 3,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
         },
         { // top right horizontal barrier
            x: canvas.width / 2.5,
            y: canvas.height / 6 + rectSize / 2,
            width: canvas.width / 3,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
         },
         { // right-most vertical barrier
            x: canvas.width / 2.5 + canvas.width / 3,
            y: canvas.height / 6 + rectSize / 2,
            width: SEAWEED_SIZE,
            height: canvas.height / 2,
            color: "SeaGreen"
         },
         { // horizontal bar under rocket
            x: 0,
            y: canvas.height / 2,
            width: rectSize * 3.5,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
         },
         { // small vertical barrier attached to horizontal bar under rocket
            x: rectSize * 3.5,
            y: canvas.height / 2,
            width: SEAWEED_SIZE,
            height: rectSize * 2 + SEAWEED_SIZE,
            color: "SeaGreen"
         },
         { // middle vertical barrier 
            x: ROCKET_SIZE * 2 + SEAWEED_SIZE + rectSize * 3,
            y: canvas.height / 6 + rectSize / 2,
            width: SEAWEED_SIZE,
            height: canvas.height / 3 - SEAWEED_SIZE,
            color: "SeaGreen"
         },
         { // bottom horizontal maze barrier
            x: rectSize * 2 + SEAWEED_SIZE,
            y: canvas.height - SEAWEED_SIZE * 2 - rectSize * 2,
            width: canvas.width / 1.3,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
         },
         { // most middle horizontal maze barrier
            x: ROCKET_SIZE * 2 + SEAWEED_SIZE + rectSize * 3,
            y: canvas.height / 2 - SEAWEED_SIZE,
            width: canvas.width / 4,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
         },

         // rock barrier (rocket erases it)
         { // bottom part of rock
            x: 0,
            y: canvas.height - SEAWEED_SIZE * 2,
            width: rectSize * 2,
            height: SEAWEED_SIZE,
            color: "SandyBrown"
         },
         { // top part of rock
            x: 0,
            y: canvas.height - SEAWEED_SIZE * 2 - rectSize * 2,
            width: rectSize * 2,
            height: SEAWEED_SIZE,
            color: "SandyBrown"
         },
         /*
         { // vertical edge of rock
            x: rectSize * 2,
            y: canvas.height - SEAWEED_SIZE * 2 - rectSize * 2,
            width: SEAWEED_SIZE,
            height: rectSize * 2 + SEAWEED_SIZE,
            color: "SandyBrown"
         }
            */
        
    ], // end of screen 1
    [ // screen 2
        { // bottom barrier
            x: 0,
            y: canvas.height - SEAWEED_SIZE,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "Aqua"
        }, 
        { // top barrier
            x: 0,
            y: 0,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "Green"
        }, 
        { // right barrier
            x: canvas.width - SEAWEED_SIZE,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height,
            color: "DarkBlue"
         },
         { // left barrier
            x: 0,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height / 2,
            color: "DarkBlue"
         },

         // maze components
         { // right vertical barrier
            x: canvas.width - 4 * rectSize,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height / 1.5,
            color: "SeaGreen"
        }, 
        { // middle right vertical barrier
            x: canvas.width / 1.5,
            y: canvas.height / 2.5,
            width: SEAWEED_SIZE,
            height: canvas.height - canvas.height / 2.5,
            color: "SeaGreen"
        }, 
        { // middle left vertical barrier
            x: canvas.width / 2.5,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height / 1.5,
            color: "SeaGreen"
        }, 
        { // left vertical barrier
            x: canvas.width / 5,
            y: canvas.height / 2.5,
            width: SEAWEED_SIZE,
            height: canvas.height - canvas.height / 2.5,
            color: "SeaGreen"
        }, 
        { // right-most horizontal barrier
            x: canvas.width / 1.8,
            y: canvas.height / 2.5,
            width: canvas.width / 8,
            height: SEAWEED_SIZE,
            color: "SeaGreen"
        }, 

        /*
        // deep water barriers
        { // left-most water
            x: SEAWEED_SIZE,
            y: canvas.height / 2.5,
            width: PUDDLE_SIZE * 4.4,
            height: PUDDLE_SIZE,
            color: "DarkBlue"
        }, 
        { // middle water
            x: canvas.width / 5 + SEAWEED_SIZE + 1,
            y: canvas.height / 2.5,
            width: PUDDLE_SIZE * 4.4,
            height: PUDDLE_SIZE,
            color: "DarkBlue"
        }, 
        { // right-most water
            x: canvas.width / 1.7,
            y: SEAWEED_SIZE,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE * 4.4 - 1,
            color: "DarkBlue"
        }
            */

    ], // end of screen 2
    [ // screen 3
        { // bottom barrier
            x: 0,
            y: canvas.height - SEAWEED_SIZE,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "Aqua"
        }, 
        { // top barrier
            x: 0,
            y: 0,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "Green"
        }, 
        { // right barrier
            x: canvas.width - SEAWEED_SIZE,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height,
            color: "DarkBlue"
         },
         { // left barrier
            x: 0,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height / 2,
            color: "DarkBlue"
         },
        
         // deep waters
         { // left deep water
            x: canvas.width / 6,
            y: SEAWEED_SIZE,
            width: PUDDLE_SIZE,
            height: canvas.height - SEAWEED_SIZE * 2,
            color: "DarkBlue"
         },
         { // middle deep water
            x: canvas.width / 2.5,
            y: SEAWEED_SIZE,
            width: PUDDLE_SIZE,
            height: canvas.height - SEAWEED_SIZE * 2,
            color: "DarkBlue"
         },
         { // right deep water
            x: canvas.width - canvas.width / 3.5,
            y: SEAWEED_SIZE,
            width: PUDDLE_SIZE,
            height: canvas.height - SEAWEED_SIZE * 2,
            color: "DarkBlue"
         },
         
         // rock to explode
         { // upper rock
            x: canvas.width / 2.28,
            y: PUSH_ROCK_SIZE * 2,
            width: PUSH_ROCK_SIZE * 2,
            height: PUSH_ROCK_SIZE / 2,
            color: "SandyBrown"
         },
         { // vertical rock
            x: canvas.width / 2.28 + PUSH_ROCK_SIZE * 2,
            y: PUSH_ROCK_SIZE * 2,
            width: PUSH_ROCK_SIZE / 2,
            height: PUSH_ROCK_SIZE * 2.5,
            color: "SandyBrown"
         },
         { // lower rock
            x: canvas.width / 2.28,
            y: PUSH_ROCK_SIZE * 4,
            width: PUSH_ROCK_SIZE * 2,
            height: PUSH_ROCK_SIZE / 2,
            color: "SandyBrown"
         },
    ] // end of screen 3
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
    ],
    [ // screen 3
        { // right puddle, swaps with [3][1]
            x: canvas.width - rectSize * 2,
            y: canvas.height - rectSize * 2,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            color: "MediumPurple"
        },
        { // left puddle, swaps with [3][0]
            x: canvas.width / 2,
            y: canvas.height - rectSize * 2,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            color: "MediumPurple"
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
            color: "PaleTurquoise"
        }
    ], 
    [ // screen 1
        { // rocket
            x: rectSize,
            y: rectSize,
            width: ROCKET_SIZE,
            height: ROCKET_SIZE,
            color: "Red"
        }
    ], 
    [ // screen 2
        { // right pushable rock
            x: canvas.width / 1.5,
            y: rectSize * 2,
            width: PUSH_ROCK_SIZE,
            height: PUSH_ROCK_SIZE,
            color: "Silver"
        },
        { // middle pushable rock
            x: canvas.width / 5 + PUSH_ROCK_SIZE * 3,
            y: canvas.height / 2,
            width: PUSH_ROCK_SIZE,
            height: PUSH_ROCK_SIZE,
            color: "Silver"
        },
        { // left pushable rock
            x: canvas.width / 6 - PUSH_ROCK_SIZE,
            y: canvas.height / 3 - PUSH_ROCK_SIZE,
            width: PUSH_ROCK_SIZE,
            height: PUSH_ROCK_SIZE,
            color: "Silver"
        }
    ], 
    [ // screen 3
        { // pushable rock
            x: canvas.width / 2.2,
            y: PUSH_ROCK_SIZE * 2.8,
            width: PUSH_ROCK_SIZE,
            height: PUSH_ROCK_SIZE,
            color: "Silver"
        },
        { // left bubble
            x: canvas.width / 4.5,
            y: canvas.height / 2,
            width: BUBBLE_SIZE,
            height: BUBBLE_SIZE,
            color: "PaleTurquoise"
        },
        { // right bubble
            x: canvas.width - canvas.width / 4.5,
            y: canvas.height / 1.5,
            width: BUBBLE_SIZE,
            height: BUBBLE_SIZE,
            color: "PaleTurquoise"
        },
        { // rocket
            x: canvas.width - canvas.width / 5,
            y: rectSize,
            width: ROCKET_SIZE,
            height: ROCKET_SIZE,
            color: "Red"
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
    if (interactActive){
      interactActive = !interactActive;
      interactableLoc[currObj].activated = false;
      if (interactableLoc[currObj].type == bubble){
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
  playerPH.clearRect(rectX, rectY, canvas.width, canvas.height); //Shorthand to clear old character instance, SHOULD BE CALLED BEFORE RECTX OR RECTY ARE MODIFIED
}


function reRender(movePosX, movePosY){
    var count = 0;
    
    if (collidesWithBarrier(rectX + movePosX, rectY + movePosX) || collidesWithObject(rectX+movePosX, rectY+movePosY)) {
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


     drawBarriers();
     drawInteractables();
     drawJumpPuddles();

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
