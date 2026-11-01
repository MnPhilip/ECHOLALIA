const barriersSub =  [
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
