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
        this.spriteHeight = 179

        
    }
}