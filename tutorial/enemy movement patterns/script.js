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
const numberOfEnemies=100;
const enemiesArray =[];



const enemyImage = new Image();
enemyImage.src = 'enemiesSpriteImages\\enemy1.png';


class Enemy{
    constructor(){
        this.x=Math.random() * canvas.width;//to randomize the position of enemy
        //this.y=50;
        this.y = Math.random() * canvas.height;
        
        this.speed = Math.random() * 4 -2; //creates a random number from 0-4 but we are pushing the range to start from -2 
        //so we are also getting enemeies who moves left and right both
        this.spriteWidth =293;//293 is the width of a single frame of enemyimage1

        this.spriteHeight = 155// likewise as before
        this.width=this.spriteWidth/2.5;
        this.height=this.spriteHeight/ 2.5;
    }           
    update(){//moves the enemy in the canvas
        this.x+= this.speed;
        this.y+= this.speed;

    }
    draw(){//draws enemey on canvas
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        //ctx.drawImage(enemyImage, this.x, this.y);
        //cropping out area from spirtesheet
        ctx.drawImage(enemyImage, 0,0, this.spriteWidth, this.spriteHeight,this.x, this.y, this.width, this.height);

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
    requestAnimationFrame(animate);
}

animate();