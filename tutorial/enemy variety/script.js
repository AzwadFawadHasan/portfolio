//document.addEventListener('DOMContentLoaded '//fires when the initial html document has been loaded and parsed. But it doesn't wait for css and images    )
//load is the correct thing



document.addEventListener('DOMContentLoaded', function(){

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 700;




class Game{
    constructor(ctx, width, height){
        this.ctx=ctx;
        this.width=width;
        this.height =height;
        this.enemies = [];
        
        this.enemyInterval =1000; //defines the number of millisec before adding a new enemy to the game
        this.enemyTimer =0;//will count milisec from 0 to 400 over and over;
        this.enemyTypes= ['worm','ghost', 'spider'];
        console.log(this.enemies);


    }
    update(deltaTime){
        this.enemies = this.enemies.filter(object => ! object.markedForDeletion)
        //.filter() method manipulates arrays
        //creates a new array with old elements, that pass the condition
        if(this.enemyTimer > this.enemyInterval){
            this.#addNewEnemy();//one enemy spawns
            this.enemyTimer=0;
        }else{
            this.enemyTimer+=deltaTime;//instead of hard coding +1 let's add Delta time this will make it more smother

        }
        this.enemies.forEach(object => object.update(deltaTime));

    }

    draw(){
        this.enemies.forEach(object => object.draw(this.ctx));

    }
    #addNewEnemy(){//a private method
        const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];
        if(randomEnemy=='worm')this.enemies.push(new Worm(this));//passing this keyword allows us to pass everything inside the constructor of the game class
        else if (randomEnemy=='ghost')this.enemies.push(new Ghost(this));
        else if (randomEnemy=='spider')this.enemies.push(new Spider(this));
        
        //we can now see that some of the worms are being spawned on top of other ones. This doens't look nice.
        //we will sort the array interms of their index number, ie their height/
        //we want works with lower y coordinate to be drawn first in this case hence
        //this.enemies.sort(function(a,b){
        //    return a.y - b.y;
        //});
//
 

    }
}

class Enemy{
    constructor(game){
        this.game= game;
        console.log(this.game); 
        this.x=this.game.width;//will be at the start of the canvas // so that canvas knows where to draw them on canvas
        this.y=Math.random() * this.game.height;
        this.width=100;
        this.height=100;
        this.markedForDeletion=false;
        this.frameX=0;//will cycle through 0 to the number of frames in the sprite image
        this.maxFrame=5;//max same for all which is 5 as all the sprite images have 6 frames
        this.frameInterval =100;
        this.frameTimer=0;

    }
    update(deltaTime){
        this.x-=this.vx *deltaTime;//moves the enemy one pixel to the left of the canvas
        if(this.x <0 - this.width){
            this.markedForDeletion= true;
        }

        if(this.frameTimer>this.frameInterval){ 
            if (this.frameX<this.maxFrame)this.frameX++;
            else {
                this.frameX=0;
              
            }
            this.frameTimer=0;
        } 
        
        else{
            this.frameTimer+=deltaTime;
        }


    }
    draw(ctx){//this way this draw() method is using this.ctx that was passed along from the game object rather than passing global ctx
        //ctx.fillRect(this.x, this.y, this.width, this.height);
      
        ctx.drawImage(this.image,this.frameX*this.spriteWidth,0,this.spriteWidth, this.spriteHeight,this.x, this.y, this.width, this.height);
        //0=sx, 0=sy as we are just cropping the first frame from the sprite sheet
    }

}


class Worm extends Enemy {
    constructor(game){//constructor expects game as an arguement

        super(game); //take all code from enemy constructor and use it here
        this.image = worm;// we must always declare super first  and run parent constructor first  otherwise will get a reference error
        this.spriteWidth=229;
        this.spriteHeight=171;
        this.width=this.spriteWidth/2;
        this.height=this.spriteHeight/2;       
        this.x=this.game.width;//will be at the start of the canvas // so that canvas knows where to draw them on canvas
        this.y=this.game.height- this.height;//this makes the worms move only on the ground
        
        this.vx=Math.random() *0.1 +0.1;//randomizing the speed of worms to the left of canvas
    }
}


class Spider extends Enemy {
    constructor(game){//constructor expects game as an arguement

        super(game); //take all code from enemy constructor and use it here
        this.image = spider;//comes from the id of html
        this.spriteWidth=310;
        this.spriteHeight=175;
        this.width=this.spriteWidth/2;
        this.height=this.spriteHeight/2;       
        this.x=Math.random ()* this.game.width;//will be at the start of the canvas // so that canvas knows where to draw them on canvas
        this.y=0- this.height;//we want spiders to start from the top edge hence the 0-height
        
        this.vx=0;//randomizing the speed of worms to the left of canvas
        this.vy =Math.random()*0.1+0.1;//velocity in y axis
        this.maxLength=Math.random()*this.game.height-this.height;
    }
    update(deltaTime){

        super.update(deltaTime);
        if (this.y<0 - this.height*2) this.markedForDeletion=true;
        this.y+=this.vy *deltaTime; 
        if(this.y>this.maxLength) this.vy*=-1;//making spider move up and down
    }
    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.x+this.width/2,0);//starting cooridinates
        

        ctx.lineTo(this.x+this.width/2, this.y);
        ctx.stroke();

        super.draw(ctx);
        

    }
}



class Ghost extends Enemy {
    constructor(game){//constructor expects game as an arguement

        super(game); //take all code from enemy constructor and use it here
        this.image = ghost;// we must always declare super first  and run parent constructor first  otherwise will get a reference error
        this.spriteWidth=261;
        this.spriteHeight=209;
        this.x=this.game.width;//will be at the start of the canvas // so that canvas knows where to draw them on canvas
        this.y=Math.random() * this.game.height *0.6;// I want the ghost to take up only top 60 percent of the game, so that they don't fly too close to the worms
        this.width=this.spriteWidth/2;
        this.height=this.spriteHeight/2;
        this.vx=Math.random() *0.2 +0.1;//randomizing the speed of worms to the left of canvas
        this.angle=0;  
        this.curve = Math.random() *3; 
    }
    update(deltaTime){

        super.update(deltaTime);
        this.y+=Math.sin(this.angle) * this.curve;//curve of ghosts movement pattern
        this.angle+=0.04;//curve of ghosts

    }
    draw(ctx){
        ctx.save();
        ctx.globalAlpha = 0.5;
        super.draw(ctx);
        //ctx.globalAlpha = 1;//after drawing my ghost I set it back to 1 as it affects the entire ctx but it's better to use a .save and .restore 
        ctx.restore();
    }
}



const game = new Game(ctx, canvas.width, canvas.height);    
let lastTime=1;
function animate(timeStamp){//timeStamp arguement is automatically generated by requestAnimationFrame
    ctx.clearRect(0,0, canvas.width, canvas.height);
    //some code
    //difference in frames in animation is called deltatime
    const deltaTime =timeStamp-lastTime;
    lastTime= timeStamp;
    //console.log(deltaTime);
    game.update(deltaTime);//passing deltaTime here means the spawning of enemy is synchronized in both slow and fast computers

    game.draw();
    requestAnimationFrame(animate);
};


animate(0);


});