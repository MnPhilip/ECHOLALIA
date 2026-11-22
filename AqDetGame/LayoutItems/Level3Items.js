/* Layout for Level 3 items */
function createBarrier3(canvas) {
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
                height: canvas.height - 250,
                color: "SeaGreen"
            },
            { // deep water (player crosses over)
                x: SEAWEED_SIZE,
                y: canvas.height - 475,
                width: 625,
                height: 200,
                color: "DarkBlue"
            },
            { // rock blocks (furthest right)
                x: canvas.width - 300,
                y: canvas.height - 575,
                width: SEAWEED_SIZE * 2,
                height: canvas.height / 1.35 + 5,
                color: "SlateGrey"
            },
            { //rock block (2nd from right)
                x: canvas.width - 550,
                y: canvas.height - 682,
                width: SEAWEED_SIZE * 2,
                height: canvas.height / 1.45,
                color: "SlateGrey"
            },
            { //rock block (3rd from right)
                x: canvas.width - 800,
                y: canvas.height - 575,
                width: SEAWEED_SIZE * 2,
                height: canvas.height / 1.35 + 5,
                color: "SlateGrey"
            },
            { // rock block (top left)
                x: SEAWEED_SIZE,
                y: canvas.height - 500,
                width: SEAWEED_SIZE * 10,
                height: SEAWEED_SIZE,
                color: "SlateGrey"
            },
            { //rock block (middle left)
                x: SEAWEED_SIZE + 200,
                y: canvas.height - 275,
                width: SEAWEED_SIZE * 10.5,
                height: SEAWEED_SIZE,
                color: "SlateGrey"
            },
            { // seaweed barrier (bottom left)
                x: SEAWEED_SIZE,
                y: canvas.height - 100,
                width: 550,
                height: 50,
                color: "SeaGreen"
            }
        ],
        [ //screen 1
            { //top barrier (seaweed)
                x: 0,
                y: 0,
                width: canvas.width,
                height: SEAWEED_SIZE,
                color: "SeaGreen"
            },
            { //bottom barrier (rock)
                x: 0,
                y: canvas.height - SEAWEED_SIZE,
                width: canvas.width,
                height: SEAWEED_SIZE,
                color: "SlateGrey"
            },
            { //left barrier (seaweed)
                x: 0,
                y: 0,
                width: SEAWEED_SIZE,
                height: canvas.height - 200,
                color: "SeaGreen"
            },
            { //right barrier (seaweed)
                x: canvas.width - SEAWEED_SIZE,
                y: 0,
                width: SEAWEED_SIZE,
                height: canvas.height,
                color: "SeaGreen"
            },
            { //middle rock (for B -> C puddle)
                x: canvas.width - 1250,
                y: canvas.height - 300,
                width: 1210,
                height: SEAWEED_SIZE,
                color: "SlateGrey"

            },
            { //left rock (blocking main area from end of screen)
                x: canvas.width - 1250,
                y: canvas.height - 680,
                width: SEAWEED_SIZE,
                height: 650,
                color: "SlateGrey"

            },
            { // rock block (middle in the B -> C section)
                x: canvas.width - 700,
                y: canvas.height - 180,
                width: 50,
                height: 50,
                color: "SlateGrey"
            },
            { // rock block (bottom of A -> B section) 
                x: canvas.width - 1210,
                y: canvas.height - 480,
                width: 550,
                height: SEAWEED_SIZE,
                color: "SlateGrey"
            },
            { // rock block (right side of A -> B section) 
                x: canvas.width - 700,
                y: canvas.height - 680,
                width: SEAWEED_SIZE,
                height: 240,
                color: "SlateGrey"
            },
            { // deep water block (right barrier for A puddle) 
                x: canvas.width - 400,
                y: canvas.height - 680,
                width: SEAWEED_SIZE,
                height: 240,
                color: "DarkBlue"
            },
            { // Deep water block (bottom side of A puddle) 
                x: canvas.width - 660,
                y: canvas.height - 480,
                width: 265,
                height: SEAWEED_SIZE,
                color: "DarkBlue"
            },
            { // Deep water block (end of level push block)
                x: canvas.width - 1380,
                y: canvas.height - 430,
                width: 100,
                height: 100,
                color: "DarkBlue"
            },
            { // Deep water block (for push block in A -> B section)
                x: canvas.width - 800,
                y: canvas.height - 550,
                width: PUSH_ROCK_SIZE,
                height: PUSH_ROCK_SIZE,
                color: "DarkBlue"
            },

        ],
        [ //screen 2
            { // top barrier (seaweed)
                x: 0,
                y: 0,
                width: canvas.width,
                height: SEAWEED_SIZE,
                color: "SeaGreen"
            },
            { // bottom barrier (deep water)
                x: 0,
                y: canvas.height - SEAWEED_SIZE,
                width: canvas.width,
                height: SEAWEED_SIZE,
                color: "DarkBlue"
            },
            { // left barrier (seaweed)
                x: 0,
                y: canvas.height - 550,
                width: SEAWEED_SIZE,
                height: canvas.height,
                color: "SeaGreen"
            },
            { // right barrier (seaweed)
                x: canvas.width - SEAWEED_SIZE,
                y: 0,
                width: SEAWEED_SIZE,
                height: canvas.height,
                color: "SlateGrey"
            },
            { // rock block (left from spawn point)
                x: canvas.width - 400,
                y: canvas.height - 680,
                width: SEAWEED_SIZE * 2,
                height: 300,
                color: "SlateGrey"
            },
            { // seaweed block (top of puddle B)
                x: canvas.width - 340,
                y: canvas.height - 230,
                width: 300,
                height: SEAWEED_SIZE,
                color: "SeaGreen"
            },
            { // seaweed block (top of puddle B)
                x: canvas.width - 340,
                y: canvas.height - 230,
                width: SEAWEED_SIZE,
                height: 100,
                color: "SeaGreen"
            },
            { // rock block (top main block to exit)
                x: canvas.width - 1150,
                y: canvas.height - 680,
                width: SEAWEED_SIZE,
                height: 400,
                color: "SlateGrey"
            },
            { // rock block (destoryable block to exit) 
                x: canvas.width - 1150,
                y: canvas.height - 275,
                width: SEAWEED_SIZE,
                height: 50,
                color: "SlateGrey"
            },
            { // rock block (bottom main block to exit) 
                x: canvas.width - 1150,
                y: canvas.height - 220,
                width: SEAWEED_SIZE,
                height: 180,
                color: "SlateGrey"
            },
            { // seaweed block (to the right of rocket A)
                x: canvas.width - 850,
                y: canvas.height - 220,
                width: SEAWEED_SIZE,
                height: 180,
                color: "SeaGreen"
            },
            { // deep water block (middle of main area)
                x: canvas.width - 1110,
                y: canvas.height - 420,
                width: 710,
                height: 100,
                color: "DarkBlue"
            },
            { // rock block(bottom of rocket A)
                x: canvas.width - 1110,
                y: canvas.height - 550,
                width: 300,
                height: SEAWEED_SIZE,
                color: "SlateGrey"
            },
            { // rock block (right of rocket A)
                x: canvas.width - 810,
                y: canvas.height - 680,
                width: SEAWEED_SIZE,
                height: 170,
                color: "SlateGrey"
            },
        ]
    ];
    return barriers;
}

