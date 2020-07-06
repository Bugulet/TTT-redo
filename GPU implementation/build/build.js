var ColorHelper = (function () {
    function ColorHelper() {
    }
    ColorHelper.getColorVector = function (c) {
        return createVector(red(c), green(c), blue(c));
    };
    ColorHelper.rainbowColorBase = function () {
        return [
            color('red'),
            color('orange'),
            color('yellow'),
            color('green'),
            color(38, 58, 150),
            color('indigo'),
            color('violet')
        ];
    };
    ColorHelper.getColorsArray = function (total, baseColorArray) {
        var _this = this;
        if (baseColorArray === void 0) { baseColorArray = null; }
        if (baseColorArray == null) {
            baseColorArray = ColorHelper.rainbowColorBase();
        }
        var rainbowColors = baseColorArray.map(function (x) { return _this.getColorVector(x); });
        ;
        var colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    };
    ColorHelper.getColorByPercentage = function (firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    };
    return ColorHelper;
}());
var Particle = (function () {
    function Particle(_x, _y, _strength) {
        this._x = 0;
        this._y = 0;
        this._strength = 1;
        this._x = _x;
        this._y = _y;
        this._strength = _strength;
    }
    Object.defineProperty(Particle.prototype, "x", {
        get: function () {
            return this._x;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "y", {
        get: function () {
            return this._y;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Particle.prototype, "strength", {
        get: function () {
            return this._strength;
        },
        enumerable: true,
        configurable: true
    });
    return Particle;
}());
var squareSize = 5;
var particleArray = [];
var constantSlider = 2;
var ballNumber = 10;
var shaderVariable;
var strengthSlider;
function preload() {
    shaderVariable = loadShader("build/uniform.vert", "build/uniform.frag");
}
function setupFunction() {
    colorMode(HSB);
    var canvasConst = createCanvas(720, 480, WEBGL);
    canvasConst.parent("sketchHolder");
    strengthSlider = document.getElementById("strengthConstant");
    var squareSlider = document.getElementById("sizeConstant");
    var ballNumberSlider = document.getElementById("numberOfBallsConstant");
    ballNumberSlider.oninput = function () {
        ballNumber = parseInt(ballNumberSlider.value);
        particleArray.length = 0;
        for (var index = 0; index < 200; index++) {
            if (index < ballNumber) {
                var newParticle = new Particle(random(720), random(480), random(100 / (ballNumber / 4)));
                particleArray.push(newParticle);
            }
            else {
                var newParticle = new Particle(0, 0, 0);
                particleArray.push(newParticle);
            }
        }
    };
    strengthSlider.oninput = function () {
        constantSlider = 5 - parseFloat(strengthSlider.value);
        console.log(strengthSlider.value);
    };
    particleArray.length = 0;
    for (var index = 0; index < 200; index++) {
        if (index < ballNumber) {
            var newParticle = new Particle(random(720), random(480), random(30));
            particleArray.push(newParticle);
        }
    }
    console.log("🚀 - Setup initialized - P5 is running");
    noStroke();
}
function setup() {
    setupFunction();
}
var frameCounter = 0;
var frameSum = 0;
function draw() {
    {
        frameCounter++;
        frameSum += frameRate();
        var frames_1 = Math.floor(frameSum / frameCounter);
        if (frameCounter > 10) {
            document.getElementById("frameRate").innerText = "Framerate: " + frames_1;
            frameSum = 0;
            frameCounter = 0;
        }
        document.getElementById("objectNumber").innerText = "Number of objects: " + ballNumber;
    }
    shader(shaderVariable);
    rect(0, 0, width, height);
    var particleX = [];
    var particleY = [];
    var particleStrength = [];
    particleArray.forEach(function (element) {
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
}
function windowResized() {
    setupFunction();
}
//# sourceMappingURL=build.js.map