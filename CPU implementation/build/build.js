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
var strengthSlider;
function setupFunction() {
    var canvasConst = createCanvas(720, 480);
    canvasConst.parent("sketchHolder");
    strengthSlider = document.getElementById("strengthConstant");
    var squareSlider = document.getElementById("sizeConstant");
    var ballNumberSlider = document.getElementById("numberOfBallsConstant");
    squareSize = parseInt(squareSlider.value);
    document.getElementById("fragmentNumber").innerText = "Calculations per frame:" + Math.floor((720 / squareSize) * (480 / squareSize) * ballNumber);
    document.getElementById("resolutionNumber").innerText = "Current resolution:" + Math.floor((720 / squareSize)) + " x " + Math.floor(480 / squareSize);
    squareSlider.oninput = function () {
        squareSize = parseInt(squareSlider.value);
        console.log("Squares calculated per frame:", (720 / squareSize) * (480 / squareSize));
        document.getElementById("fragmentNumber").innerText = "Calculations per frame:" + Math.floor((720 / squareSize) * (480 / squareSize) * ballNumber);
        document.getElementById("resolutionNumber").innerText = "Current resolution:" + Math.floor((720 / squareSize)) + " x " + Math.floor(480 / squareSize);
    };
    ballNumberSlider.oninput = function () {
        ballNumber = parseInt(ballNumberSlider.value);
        particleArray.length = 0;
        for (var index = 0; index < 100; index++) {
            if (index < ballNumber) {
                var newParticle = new Particle(random(720), random(480), random(100 / (ballNumber / 4)));
                particleArray.push(newParticle);
            }
            else {
                var newParticle = new Particle(0, 0, 0);
                particleArray.push(newParticle);
            }
        }
        document.getElementById("fragmentNumber").innerText = "Calculations per frame:" + Math.floor((720 / squareSize) * (480 / squareSize) * ballNumber);
    };
    strengthSlider.oninput = function () {
        constantSlider = 5 - parseFloat(strengthSlider.value);
        console.log(strengthSlider.value);
    };
    particleArray.length = 0;
    for (var index = 0; index < 100; index++) {
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
    background(0, 0, 0);
    var _loop_1 = function (i) {
        var _loop_2 = function (j) {
            var addedValue = 0;
            particleArray.forEach(function (element) {
                if (element.x == 0 && element.y == 0)
                    return;
                addedValue += (1 / dist(i * squareSize, j * squareSize, element.x, element.y)) * element.strength * 20 / constantSlider;
            });
            addedValue += (1 / dist(i * squareSize, j * squareSize, mouseX, mouseY)) * 500;
            if (addedValue > 20)
                fill(255, 125, 0);
            else
                fill(0, 0, 0);
            rect(i * squareSize, j * squareSize, squareSize, squareSize);
        };
        for (var j = 0; j < 480 / squareSize; j++) {
            _loop_2(j);
        }
    };
    for (var i = 0; i < 720 / squareSize; i++) {
        _loop_1(i);
    }
}
function windowResized() {
    setupFunction();
}
//# sourceMappingURL=build.js.map