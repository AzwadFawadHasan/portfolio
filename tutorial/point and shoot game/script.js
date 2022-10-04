const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d', {willReadFrequently: true});
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


const collisionCanvas = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d',{willReadFrequently: true});
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;



let timeToNextRaven =0; //helper varaible, this acuumulates milisec values between frames until it reaches our interval value and triggers next frame
let ravenInterval = 500;
let lastTime=0;
let gameOver =false;
ctx.font = '50px Impact'; 
let ravens = [];//using let variables as const variables can't be reassigned 
let score = 0;

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
        //this.image.crossOriginPolicy = "Anonymous";
        this.frame =0; //no of frames in the sprite sheet
        this.maxFrame =4;
        this.timeSinceFlap = 0;//0 at first, grows by the amount of deltatime until  it reaches value in flapinterval
        //then it will tr9gger jext frame of sprite sheet and reset back to 0
        this.flapInterval= Math.random()*10899 +5500;//5500;
        this.a = Math.floor(Math.random() * 255);
        this.b = Math.floor(Math.random() * 255);
        this.c = Math.floor(Math.random() * 255);
        this.randomColors = [this.a, this.b, this.c];
        //this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255),Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] +',' +this.randomColors[1]+','+this.randomColors[2]+')';
        this.hasTrail = Math.random() >0.5  ;


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
            if(this.hasTrail){
                for(let i =0 ; i <5; i++){

                    particles.push(new Particle(this.x, this.y, this.width, this.color));

                }
                
            }
           
        }
        if(this.x<0 - this.width) gameOver=true;
  
    }
    draw(){

        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);;

    }
}

let explosions = []; //holds all active explosions objects

class Explosions{
    constructor(x,y,size){
        this.image = new Image();
        this.image.src = 'boom.png';
        this.spriteHeight=179;
        this.spriteWidth = 200; 
        this.size =size;
        this.x=x;
        this.y=y;
        this.frame=0;
        this.sound = new Audio();
        this.sound.src='boom.wav';
        this.timeSinceLastFrame =0;
        this.frameInterval = 500;//200 milisec
        this.markedForDeletion=false;

    }
    update(deltatime){
        if(this.frame===0)this.sound.play();
        this.timeSinceLastFrame += deltatime;
        if(this.timeSinceLastFrame>this.frameInterval){
            this.frame++;
            this.timeSinceLastFrame=0;
            if(this.frame>5){
                this.markedForDeletion=true;
            }
        }
    
    }
    draw(){
        ctx.drawImage(this.image, this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight,this.x,this.y- this.size/4, this.size, this.size);
    }
}

function drawGameOver(){
    ctx.textAlign ='center';
    ctx.fillStyle='black';
    ctx.fillText('Game Over, your score is ' + score , canvas.width/2, canvas.height/2);
    ctx.fillStyle='white';
    ctx.fillText('Game Over, your score is ' + score , canvas.width/2 +5, canvas.height/2 + 5);
}

let particles =[];

class Particle{
    constructor(x,y,size,color){
        this.size = size;
        this.x=x +this.size/2 +Math.random() *50 -25;
        this.y=y + this.size/3+Math.random() *50 -25;
        
        this.radius= Math.random()*this.size/10;
        this.maxRadius = Math.random()*20+35;
        this.markedForDeletion = false;
        this.speedX = Math.random() *1 +0.5;
        this.color=color;

        ;
    }
    update(){
        this.x+=this.speedX;
        this.radius+=0.5;
        if(this.radius>this.maxRadius-5) this.markedForDeletion=true;
    }
    draw(){
        ctx.save();//saves a snapshot
        ctx.globalAlpha=1-(this.radius/this.maxRadius);
        ctx.beginPath();
        ctx.fillStyle=this.color;
        ctx.arc(this.x,this.y,this.radius, 0, Math.PI*2);
        ctx.fill();
        ctx.restore();//revert canvas settings
    }
}

function drawScore(){
    ctx.fillStyle='black';//for white numbers
    ctx.fillText('Score: '+score, 50,75);//hardcoding string
    ctx.fillStyle='white';//for white numbers
    ctx.fillText('Score: '+score, 55,80)//hardcoding string
}


window.addEventListener('click', function(e){
    console.log(e.x, e.y);
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    console.log(detectPixelColor);

    const pc = detectPixelColor.data;

    ravens.forEach(
        object => {
            if(object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]){
                object.markedForDeletion= true;

                score++;

            }
        }
    )
    
    


});

/*window.addEventListener('click', function(e){//for shooting ravens
    //const detectPC = collisionCanvas;
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);//detects pixels color, getImageData scans the canvas and returns an array like object called Uint8 -> it contais unsighned 8 bit integeres
    //console.log('hi');
    //detectPixelColor.crossOriginPolicy = "Anonymous";
    //crossOriginPolicy: 'Anonymous';
    console.log(detectPixelColor);
    //we want to scan only one pixel so cooridinates of that area is gonna be e.x ,e.y and width and height of that area will be 1,1  
    
    //doing collision detection with colour
    //for that we need to know the color of the pixel we are on
    


    const pc = detectPixelColor.data;//To get hold of data of UIint8ClampedArray which contains red, green,blue and alpha value. we ignore the alpha
    ravens.forEach(object => {
        if(object.randomColors[0] === pc[0] && object.randomColors[1]===pc[1] && object.randomColors[2]===pc[2]){
            
                //detects collision by color
                object.markedForDeletion=true;
                score++;
                explosions.push(new Explosions(object.x, object.y, object.width));
            }
    });

});

*/


function animate(timestamp){//takes values in milliseconds
    //timestamp behavior is a default javascript behaviour when using request animation frame (animate)
    //as the loop runs requestAnimationFrame runs over and over and animate becomes the call backfunction here
    ctx.clearRect(0,0,canvas.width,canvas.height);
    collisionCtx.clearRect(0,0,canvas.width,canvas.height);
    //let deltaTime=0;
    let deltaTime= timestamp -lastTime;
    lastTime - timestamp;
    timeToNextRaven+=deltaTime;
    //console.log(deltaTime);
    if(timeToNextRaven > ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven=0;
        ravens.sort(function(a,b){
            //sorting ravens by width
            //so that smaller ones remain in foreground
            return a.width-b.width;
            //width of everyelement being comapred with width of every other element in the array
            

        });

    };
    drawScore();
    [...particles,...ravens, ...explosions].forEach(object => object.draw());//[] this is an array literal
      //... three dots are array literal spread operator
      //we are speading the ravens array inside this new array we just created
    //for each raven object in raven's array call their associated  update method.
    [...particles,...ravens, ...explosions].forEach(object => object.update(deltaTime)) ;
    //using splice function in array removes elements from the middle of the array
    //hence he have to adjust the index so that neighbours arent affected.
    //its bettwer to use  filter method() instead
    ravens = ravens.filter(object => !object.markedForDeletion);
    //take ravens variable from above, and place it with the same array
    
    //but the array should be filled only with objects for which this condition is true
    explosions = explosions.filter(object => !object.markedForDeletion);
    particles = particles.filter(object => !object.markedForDeletion);
    if(!gameOver)requestAnimationFrame(animate);
    else drawGameOver();
} 

animate(0);