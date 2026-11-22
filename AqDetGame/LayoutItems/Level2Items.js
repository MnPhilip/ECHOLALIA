/* Layout for Level 2 items */
function createBarrier2(canvas) {
    const barriers = [
        [ //screen 0 
            { //top barrier (sand)
                x: 0,
                y: 0,
                width: canvas.width,
                height: SEAWEED_SIZE,
                color: "SandyBrown"
            },
            { //bottom barrier (deep water)
                x: 0,
                y: canvas.height - SEAWEED_SIZE,
                width: canvas.width - SEAWEED_SIZE,
                height: SEAWEED_SIZE,
                color: "DarkBlue"
            },
            { //right barrier (seaweed)
                x: canvas.width - SEAWEED_SIZE,
                y: SEAWEED_SIZE,
                width: SEAWEED_SIZE,
                height: canvas.height - SEAWEED_SIZE,
                color: "SeaGreen"
            },
            { //big bottom left deep water
                x: 0,
                y:  canvas.height / 2 + PUDDLE_SIZE,
                width: BUBBLE_SIZE * 3,
                height: canvas.height - (canvas.height / 2 + PUDDLE_SIZE),
                color: "DarkBlue"
            },
            { //top left deep water
                x: BUBBLE_SIZE * 3.1,
                y:  SEAWEED_SIZE,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "DarkBlue"
            },
            { //top right deep water
                x: BUBBLE_SIZE * 3.1 * PUDDLE_SIZE * 2,
                y:  SEAWEED_SIZE,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "DarkBlue"
            },
            { //second row deep water
                x: BUBBLE_SIZE * 3.1 + PUDDLE_SIZE,
                y:  SEAWEED_SIZE + PUDDLE_SIZE,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "DarkBlue"
            },
            { //third row deep water
                x: BUBBLE_SIZE * 3.1,
                y:  canvas.height / 2,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "DarkBlue"
            },

        ],
        [ //screen 1
            { //top barrier (sand)
                x: 0,
                y: 0,
                width: canvas.width,
                height: SEAWEED_SIZE,
                color: "SandyBrown"
            },
            { //right barrier (seaweed)
                x: canvas.width - SEAWEED_SIZE,
                y: SEAWEED_SIZE,
                width: SEAWEED_SIZE,
                height: canvas.height / 2,
                color: "SeaGreen"
            },
            { // bottom right deep water
                x: canvas.width - PUDDLE_SIZE * 3,
                y: canvas.height / 2 + SEAWEED_SIZE,
                width: PUDDLE_SIZE * 3,
                height: canvas.height - (canvas.height / 2 + SEAWEED_SIZE),
                color: "DarkBlue"
            },
            { // bottom deep water
                x: PUDDLE_SIZE * 2,
                y: canvas.height - SEAWEED_SIZE,
                width: PUDDLE_SIZE * 3,
                height: SEAWEED_SIZE,
                color: "DarkBlue"
            },
            { // middle column deep water
                x: canvas.width / 2.5,
                y: SEAWEED_SIZE * 1.4 + PUDDLE_SIZE,
                width: PUDDLE_SIZE,
                height: canvas.height - (SEAWEED_SIZE * 1.4 + PUDDLE_SIZE),
                color: "DarkBlue"
            },
            { // left top row deep water
                x: 0,
                y: SEAWEED_SIZE * 1.4 + PUDDLE_SIZE,
                width: canvas.width / 2.5 - PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "DarkBlue"
            },
            { // right top row deep water
                x: canvas.width / 2.5,
                y: SEAWEED_SIZE * 1.4 + PUDDLE_SIZE,
                width: canvas.width - (canvas.width / 2.5),
                height: PUDDLE_SIZE,
                color: "DarkBlue"
            },

        ],
        [ //screen 2
            { //top barrier (sand)
                x: 0,
                y: 0,
                width: canvas.width,
                height: SEAWEED_SIZE,
                color: "SandyBrown"
            },
            {

            }
        ],
        [ //screen 3
            { //top barrier (sand)
                x: 0,
                y: 0,
                width: canvas.width,
                height: SEAWEED_SIZE,
                color: "SandyBrown"
            },
            {

            }
        ],
    ];
    return barriers;
}

