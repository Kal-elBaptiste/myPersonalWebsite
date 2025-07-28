

function getRandIntInRange(min, max){
    return Math.floor(Math.random() * ((max + 1) - min) + min)
}

// This is used to get the inside dimensions of an element (removes padding)
function getInnerSize(element) {
    const style = window.getComputedStyle(element);
    const paddingX = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const paddingY = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
  
    const width = element.clientWidth - paddingX;
    const height = element.clientHeight - paddingY;
  
    return { width, height };
}
  


let mouseClickedInsideCanvas = false;

function setup(){
    const container = document.getElementById('p5-div');
    const {width, height} = getInnerSize(container);

    let canvas = createCanvas(width, 400);
    canvas.parent('p5-div'); // attaches the canvas to the div
    background(0, 0, 0)
}

function draw() {
    background(0, 0, 0);

}

function mouseClicked(){
    
}

function windowResized() {
    const container = document.getElementById('p5-div');
    const {width, height} = getInnerSize(container);
    console.log("WINDOW RESIZED");

    resizeCanvas(width, 400);
}