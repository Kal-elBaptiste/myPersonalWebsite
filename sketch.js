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

let mouseClickedInsideCanvas = false;
let buttonTray;

function setup(){
    let canvas = createCanvas(606, 491);
    canvas.parent('p5-div');

    background(0, 0, 0)

    // Holds colors and canvs clear
    buttonTray = new ButtonTray(0, 0, width, height/4, (100, 100, 100), null, null);
}

function draw() {
    background(0, 0, 0);
    buttonTray.draw();

}

function mouseClicked(){
    
}