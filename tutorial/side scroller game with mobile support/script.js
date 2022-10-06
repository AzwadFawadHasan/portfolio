//document.addEventListener('DOMContentLoaded '//fires when the initial html document has been loaded and parsed. But it doesn't wait for css and images    )
//load is the correct thing



document.addEventListener('DOMContentLoaded', function(){//benefit of using an anonymous function
    //a function without a name is anonymous function
    //we can sepearte our scope of the game from a global scope 

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');// this is the instance of built in canvas 2D api that holds all drawing methods and properties we need to animate our game
canvas.width = 500;
canvas.height = 720;

class InputHandler{//puts event listeners  to keyboard events and holds arrays of all active keys
    constructor(){
        this.keys = [];//array helps to add and remove key presses
        window.addEventListener('keydown', e =>{
            console.log(e.key);
            if(
                (e.key === 'ArrowDown' || e.key ==='ArrowUp' || e.key=== 'ArrowLeft' || e.key === 'ArrowRight')
             && this.keys.indexOf(e.key)=== -1){// this means this.key which is arrow donwn is not present in the array
                this.keys.push(e.key);
            }
            console.log(e.key, this.keys);  
            //ES6 arrow functions don't bind their own 'this' but
            // they inherit the one from their parent scope this
            // this is called lexical scoping
        });

        window.addEventListener('keyup', e =>{
            console.log(e.key);
            if((e.key === 'ArrowDown' || e.key ==='ArrowUp' || e.key=== 'ArrowLeft' || e.key === 'ArrowRight')
                 && this.keys.indexOf(e.key)=== -1){// this means this.key which is arrow donwn is not present in the array
                this.keys.splice(this.keys.indexOf(e.key),1);//if key that was RELEASED was arrow down we want to remove it from htre array
            
            //splice takes 2 arguments index of key that needs to be removed
            // and how many elements starting from that index we want to remove
            //1 means to remove 1 element from tthat array
            }
            console.log(e.key, this.keys);  
          
        });
    }
}

class Player{
    //player class will react to these keys
}

class Background{
    //seperate class to handle scrolling backgrounds 
}

class Enemy{
//contains enemy properties
}


function handdleEnemies(){
    //seperate function to handle enemies,
    //like adding and removing enemies
}

function displayStatusText(){
    //display score and lives
}

const input = new InputHandler();

function animate(){
    //UPDATES    and draws enemeies over and over
}


});