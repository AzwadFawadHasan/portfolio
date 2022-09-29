let playerState ="run";
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change',function(e){
    playerState=e.target.value;
})


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

//let frameX=0;
//let frameY=3;

let gameFrame = 0;
const staggerFrames = 5;

const spriteAnimations = [];//will hold the position of animations like run , jump etc
// this serves as the main container that holds data for all animations

const animationStates =[
    {
        name: 'idle',
        frames: 7,
    },
    {
        name:'jump',
        frames:7,
    },
    {
        name:'fall',
        frames:7,
    },
    {
        name:'run',
        frames:9,
    },
    {
        name:'dizzy',
        frames:11,
    },
    {
        name:'sit',
        frames:5,
    },
    
    {
        name:'roll',
        frames:7,
    },
    {
        name:'bite',
        frames:7,
    },
    
    {
        name:'ko',
        frames:12,
    },{
        name:'getHit',
        frames:11,
    },
]
// name and frames are all we need to map coordinates for each animation

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],//location
    }
    for(let j =0; j<state.frames;j++){//forloop cycles through state.frames property
        let positionX= j*spriteWidth; let positionY = index* spriteHeight;
        //this for loop calculates position x and y for each frame as we cycle through the sprite sheet
        frames.loc.push({x:positionX, y:positionY});

    }
    spriteAnimations[state.name] = frames;
});
console.log(animationStates);
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

    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight,0,0, spriteWidth, spriteHeight);
    
    //if(gameFrame % staggerFrames == 0){
    //    
    //
    //    if(frameX < 6){frameX++;}
    //    else {frameX=0;}
    //}
    gameFrame++;
    requestAnimationFrame(animate);//requestAnimationFrame is abuilt in function
    // it runs a function that is passed to it.
    // it runs it over and over
    
}

animate();