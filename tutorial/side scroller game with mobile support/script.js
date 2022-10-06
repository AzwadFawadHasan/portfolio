//document.addEventListener('DOMContentLoaded '//fires when the initial html document has been loaded and parsed. But it doesn't wait for css and images    )
//load is the correct thing



document.addEventListener('load', function(){//benefit of using an anonymous function
    //a function without a name is anonymous function
    //we can sepearte our scope of the game from a global scope 

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');// this is the instance of built in canvas 2D api that holds all drawing methods and properties we need to animate our game
canvas.width = 500;
canvas.height = 720;





});