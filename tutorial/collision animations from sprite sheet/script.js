const canvas = document.getElementsById('canvas1');
const ctx = canvas;getContext('2d');
canvas.width = 500;
canvas.height = 700;

ctx.fillStyle = 'white';
ctx.fillRect(50,50,100,150);

const explosions =[];

class Explosion{
    constructor(x,y){
        this.x = x;
        this.y =y; //vertical  y coordinate
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        //division operation in javascript is more expensive than multiplication
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight*0.5;
        this.image = new Image();
        this.image.src = "boom.png";
        this.frame = 0;

        
    }
    update(){
        this.frame++;

    }
    draw(){
        //ctx.drawImage(image, sx, sy,sw, sh,dx, dy, dw,dh);
        //sy =0 here since it's vertical y cooridinate we want to crop out from the source , since the spirte sheet has 1 row sy =0
        ctx.drawImage(image, this.spriteWidth* this.frame, 0,this.spriteWidth, this.spriteHeight,this.x, this.y, this.width,this.height);//last 4 means desitination 
        
    }
}


window.addEventListener('click', function(e){//we will be listening for mouse click event
    //and in callback function, it will run every time a mouse click occurs

    ctx.fillRect(x,y,width,height);
    //we want this rectangle to be drawn at the current coordinates of our mouse click
    // to do that its easy
    // call back function of event listener has access to event objects
    //usually we name this object e
    //this e is event object
    
});