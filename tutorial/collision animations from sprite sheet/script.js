const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;

ctx.fillStyle = 'white';
//ctx.fillRect(50,50,100,150);

const explosions =[];
let canvasPosition = canvas.getBoundingClientRect();// this is needed as window.addEventListener does not take into account the size of our canvas. We need to offset our cooridinates of x and y so that after mouse click rect appears right under our mouse click
//this getbounding client rect help us to meause canvas position 
// this can be used to measure any html element

class Explosion{
    constructor(x,y){
        
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        //division operation in javascript is more expensive than multiplication
        this.width = this.spriteWidth*0.7;
        this.height = this.spriteHeight*0.7;
        this.x = x ;
        this.y =y ; //vertical  y coordinate
        this.image = new Image();
        this.image.src = "boom.png";
        this.frame = 0;
        this.timer=0;
        this.angle= Math.random() * 6.2;//A circle is 360degrees->6.2 rad

        
    }
    update(){
        this.timer++;
        if(this.timer %10 ===0){//run this code every 10 frames

            this.frame++// this if statement slows down animation
        }
        //this.frame++;
        

    }
    draw(){//rotating a smoke frame
        ctx.save(); 
        ctx.translate(this.x, this.y);//translate rotation center point
        // i want to rotate it around it's center so this.x and this.y
        ctx.rotate(this.angle);//rotate each one by a different angle value 

        //ctx.drawImage(image, sx, sy,sw, sh,dx, dy, dw,dh);
        //sy =0 here since it's vertical y cooridinate we want to crop out from the source , since the spirte sheet has 1 row sy =0
        ctx.drawImage(this.image, this.spriteWidth* this.frame, 0,this.spriteWidth, this.spriteHeight,0 -this.width/2, 0-this.height/2, this.width,this.height);//last 4 means desitination 
        

        ctx.restore();
    }
}


window.addEventListener('click', function(e){//we will be listening for mouse click event
    //and in callback function, it will run every time a mouse click occurs
    
    //ctx.fillStyle='white';
    //ctx.fillRect(e.x-canvasPosition.left-25, e.y-canvasPosition.top-25,50,50);//if we want our mouse to be exactly in the middle of the rectangle, we need to offset position of canvas with half of width and height of the rectangle
    //we want this rectangle to be drawn at the current coordinates of our mouse click
    // to do that its easy
    // call back function of event listener has access to event objects
    //usually we name this object e
    //this e is event object

    //making the above code cleaner

    createAnimation(e);

   

});


window.addEventListener('mousemove', function(e){//we will be listening for mouse click event
   
    createAnimation(e);

   

});

function createAnimation(e){
    ctx.clearRect(0,0, canvas.width, canvas.height); // to only see the current frame we do this as this clears the canvas
     
    let positionX= e.x - canvasPosition.left;
    let positionY=e.y - canvasPosition.top;
    explosions.push(new Explosion(positionX,positionY));

}

function animate(){
    for(let i =0; i<explosions.length; i++){
        explosions[i].update();
        explosions[i].draw();
        if(explosions[i].frame >5){
            explosions.splice(i,1);
            i--;
        }

    }
    requestAnimationFrame(animate);
}
animate();