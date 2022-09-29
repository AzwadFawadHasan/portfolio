const canvas = document.getElementById("canvas1");//create a custom variable called canvas
//to the reference to our actual html canvas element created in index.html
const ctx = canvas.getContext('2d');
//i have all canvas 2d methods stored in here
console.log(ctx);

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';

let x = 0;
const spriteWidth = 575; //creating a global variable
const spriteHeight = 523; //

let frameX=0;
let frameY=3;

let gameFrame = 0;
const staggerFrames = 5;

function animate(){//animation loop function
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);//clearing old paint from previous animation frames
    //clearing entire canvas so coordinates 0 0 to canvas width and height
    //ctx.fillRect(50,50,100,100);//we are now drawing a simple rectangle
    //ctx.fillRect(x,50,100,100);
    //x++;

    //ctx.drawImage(image, sx, sy, swidth, sheight, dx, dy, dw,dh)
    //first 4 the rectangular area we want to cut out from our source image
    // last 4 parameters tells js where on our destination canvas we
    // want to draw the cropped out part of our dog image


    //let sx =0; let sy=0; let sw=200; let sh=200;


    
    ctx.drawImage(playerImage, frameX*spriteWidth, frameY*spriteHeight, spriteWidth, spriteHeight,0,0, spriteWidth, spriteHeight);
    
    if(gameFrame % staggerFrames == 0){
        
    
        if(frameX < 6){frameX++;}
        else {frameX=0;}
    }
    gameFrame++;
    requestAnimationFrame(animate);//requestAnimationFrame is abuilt in function
    // it runs a function that is passed to it.
    // it runs it over and over
    
}

animate();