function createJumpPuddle3(canvas) {
    // Enter here
    const jumpPuddles = [
        [], //screen 0 (none)
        [ // screen 1
            { // puddle C2 (end of level portal)
                x: canvas.width - 1350,
                y: canvas.height - 650,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "orange",
                id: "C2", //connecting puddles together
                partnerId: "C1"
            },
            { // puddle C1 (from B -> C section)
                x: canvas.width - 1150,
                y: canvas.height - 180,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "orange",
                id: "C1", //connecting puddles together
                partnerId: "C2"
            },
            { // puddle B2 (start of B -> C section)
                x: canvas.width - 150,
                y: canvas.height - 180,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "orange",
                id: "B2", //connecting puddles together
                partnerId: "B1"
            },
            { // puddle B1 (end of A -> B section)
                x: canvas.width - 1175,
                y: canvas.height - 550,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "orange",
                id: "B1", //connecting puddles together
                partnerId: "B2"
            },
            { // puddle A2 (start of A -> B section)
                x: canvas.width - 1175,
                y: canvas.height - 675,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "orange",
                id: "A2", //connecting puddles together
                partnerId: "A1"
            },
            { // puddle A1 (deep water A puddle section)
                x: canvas.width - 575,
                y: canvas.height - 625,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "orange",
                id: "A1", //connecting puddles together
                partnerId: "A2"
            },

        ],
        [ //screen 2
            { // puddle A1 ( bottom right)
                x: canvas.width - 175,
                y: canvas.height - 175,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "orange",
                id: "A1", //connecting puddles together
                partnerId: "A2"
            },
            { // puddle A2 (middle)
                x: canvas.width - 1075,
                y: canvas.height - 490,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "orange",
                id: "A2", //connecting puddles together
                partnerId: "A1"
            },
            { // puddle B1 (above evil enemies)
                x: canvas.width - 600,
                y: canvas.height - 675,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "orange",
                id: "B1", //connecting puddles together
                partnerId: "B2"
            },
            { // puddle B2 (next to rocket B)
                x: canvas.width - 1000,
                y: canvas.height - 675,
                width: PUDDLE_SIZE,
                height: PUDDLE_SIZE,
                color: "orange",
                id: "B2", //connecting puddles together
                partnerId: "B1"
            },
        ]

    ];
    return jumpPuddles;
}

