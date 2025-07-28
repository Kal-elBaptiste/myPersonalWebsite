class ButtonTray {
    constructor(x, y, width, height, color, buttonObject, placementType){

        this.x = x;
        this.y = y;        
        this.width = width;
        this.height = height;
        this.color = color;
        this.buttonObject = buttonObject;
        this.placementType = placementType;

        if (buttonObject){
            this.buttonAmount = Object.keys(buttonObject).length;
        }
    }

    draw(endFillColor){

        fill(this.color);
        rect(this.x, this.y, this.width, this.height);

        for (let i = 0; i < this.buttonAmount; i++){

        }

        if (endFillColor) {
            fill(endFillColor);
        }
    }
}

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
let buttonTray;

function setup(){
    let canvas = createCanvas(600, 400); // temporary values
    canvas.parent('p5-div');
    canvas.style('flex', '1');
    canvas.style('width', '100%');
    canvas.style('height', '100%');
    
    background(0, 0, 0)

    buttonTray = new ButtonTray(0, 0, width, height/4, (100, 100, 100), null, null);
}

function draw() {
    background(0, 0, 0);
    buttonTray.draw();

}

function mouseClicked(){
    
}

function windowResized() {
    
    const container = document.getElementById('p5-div');
    const {width, height} = getInnerSize(container);
    console.log("WINDOW RESIZED");

    buttonTray.width = width;
    buttonTray.height = height/4;


    resizeCanvas(width, height);
}