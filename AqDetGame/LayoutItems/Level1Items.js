
function createBarrier(canvas){
const barriers =  [
    [ // screen 0
        { // bottom barrier
            x: 0,
            y: canvas.height - SEAWEED_SIZE,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "aqua"
        }, 
        { // top barrier
            x: 0,
            y: 0,
            width: canvas.width,
            height: SEAWEED_SIZE,
            color: "green"
        }, 
        { // right barrier
            x: canvas.width - SEAWEED_SIZE,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height,
            color: "aqua"
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
        
        { // deep water
           // x: canvas.width / 10,
           // y: canvas.height / 2 - PUDDLE_SIZE * 2.5,
           // width: PUDDLE_SIZE,
           // height: PUDDLE_SIZE * 5,
           // color: "purple"
        }
    
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
         /*
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
            color: "aqua"
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
         /*
         { // left barrier
            x: 0,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height / 2,
            color: "DarkBlue"
         },
         */
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

        
        // deep water barriers
        /*
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
            x: canvas.width / 2.5 + SEAWEED_SIZE,
            y: PUSH_ROCK_SIZE * 2,
            width: PUSH_ROCK_SIZE * 2,
            height: PUSH_ROCK_SIZE / 2,
            color: "SandyBrown"
         },
         { // vertical rock
            x: canvas.width / 2.5 + SEAWEED_SIZE + PUSH_ROCK_SIZE * 2,
            y: PUSH_ROCK_SIZE * 2,
            width: PUSH_ROCK_SIZE / 2,
            height: PUSH_ROCK_SIZE * 2.5,
            color: "SandyBrown"
         },
         { // lower rock
            x: canvas.width / 2.5 + SEAWEED_SIZE,
            y: PUSH_ROCK_SIZE * 4,
            width: PUSH_ROCK_SIZE * 2,
            height: PUSH_ROCK_SIZE / 2,
            color: "SandyBrown"
         },
    ] // end of screen 3
];
return barriers;
}


function createJumpPuddle (canvas){
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
];
 return jumpPuddles;
}


function createInteractables(canvas){
const interactableItems = [
    [ // screen 0
        { // bubble
            x: canvas.width / 6,
            y: canvas.height / 2 - PUDDLE_SIZE * 2,
            width: BUBBLE_SIZE,
            height: BUBBLE_SIZE,
            color: "PaleTurqoise",
            type: bubble,
            activated: false
        }
    ], 
    [ // screen 1
        { // rocket
            x: rectSize,
            y: rectSize,
            width: ROCKET_SIZE,
            height: ROCKET_SIZE,
            color: "Red",
            type: signalFlare,
            activated: false
        }
    ], 
    [ // screen 2
        { // right pushable rock
            x: canvas.width / 1.5,
            y: rectSize * 2,
            width: PUSH_ROCK_SIZE,
            height: PUSH_ROCK_SIZE,
            color: "Silver",
            type: pushBlock,
            activated: false
        },
        { // middle pushable rock
            x: canvas.width / 5 + PUSH_ROCK_SIZE * 3,
            y: canvas.height / 2,
            width: PUSH_ROCK_SIZE,
            height: PUSH_ROCK_SIZE,
            color: "Silver",
            type: pushBlock,
            activated: false
        },
        { // left pushable rock
            x: canvas.width / 6 - PUSH_ROCK_SIZE,
            y: canvas.height / 3 - PUSH_ROCK_SIZE,
            width: PUSH_ROCK_SIZE,
            height: PUSH_ROCK_SIZE,
            color: "Silver",
            type: pushBlock,
            activated: false
        }
    ], 
    [ // screen 3
        { // pushable rock
            x: canvas.width / 2.2,
            y: PUSH_ROCK_SIZE * 2.8,
            width: PUSH_ROCK_SIZE,
            height: PUSH_ROCK_SIZE,
            color: "Silver",
            type: pushBlock,
            activated: false
        },
        { // left bubble
            x: canvas.width / 4.5,
            y: canvas.height / 2,
            width: BUBBLE_SIZE,
            height: BUBBLE_SIZE,
            color: "PaleTurqoise",
            type: bubble,
            activated: false
        },
        { // right bubble
            x: canvas.width - canvas.width / 4.5,
            y: canvas.height / 1.5,
            width: BUBBLE_SIZE,
            height: BUBBLE_SIZE,
            color: "PaleTurqoise",
            type: bubble,
            activated: false
        },
        { // rocket
            x: canvas.width - canvas.width / 5,
            y: rectSize,
            width: ROCKET_SIZE,
            height: ROCKET_SIZE,
            color: "Red",
            type: signalFlare,
            activated: false
        }
    ]
];
return interactableItems;
}

function populateSpawnCoords(canvas){
    const level1spawn = [
            // Level 0
        
                {
                    screen: 0,
                    x: window.innerWidth - 100,
                    y: window.innerHeight / 2
                },
                {
                    screen: 1,
                    x: window.innerWidth - 100,
                    y: window.innerHeight / 2
                
                },
                {
                    screen: 2,
                    x: window.innerWidth - 100,
                    y: window.innerHeight / 2
                },
                {
                    screen: 3,
                x: window.innerWidth - 100,
                    y: window.innerHeight / 2
                }
            
        
    ];
    return level1spawn;
}