function createWaterCurrents3(canvas) {
    const waterCurrents = [
        [ //screen 0
            {//current 1 (furthest right)
                x: canvas.width - 475,
                y: canvas.height - 680,
                width: 175,
                height: canvas.height - 80,
                color: "LightBlue",
                CURRENT_TYPE: "strong",
            },
            { //current 2 (middle)
                x: canvas.width - 725,
                y: canvas.height - 680,
                width: 175,
                height: canvas.height - 80,
                color: "LightBlue",
                CURRENT_TYPE: "strong",
            }
        ],
        [
            { // current 1 (bottom middle)
                x: canvas.width - 1200,
                y: canvas.height - 250,
                width: canvas.width - 300,
                height: 200,
                color: "LightBlue",
                CURRENT_TYPE: "strong",
            }
        ],
        [] //none
    ];
    return waterCurrents;
}

function createInteractables3(canvas) {
    const interactableItems = [
        [ //screen 0
            { //bubble
                x: 150,
                y: 75,
                width: BUBBLE_SIZE,
                height: BUBBLE_SIZE,
                color: "aqua",
                type: bubble,
                activated: false
            }
        ],
        [ //screen 1
            { //bubble
                x: canvas.width - 1100,
                y: canvas.height - 400,
                width: BUBBLE_SIZE,
                height: BUBBLE_SIZE,
                color: "aqua",
                type: bubble,
                activated: false
            },
            { // push block (end of level push block)
                x: canvas.width - 1350,
                y: canvas.height - 480,
                width: PUSH_ROCK_SIZE,
                height: PUSH_ROCK_SIZE,
                color: "Silver",
                type: pushBlock,
                activated: false
            },
            { // push block (for push block in A -> B section)
                x: canvas.width - 800,
                y: canvas.height - 600,
                width: PUSH_ROCK_SIZE,
                height: PUSH_ROCK_SIZE,
                color: "Silver",
                type: pushBlock,
                activated: false
            },
        ],
        [//screen 2
            { // rocket A
                x: canvas.width - 1000,
                y: canvas.height - 125,
                width: rectSize,
                height: rectSize,
                color: "red",
                type: signalFlare,
                activated: false
            },
            { // rocket B
                x: canvas.width - 950,
                y: canvas.height - 615,
                width: rectSize,
                height: rectSize,
                color: "red",
                type: signalFlare,
                activated: false
            },
        ]
    ];
    return interactableItems;
}