function createJumpPuddle2(canvas) {
    // Enter here
    const jumpPuddles = [
        [], // screen 0

        [ // screen 1
            {
            x: canvas.width - SEAWEED_SIZE * 2 - PUDDLE_SIZE,
            y: SEAWEED_SIZE * 1.2,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            id: "A",
            partnerId: "B"
            //direction: "left"
            },
            {
            x: canvas.width - SEAWEED_SIZE * 2 - PUDDLE_SIZE,
            y: canvas.height - PUDDLE_SIZE * 2,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            id: "B",
            partnerId: "A"
            //direction: "up"
            },
            {
            x: canvas.width - SEAWEED_SIZE * 2 - PUDDLE_SIZE,
            y: canvas.height - PUDDLE_SIZE,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            id: "C",
            partnerId: "D"
            //direction: "up"
            },
            {
            x: canvas.width - SEAWEED_SIZE * 2 - PUDDLE_SIZE,
            y: canvas.height - PUDDLE_SIZE,
            width: PUDDLE_SIZE,
            height: PUDDLE_SIZE,
            id: "D",
            partnerId: "C"
            //direction: "up"
            },

        ],
        [ // screen 2

        ],
        [ // screen 3

        ]
    ];
    return jumpPuddles;
}

function createInteractables2(canvas) {
    const interactableItems = [
        [ //screen 0
            { // pushable rock
                x: BUBBLE_SIZE * 3.3 + PUDDLE_SIZE,
                y: canvas.height / 1.9,
                width: PUSH_ROCK_SIZE,
                height: PUSH_ROCK_SIZE,
                color: "Silver",
                type: pushBlock,
                activated: false
            },
            { // bubble
                x: canvas.width - BUBBLE_SIZE * 2,
                y: SEAWEED_SIZE,
                width: BUBBLE_SIZE,
                height: BUBBLE_SIZE,
                color: "aqua",
                type: bubble,
                activated: false
            }
        ],
        [ // screen 1

        ],
        [ // screen 2

        ],
        [ // screen 3

        ]
    ];
    return interactableItems;
}

function createEnemies2(canvas) {
    const enemies = [
        [ // screen 0, urchins
            { // top left urchin
                x: 0,
                y: SEAWEED_SIZE + PUDDLE_SIZE,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "Crimson",
            },
            { // top middle urchin
                x: PUDDLE_SIZE,
                y: SEAWEED_SIZE + PUDDLE_SIZE,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "Crimson",
            },
            { // top right urchin
                x: PUDDLE_SIZE * 2,
                y: SEAWEED_SIZE + PUDDLE_SIZE,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "Crimson",
            },
            { // bottom left urchin
                x: 0,
                y: canvas.height / 2,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "Crimson",
            },
            { // bottom middle urchin
                x: PUDDLE_SIZE,
                y: canvas.height / 2,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "Crimson",
            },
            { // bottom right urchin
                x: PUDDLE_SIZE * 2,
                y: canvas.height / 2,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "Crimson",
            },
        ],
        [ // screen 1

        ],
        [ // screen 2

        ],
        [ // screen 3

        ]
    ]
}

function populateSaves2(canvas){
    const lvl3Saves = [
        {
            screen: 0,
            x: canvas.innerWidth - 175,
            y: canvas.innerHeight - 125,
        },
        {
            screen: 1,
            x: canvas.innerWidth - 175,
            y: canvas.innerHeight - 450,
        },
        {
            screen: 2,
            x: canvas.innerWidth - 175,
            y: canvas.innerHeight - 600,
        },
    ]
    return lvl3Saves;
}

// populateSaves(canvas) {
// const level2spawn = [
//     {
//         screen: 0,
//         x: canvas.width - SEAWEED_SIZE * 1.5,
//         y: canvas.height / 2,
//     },
//     {
//         screen: 1,
//         x: canvas.width - SEAWEED_SIZE * 1.5,
//         y: PUDDLE_SIZE * 2 + SEAWEED_SIZE * 2,
//     },
//     {
//         screen: 2,
//         x: canvas.width - SEAWEED_SIZE * 1.5,
//         y: SEAWEED_SIZE * 2,
//     },
//     {
//         screen: 3,
//         x: canvas.width - SEAWEED_SIZE * 1.5,
//         y: SEAWEED_SIZE * 2,
//     }
// ];
// return level2spawn;
// }