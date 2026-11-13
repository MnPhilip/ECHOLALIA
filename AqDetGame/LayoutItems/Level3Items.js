/* Layout for Level 3 items */
function createBarrier(canvas) {
    const barriers = [
        [ //screen 0 
            { //bottom barrier (deep water)
                x: 0,
                y: canvas.height - SEAWEED_SIZE,
                width: canvas.width,
                height: SEAWEED_SIZE,
                color: "DarkBlue"
            },
            { //top barrier (seaweed)
                x: 0,
                y: 0,
                width: canvas.width,
                height: SEAWEED_SIZE,
                color: "SeaGreen"
            },
            { //right barrier (seaweed)
                x: canvas.width - SEAWEED_SIZE,
                y: 0,
                width: SEAWEED_SIZE,
                height: canvas.height,
                color: "SeaGreen"
            },
            { // left barrier (seaweed)
                x: 0,
                y: 0,
                width: SEAWEED_SIZE,
                height: canvas.height - 400,
                color: "SeaGreen"
            },
            { // rock blocks (furthest right)
                x: canvas.width - 600,
                y: canvas.height - 950,
                width: 150,
                height: 900,
                color: "SlateGrey"
            },
            { //rock block (2nd from right)
                x: canvas.width - 1100,
                y: canvas.height - 1150,
                width: 150,
                height: 900,
                color: "SlateGrey"
            },
            { //rock block (3rd from right)
                x: canvas.width - 1800,
                y: canvas.height - 950,
                width: 350,
                height: 900,
                color: "SlateGrey"
            },
            { // rock block (top left)
                x: SEAWEED_SIZE,
                y: canvas.height - 850,
                width: 400,
                height: 100,
                color: "SlateGrey"
            },
            { //rock block (middle left)
                x: SEAWEED_SIZE,
                y: canvas.height - 500,
                width: 400,
                height: 100,
                color: "SlateGrey"
            },
            { // seaweed barrier (bottom left)
                x: SEAWEED_SIZE,
                y: canvas.height - 100,
                width: 600,
                height: 50,
                color: "SeaGreen"
            }
        ],
        [ //screen 1
            {

            }
        ],
    ];
    return barriers;
}

function createJumpPuddle(canvas) {
    // Enter here
    const jumpPuddles = [
        [],

    ];
    return jumpPuddles;
}

function createWaterCurrents(canvas) {
    const waterCurrents = [
        [ //screen 0
            {//current 1 (furthest right)
                x: canvas.width - 950,
                y: canvas.height - 1200,
                width: 350,
                height: 1150,
                color: "LightBlue",
                CURRENT_TYPE: "strong",
            },
            {
                x: canvas.width - 1450,
                y: canvas.height - 1200,
                width: 350,
                height: 1150,
                color: "LightBlue",
                CURRENT_TYPE: "strong",
            }
        ],
    ];
    return waterCurrents;
}

function createInteractables(canvas) {
    const interactableItems = [
        [ //screen 0
            {
                x: 200,
                y: 200,
                width: BUBBLE_SIZE,
                height: BUBBLE_SIZE,
                color: "PaleTurquoise",
            }
        ]
    ];
    return interactableItems;
}

const level3spawn = [
    {
        screen: 0,
        x: window.innerWidth - 250,
        y: window.innerHeight - 200,
    },
];