function createEnemies3(canvas) {
    const enemies = [
        [ //screen 0
            { //Enemy numubers based on how the player first interacts with them
                // (ex first enemy in level the player reaches is #1)
                //enemy 1
                x: window.innerWidth - 220,
                y: window.innerHeight - 225,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 2
                x: window.innerWidth - 100,
                y: window.innerHeight - 300,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 3
                x: window.innerWidth - 100,
                y: window.innerHeight - 350,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 4
                x: window.innerWidth - 100,
                y: window.innerHeight - 400,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 5
                x: window.innerWidth - 220,
                y: window.innerHeight - 500,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 6
                x: window.innerWidth - 220,
                y: window.innerHeight - 550,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 7
                x: window.innerWidth - 400,
                y: window.innerHeight - 100,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 8
                x: window.innerWidth - 720,
                y: window.innerHeight - 250,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 9
                x: window.innerWidth - 620,
                y: window.innerHeight - 450,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 10
                x: window.innerWidth - 650,
                y: window.innerHeight - 675,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 11
                x: window.innerWidth - 1150,
                y: window.innerHeight - 425,
                width: 50,
                height: 50,
                color: "purple"
            },
        ],
        [
            { //enemy 1
                x: window.innerWidth - 1200,
                y:window.innerHeight - 605,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 2
                x: window.innerWidth - 1125,
                y:window.innerHeight - 605,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 3
                x: window.innerWidth - 1050,
                y:window.innerHeight - 605,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 4
                x: window.innerWidth - 975,
                y:window.innerHeight - 605,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 5
                x: window.innerWidth - 900,
                y:window.innerHeight - 605,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 6
                x: window.innerWidth - 400,
                y:window.innerHeight - 100,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 7
                x: window.innerWidth - 400,
                y:window.innerHeight - 150,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 8
                x: canvas.width - 700,
                y: canvas.height - 250,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 9
                x: canvas.width - 1000,
                y: canvas.height - 250,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 10
                x: canvas.width - 1000,
                y: canvas.height - 100,
                width: 50,
                height: 50,
                color: "purple"
            },
        ],
        [ //screen 2
            { // enemy 1 (next to rocket A)
                x: canvas.width - 600,
                y: canvas.height - 300,
                width: 50,
                height: 50,
                color: "purple"
            },
            { //enemy 2 (middle of main area)
                x: canvas.width - 200,
                y: canvas.height - 100,
                width: 50,
                height: 50,
                color: "purple"
            },
            { // enemy 3 (bottom left of main area)
                x: canvas.width - 750,
                y: canvas.height - 200,
                width: 50,
                height: 50,
                color: "purple"
            },
            { // enemy 4 (furthest left of enemy row)
                x: canvas.width - 750,
                y: canvas.height - 550,
                width: 50,
                height: 50,
                color: "purple"
            },
            { // enemy 5 (second furthest left of enemy row)
                x: canvas.width - 680,
                y: canvas.height - 550,
                width: 50,
                height: 50,
                color: "purple"
            },
            { // enemy 6 (middle of enemy row, meant to be killed by rocket A)
                x: canvas.width - 610,
                y: canvas.height - 550,
                width: 50,
                height: 50,
                color: "purple"
            },
            { // enemy 7 (second right of enemy row)
                x: canvas.width - 540,
                y: canvas.height - 550,
                width: 50,
                height: 50,
                color: "purple"
            },
            { // enemy 7 (furthest right of enemy row)
                x: canvas.width - 470,
                y: canvas.height - 550,
                width: 50,
                height: 50,
                color: "purple"
            },
            { // enemy 8 (in exit area)
                x: canvas.width - 1300,
                y: canvas.height - 450,
                width: 50,
                height: 50,
                color: "purple"
            },
            {
                x: canvas.width - 1350,
                y: canvas.height - 275,
                width: 50,
                height: 50,
                color: "purple"
            }
        ]
    ];
    return enemies;
}

function populateSaves3(canvas){
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

const level3spawn = [
    {
        screen: 0,
        x: window.innerWidth - 175,
        y: window.innerHeight - 125,
    },
    {
        screen: 1,
        x: window.innerWidth - 175,
        y: window.innerHeight - 450,
    },
    {
        screen: 2,
        x: window.innerWidth - 175,
        y: window.innerHeight - 600,
    }
];