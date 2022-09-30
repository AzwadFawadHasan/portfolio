const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');//creates instance of builtin canvas 2d api object

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 15;
const backgroundLayer1 = new Image();
backgroundLayer1.src =  'backgroundLayers\\layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src =  'backgroundLayers\\layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src =  'backgroundLayers\\layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src =  'backgroundLayers\\layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src =  'backgroundLayers\\layer-5.png';

let z=0;
let x =0;//serves as horizontal position for one of the background images
let x2 =2400;//x2 for second identical image
//2400 is the image width(full)
function animate(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    ctx.drawImage(backgroundLayer4,x,0);
    ctx.drawImage(backgroundLayer4,x2,0);
    //x2 starts where the first image ends
    if(x<-2400)x=2400-gameSpeed;//reset check
    //when x becomes 2400 x2 reduces by 15 pixels
    else x-=-gameSpeed;
    if(x2<-2400)x2=2400 -gameSpeed;
    else x2-= gameSpeed;
    requestAnimationFrame(animate);

}
animate();