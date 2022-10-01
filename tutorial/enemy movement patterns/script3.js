/** @type {HTMLCanvasElement} */ //tells vscode to show canvas methods
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width =500;
CANVAS_HEIGHT = canvas.height=1000;
/*
enemy1 ={
    x:0,//horizontal coordinate on the canvas of the enemy
    y:0,//vertical coordinate on canvas of the enemey
    width:200,
    height:200,

}*/
const numberOfEnemies=25;
const enemiesArray =[];



//const enemyImage = new Image();
//enemyImage.src = 'enemiesSpriteImages\\enemy1.png';
let gameFrame =0;


class Enemy{
    constructor(){
        //Math.sin() returns the sine of a number we pass to it. That number represents angle values in radions between -1 and +1
        //this.y=50;
        
        this.image = new Image();
        this.image.src='enemiesSpriteImages\\enemy3.png';
        
        this.speed = Math.random() * 5 -1; //creates a random number from 0-4 but we are pushing the range to start from -2 
        //so we are also getting enemeies who moves left and right both
        this.spriteWidth =218;//293 is the width of a single frame of enemyimage1

        this.spriteHeight = 177;// 155 was the height of the first framelikewise as before
        this.width=Math.floor(this.spriteWidth);///2.5;
        
        this.height=Math.floor(this.spriteHeight);/// 2.5;

        this.x=Math.random() * (canvas.width-this.width);//to randomize the position of enemy
        this.y = Math.random() * (canvas.height-this.height);

        this.frame =0;
        this.flapSpeed = Math.floor(Math.random() * 1000 - 100);

        //this.angle = Math.random()*2;
        this.angle =0;
        this.angleSpeed = Math.random() *2;
        this.curve = Math.random()*200;


    }           
    update(){//moves the enemy in the canvas
        //this.x+= Math.random()*15 -7.5;
        //this.speed = gameSpeed - this.gameSpeed;
        this.x= this.curve * Math.sin(this.angle*Math.PI/180) + (canvas.width/2 - this.width);//values cycle to + and - 200 because of Math.sin as it returns a value between -1 and +1. Hence -200 to +200 because of this.curve 
        //this.y+=this.curve* Math.sin(this.angle);//multiplying with 3 makes the sine curve more promineit
        this.angle+=this.angleSpeed;
        //this.y+= Math.floor(Math.random() *5 -2.5);
        if (this.x + this.width < 0)this.x=canvas.width; //this will make sure that when enemy crosses the border it respawns again in the canvas 
        //cycle throught all frames in sprite image to animate the enemy character

        if (gameFrame % this.flapSpeed ===0){
            //this if statement basically runs the code two times in everyloop
            // this basically helps to slow down the animation frame rate
            this.frame > 4 ? this.frame = 0 : this.frame++;//this is alternative to if else statement
            //this is called ES6 ternary operator. shortens code 
        }

        

    }
    draw(){//draws enemey on canvas
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
        //ctx.drawImage(enemyImage, this.x, this.y);
        //cropping out area from spirtesheet
        ctx.drawImage(this.image, this.frame * this.width,0, this.spriteWidth, this.spriteHeight,this.x, this.y, this.width, this.height);

    }
}
//const enemy1 = new Enemy();//creating 1 enemy
//const enemy2 = new Enemy();
for(let i =0; i<numberOfEnemies; i++){
    enemiesArray.push(new Enemy());
    

}
function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);//clears previous paint on canvas

    //enemy1.x++;//to move the enemy to the right
    //enemy1.y++;// moves enemy to to down
    //enemy2.x+=0.5;//to move the enemy to the right
    //enemy2.y+=0.5;// moves enemy to to down

    //enemy1.update();
    //enemy1.draw();
    //enemy2.update();
    enemiesArray.forEach(enemy =>{
        enemy.update();
        enemy.draw(); 
    });//for Each simply calls provided call back function for each element in the array
    //ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);//filling rectanle with enemy1 properties
    //ctx.fillRect(enemy2.x, enemy2.y, enemy2.width, enemy2.height);
    
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();