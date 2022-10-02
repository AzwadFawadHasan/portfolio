const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextRaven =0; //helper varaible, this acuumulates milisec values between frames until it reaches our interval value and triggers next frame
let ravenInterval = 500;
let lastTime=0;

let ravens = [];


class Raven{
    constructor(){
        this.width = 100;
        this.height = 50;
        this.x = canvas.width;//it;s gona be canvas.width so the the ravens can fly to the left of the scren
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 +3; //a number between 5 and 3
        this.directionY = Math.random() * 5 -2.5;
        
         

    }
    update(){
        this.x-=this.directionX;//moves the raven around.. here it moves it to the left

    }
    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);


    }
}

function animate(timestamp){//takes values in milliseconds
    //timestamp behavior is a default javascript behaviour when using request animation frame (animate)
    //as the loop runs requestAnimationFrame runs over and over and animate becomes the call backfunction here
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let deltaTime= timestamp -lastTime;
    lastTime - timestamp;
    timeToNextRaven+=deltaTime;
    //console.log(deltaTime);
    
    requestAnimationFrame(animate);

}

animate();