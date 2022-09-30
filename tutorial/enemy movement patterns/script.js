/** @type {HTMLCanvasElement} */ //tells vscode to show canvas methods
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

CANVAS_WIDTH = canvas.width =500;
CANVAS_HEIGHT = canvas.height=1000;

enemy1 ={
    x:0,//horizontal coordinate on the canvas of the enemy
    y:0,//vertical coordinate on canvas of the enemey
    width:200,
    height:200,

}


function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);//clears previous paint on canvas

    enemy1.x++;//to move the enemy to the right
    enemy1.y++;// moves enemy to to down
    ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);//filling rectanle with enemy1 properties
    requestAnimationFrame(animate);
}

animate();