// GLOBAL VARS & TYPES
let squareSize:number=5;
let particleArray:Particle[]=[];
let constantSlider: number = 2;
let ballNumber: number = 10;


let shaderVariable: p5.Shader;

let strengthSlider: HTMLInputElement;

function preload(){
  // load the shader
  shaderVariable=loadShader("build/uniform.vert","build/uniform.frag");
}

function setupFunction() {
  // FULLSCREEN CANVASW
  
  colorMode(HSB);
  const canvasConst = createCanvas(720, 480, WEBGL);
  canvasConst.parent("sketchHolder");


  strengthSlider = document.getElementById("strengthConstant") as HTMLInputElement;

  let squareSlider = document.getElementById("sizeConstant") as HTMLInputElement;
  let ballNumberSlider = document.getElementById("numberOfBallsConstant") as HTMLInputElement;

  // squareSlider.onchange = () => {
  //   squareSize = parseInt(squareSlider.value);
  //   console.log("Squares calculated per frame:", (windowWidth / squareSize) * (windowHeight / squareSize));
  // }

  ballNumberSlider.oninput = () => {
    ballNumber = parseInt(ballNumberSlider.value);

    particleArray.length = 0;
    for (let index = 0; index < 200; index++) {
      if (index < ballNumber) {
        let newParticle: Particle = new Particle(random(720), random(480), random(100/(ballNumber/4)));
        particleArray.push(newParticle);
      }
      else {
        let newParticle: Particle = new Particle(0, 0, 0);
        particleArray.push(newParticle);
      }
    }
  }

  strengthSlider.oninput = function () {
    constantSlider =5- parseFloat(strengthSlider.value);
    console.log(strengthSlider.value);
  }


  particleArray.length = 0;
  for (let index = 0; index < 200; index++) {
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
  //console.log(frameRate());
  // CLEAR BACKGROUND

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

  shader(shaderVariable);
  rect(0, 0, width, height);

  const particleX: number[] = [];
  const particleY: number[] = [];
  const particleStrength: number[] = [];

  particleArray.forEach(element => {
    particleX.push(element.x);
    particleY.push(element.y);
    particleStrength.push(element.strength);
  });
  

  shaderVariable.setUniform("resolution", [width, height]);
  shaderVariable.setUniform("mouse", [mouseX, mouseY]);
  shaderVariable.setUniform("particleX", particleX);
  shaderVariable.setUniform("particleY", particleY);
  shaderVariable.setUniform("particleStrength", particleStrength);
  shaderVariable.setUniform("strengthConstant", constantSlider);
  // background(255,125,0);
  // for(let i=0;i<windowWidth/squareSize;i++){
  //   for(let j=0;j<windowHeight/squareSize;j++){
  //     let addedValue=0;
      
  //     particleArray.forEach(element => {
  //       addedValue+=(1/dist(i*squareSize,j*squareSize,element.x,element.y))*element.strength;
  //     });

  //     addedValue+=1/dist(i*squareSize,j*squareSize,mouseX,mouseY)*10;

  //     if(addedValue*constantSlider>100)
  //     fill(255-addedValue*constantSlider*2,255,255);
  //     else fill(0);

  //     rect(i*squareSize,j*squareSize,squareSize,squareSize);
  //   }
  // }
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  setupFunction();
}
