const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');//creates instance of builtin canvas 2d api object

const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

let gameSpeed = 5;
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


class Layer{
    constructor(image, speedModifier){
        this.x=0;
        this.y =0;//vertical y coordinate;
        this.width=2400;
        this.height=700;
        this.x2=this.width;
        this.image=image;
        this.speedModifier=speedModifier;//controls speed of background image
        this.speed = gameSpeed * this.speedModifier;

    }
    update(){//move layers horizontally by changing their this.x and y properties
        if(this.x <= -this.width){
            this.x = this.width + this.x2 -this.speed;
        }
        if (this.x2 < -this.width){
            this.x2 = this.width+this.x-this.speed;
        }
        this.x=Math.floor(this.x-this.speed);
        this.x2=Math.floor(this.x2-this.speed);
    }
    draw(){//takes info from the layer object and draws it onto the canvas
        ctx.drawImage(this.image, this.x,this.y,this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1,0.2);
const layer2 = new Layer(backgroundLayer2,0.4);
const layer3 = new Layer(backgroundLayer3,0.6);
const layer4 = new Layer(backgroundLayer4,0.8);
const layer5 = new Layer(backgroundLayer5,1);

const gameObjects=[layer1, layer2, layer3, layer4, layer5];
 

function animate(){//parallax effect is when the foreground layer moves faster than the background layer
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    //ctx.drawImage(backgroundLayer4,x,0);
    //ctx.drawImage(backgroundLayer4,x2,0);
    //x2 starts where the first image ends
    //if(x<-2400)x=2400-gameSpeed;//reset check
    //when x becomes 2400 x2 reduces by 15 pixels
    //else x-=-gameSpeed;
    //if(x2<-2400)x2=2400 -gameSpeed;
    //else x2-= gameSpeed;
    
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });


    requestAnimationFrame(animate);

}
animate();