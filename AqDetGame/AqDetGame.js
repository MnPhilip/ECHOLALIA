//alert("Test of JS file worksssss");
document.addEventListener('DOMContentLoaded', () => {
    alert("DEBUG SPACE LOADED");
    start();
})




const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let gameStart = false;

function spawn(){
    const size =  60;

    const x = 23;
    const y = canvas.height/2;

    ctx.fillStyle = "green";
    ctx.fillRect(x, y, size, size);


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
    requestAnimationFrame(start);
}


window.addEventListener("keydown", (e) =>{
    if(e.key === "Enter"){
        gameStart = true; 
        spawn();
    } //Can incorporate a few more of these to account for WASD keys, E, and SPACE
});
