/*
const barriersSub =  [
    
    { // test barrier
        x: 400, 
        y: 0, 
        width: 20, 
        height: 600,
        color: "red"
    },
    
    { // bottom barrier
        x: 0,
        y: canvas.height - 20,
        width: canvas.width,
        height: 20,
        color: "orange"
    }, 
    { // top barrier
        x: 0,
        y: 0,
        width: canvas.width,
        height: 20,
        color: "yellow"
    }, 
    { // right barrier
        x: canvas.width - 20,
        y: 0,
        width: 20,
        height: canvas.height,
        color: "purple"
    },

];

*/
function createBarrier(canvas){
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
         /*
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
        */
        
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
         /*
         { // left barrier
            x: 0,
            y: 0,
            width: SEAWEED_SIZE,
            height: canvas.height / 2,
            color: "yellow"
         },
         */
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
        /*
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
        */

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
];
return interactableItems;
}



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