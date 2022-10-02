const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextRaven =0; //helper varaible, this acuumulates milisec values between frames until it reaches our interval value and triggers next frame
let ravenInterval = 500;
let lastTime=0;
ctx.font = '50px Impact'; 
let ravens = [];//using let variables as const variables can't be reassigned 
let score =0;

class Raven{
    constructor(){
        this.spriteWidth = 271;
        this.spriteHeight= 194;
        this.sizeModifier = Math.random() *0.6 +0.4;

        this.width = this.spriteWidth*this.sizeModifier;
        this.height = this.spriteHeight*this.sizeModifier;
        this.x = canvas.width;//it;s gona be canvas.width so the the ravens can fly to the left of the scren
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 +3; //a number between 5 and 3
        this.directionY = Math.random() * 5 -2.5;
        this.markedForDeletion=false;
        this.image = new Image();
        this.image.src = 'raven.png';
        this.frame =0; //no of frames in the sprite sheet
        this.maxFrame =4;
        this.timeSinceFlap = 0;//0 at first, grows by the amount of deltatime until  it reaches value in flapinterval
        //then it will tr9gger jext frame of sprite sheet and reset back to 0
        this.flapInterval= Math.random()*10899 +5500;//5500;


        


         

    }
    update(deltaTime){
        this.x-=this.directionX;//moves the raven around.. here it moves it to the left
        if(this.y<0 || this.y>canvas.height-this.height){
            this.directionY= this.directionY*-1;
        }
        this.y += this.directionY;
        if (this.x <0  - this.width){//meaning it has moved all the way to the left of the screen
            this.markedForDeletion= true;        
        }
        this.timeSinceFlap += deltaTime;//unifies animation speed in fast and slow devices both
        if(this.timeSinceFlap> this.flapInterval){

            if (this.frame > this.maxFrame){
                this.frame=0;
            }else{
                this.frame++;
            }
            this.timeSinceFlap=0;
        }
  
    }
    draw(){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);;

    }
}


function drawScore(){
    ctx.fillStyle='black';//for white numbers
    ctx.fillText('Score: '+score, 50,75)//hardcoding string
    ctx.fillStyle='white';//for white numbers
    ctx.fillText('Score: '+score, 55,80)//hardcoding string
}

window.addEventListener('click', function(e)){//for shooting ravens
    const detectPixelColor = ctx.getImageData(e.x,e.y,1,1);//detects pixels color, getImageData scans the canvas and returns an array like object called Uint8 -> it contais unsighned 8 bit integeres
    //we want to scan only one pixel so cooridinates of that area is gonna be e.x ,e.y and width and height of that area will be 1,1  
    //doing collision detection with colour
    //for that we need to know the color of the pixel we are on
    
}


function animate(timestamp){//takes values in milliseconds
    //timestamp behavior is a default javascript behaviour when using request animation frame (animate)
    //as the loop runs requestAnimationFrame runs over and over and animate becomes the call backfunction here
    ctx.clearRect(0,0,canvas.width,canvas.height);
    let deltaTime=0;
    deltaTime= timestamp -lastTime;
    lastTime - timestamp;
    timeToNextRaven+=deltaTime;
    //console.log(deltaTime);
    if(timeToNextRaven > ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven=0;

    };
    drawScore();
    [...ravens].forEach(object => object.draw());//[] this is an array literal
      //... three dots are array literal spread operator
      //we are speading the ravens array inside this new array we just created
    //for each raven object in raven's array call their associated  update method.
    [...ravens].forEach(object => object.update(deltaTime)) ;
    //using splice function in array removes elements from the middle of the array
    //hence he have to adjust the index so that neighbours arent affected.
    //its bettwer to use  filter method() instead
    ravens = ravens.filter(object => !object.markedForDeletion);
    //take ravens variable from above, and place it with the same array
    //but the array should be filled only with objects for which this condition is true
    requestAnimationFrame(animate);

}

animate(0);