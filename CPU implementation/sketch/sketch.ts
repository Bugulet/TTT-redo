// GLOBAL VARS & TYPES
let squareSize:number=5;
let particleArray:Particle[]=[];
let constantSlider: number = 2;
let ballNumber: number = 10;



let strengthSlider: HTMLInputElement;

function setupFunction() {
  // FULLSCREEN CANVASW
  
  const canvasConst = createCanvas(720, 480);
  canvasConst.parent("sketchHolder");

  strengthSlider = document.getElementById("strengthConstant") as HTMLInputElement;

  let squareSlider = document.getElementById("sizeConstant") as HTMLInputElement;
  let ballNumberSlider = document.getElementById("numberOfBallsConstant") as HTMLInputElement;
  squareSize = parseInt(squareSlider.value);
  document.getElementById("fragmentNumber").innerText = `Calculations per frame:${Math.floor((720 / squareSize) * (480 / squareSize) * ballNumber)}`;
  document.getElementById("resolutionNumber").innerText = `Current resolution:${Math.floor((720 / squareSize))} x ${Math.floor(480 / squareSize)}`;
  squareSlider.oninput = () => {
    squareSize = parseInt(squareSlider.value);
    console.log("Squares calculated per frame:", (720 / squareSize) * (480 / squareSize));
    document.getElementById("fragmentNumber").innerText = `Calculations per frame:${Math.floor((720 / squareSize) * (480 / squareSize) * ballNumber)}`;
    document.getElementById("resolutionNumber").innerText = `Current resolution:${Math.floor((720 / squareSize))} x ${Math.floor(480 / squareSize)}`;
  }

  ballNumberSlider.oninput = () => {
    ballNumber = parseInt(ballNumberSlider.value);

    particleArray.length = 0;
    for (let index = 0; index < 100; index++) {
      if (index < ballNumber) {
        let newParticle: Particle = new Particle(random(720), random(480), random(100/(ballNumber/4)));
        particleArray.push(newParticle);
      }
      else {
        let newParticle: Particle = new Particle(0, 0, 0);
        particleArray.push(newParticle);
      }
    }
    document.getElementById("fragmentNumber").innerText = `Calculations per frame:${Math.floor((720 / squareSize) * (480 / squareSize) * ballNumber)}`;
  }

  strengthSlider.oninput = function () {
    constantSlider =5- parseFloat(strengthSlider.value);
    console.log(strengthSlider.value);
  }

  particleArray.length = 0;
  for (let index = 0; index < 100; index++) {
    if (index < ballNumber) {
      let newParticle: Particle = new Particle(random(720), random(480), random(30));
      particleArray.push(newParticle);
    }
  }

  console.log("🚀 - Setup initialized - P5 is running");
  noStroke();
}
// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  setupFunction();
}

let frameCounter:number = 0;
let frameSum:number = 0;
// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  //Data block
  {
    frameCounter++;

    frameSum += frameRate();
  
    let frames: number = Math.floor(frameSum / frameCounter);
  
    if (frameCounter > 10) {
      document.getElementById("frameRate").innerText = `Framerate: ${frames}`;
      frameSum = 0;
      frameCounter = 0;
    }

    document.getElementById("objectNumber").innerText = `Number of objects: ${ballNumber}`;
  }
  
  background(0,0,0);
  for(let i=0;i<720/squareSize;i++){
    for(let j=0;j<480/squareSize;j++){
      let addedValue=0;
      
      particleArray.forEach(element => {
        if (element.x == 0 && element.y == 0)
          return;
        addedValue+=(1/dist(i*squareSize,j*squareSize,element.x,element.y))*element.strength*20/constantSlider;
      });

      addedValue+=(1/dist(i*squareSize,j*squareSize,mouseX,mouseY))*500;
      if (addedValue > 20)
        fill(255,125, 0);
      else fill(0, 0, 0);
      rect(i*squareSize,j*squareSize,squareSize,squareSize);
    }
  }
  
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  setupFunction();
}
