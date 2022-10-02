const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timeToNextRaven =0; //helper varaible, this acuumulates milisec values between frames until it reaches our interval value and triggers next frame
let ravenInterval = 500;
let lastTime=0;

let ravens = [];//using let variables as const variables can't be reassigned 


class Raven{
    constructor(){
        this.width = 100;
        this.height = 50;
        this.x = canvas.width;//it;s gona be canvas.width so the the ravens can fly to the left of the scren
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 +3; //a number between 5 and 3
        this.directionY = Math.random() * 5 -2.5;
        this.markedForDeletion=false;
        this.image = new Image();
        this.image.src = 'raven.png';
        this.spriteWidth = 271;
        this.spriteHeight= 194;
        

         

    }
    update(){
        this.x-=this.directionX;//moves the raven around.. here it moves it to the left
        if (this.x <0  - this.width){//meaning it has moved all the way to the left of the screen
            this.markedForDeletion= true;        
        }
    }
    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);


    }
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
    [...ravens].forEach(object => object.draw());//[] this is an array literal
      //... three dots are array literal spread operator
      //we are speading the ravens array inside this new array we just created
    //for each raven object in raven's array call their associated  update method.
    [...ravens].forEach(object => object.update()) ;
    //using splice function in array removes elements from the middle of the array
    //hence he have to adjust the index so that neighbours arent affected.
    //its bettwer to use  filter method() instead
    ravens = ravens.filter(object => !object.markedForDeletion);
    //take ravens variable from above, and place it with the same array
    //but the array should be filled only with objects for which this condition is true
    requestAnimationFrame(animate);

}

animate(0);