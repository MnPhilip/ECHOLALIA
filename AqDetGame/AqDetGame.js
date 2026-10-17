//alert("Test of JS file worksssss");
document.addEventListener('DOMContentLoaded', () => {
    alert("DEBUG SPACE LOADED");
    start();
})




const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); 

const rectSize = 60;
var rectX;
var rectY;

const moveDistance = 5; 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let gameStart = false;

function spawn(){
    rectX = 23;
    rectY = canvas.height/2;

    ctx.fillStyle = "green";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(rectX, rectY, rectSize, rectSize);


}

function start(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(!gameStart){
        ctx.fillStyle = "Black";
        ctx.font = "80px Arial";
        ctx. textAlign = "center";
        ctx.textBaseline = "middle"; //These elements will be replaced with function calls for printing the PC assets to the screen
        ctx.fillText("PRESS ENTER TO START", canvas.width/2, canvas.height/2);// DEBUG STATEMENT TESTING RESPONSIVENESS
    } else{
        spawn();
    }
    //requestAnimationFrame(start);
}

function reRender(movePosX, movePosY){
    ctx.clearRect(rectX, rectY, rectSize, rectSize);
    rectX += movePosX;
    rectY += movePosY;
    ctx.fillStyle = "green";
    ctx.fillRect(rectX, rectY, rectSize, rectSize);
}

function move(moveKey){
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
    if(e.key === "Enter"){
        gameStart = true; 
        spawn();
    } else if(e.key == "w" || e.key == "a" || e.key == "s" || 
    	e.key == "d" || e.key == " " || e.key == "e" ){
            
        move(e);
    }
});
