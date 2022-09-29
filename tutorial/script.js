const canvas = document.getElementById("canvas1");//create a custom variable called canvas
//to the reference to our actual html canvas element created in index.html
const ctx = canvas.getContext('2d');//i have all canvas 2d methods stored in here
console.log(ctx);

const CANVAS_WIDTH = canvas.width = 600;