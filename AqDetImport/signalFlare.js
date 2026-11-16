const flareSent = new CustomEvent("flareSent");


function initFlares(){
    Event.initEvent("flareLanded", true, true);
}

function sfSend(obj){
    signalFlareIndex = obj;
    alert(obj);
    
}

function sfRecieve(){

}

function sfTest(){
    signalFlareIndex = 3;
    // alert("sf Test called!");
}