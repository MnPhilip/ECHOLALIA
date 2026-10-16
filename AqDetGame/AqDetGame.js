//alert("Test of JS file worksssss");





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
        ctx.textBaseline = "middle";
        ctx.fillText("PRESS ENTER TO START", canvas.width/2, canvas.height/2);
    } else{
        spawn();
    }
    requestAnimationFrame(start);
}


window.addEventListener("keydown", (e) =>{
    if(e.key === "Enter"){
        gameStart = true; 
        spawn();
    }
});

start();