//learned from HTML5 game development youtube videos https://www.youtube.com/watch?v=egBpWHbfanI&t=1054s
//globals
var car = new Car();
var isPlaying = false;
var enemies = [];
var createInterval;
var score = 0;
//request animation frame for different browsers
var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
  window.setTimeout(callback, 1000 / 60);
};

//game over sound
var sound = new Audio("sounds/mario.wav"); // buffers automatically when created

// Inits
window.onload = function init() {
  drawMenu();
  document.addEventListener('click', playGame, false);

};

function playGame() {
  drawBg();
  startLoop();
  drawInterval();
  updateScore();
  document.addEventListener('keydown', checkKeyDown, false);
  document.addEventListener('keyup', checkKeyUp, false);

}

//draw menu
function drawMenu() {
  ctx.drawImage(sprite, 1000, 400, canvasWidth, canvasHeight, 0, 0, canvasWidth, canvasHeight);
}

var drawY1 = -5;
var drawY2 = 1600;
function moveBg() {
  x = 0;
  drawY1 += 5;
  drawY2 += 5;
  if (drawY1 >= 1600) {
    drawY1 = -1600;
  } else if (drawY2 >= 1600) {
    drawY2 = -1600;
  }
  drawBg();
}

//draw backgroung
function drawBg() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.drawImage(sprite, 0, 0, canvasWidth, 1600, 0, drawY1, canvasWidth, 1600);
  ctx.drawImage(sprite, 0, 0, canvasWidth, 1600, 0, drawY2, canvasWidth, 1600);
}

//custom functions
Car.prototype.draw = function() {
  clearCar();
  this.updateCoordinates();
  this.checkDirection();
  this.collision();
  ctxCar.drawImage(sprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

Car.prototype.updateCoordinates = function() {
  this.leftX = this.drawX;
  this.rightX = this.drawX + this.width;
  this.topY = this.drawY;
  this.bottomY = this.drawY + this.height;
}

Car.prototype.checkDirection = function() {
  if (this.isUpKey && this.topY > 0) {
    this.drawY -= this.speed;
  }
  if (this.isRightKey && this.rightX < 640) {
    this.drawX += this.speed;
  }
  if (this.isDownKey && this.bottomY < 800) {
    this.drawY += this.speed;
  }
  if (this.isLeftKey && this.leftX > 360) {
    this.drawX -= this.speed;
  }
};

Car.prototype.collision = function() {
  console.log('called');
  for (var i = 0; i < enemies.length; i++) {
    console.log('This enemy Y: ' + enemies[i].drawY);
    console.log('This enemy X: ' + enemies[i].drawX);
    console.log('This car X: ' + this.drawX);
    console.log('This car Y: ' + this.drawY);
    console.log('This car leftX: ' + this.leftX);
    console.log('This car rightX: ' + this.rightX);
    if (this.drawY <= enemies[i].drawY + 150 && this.leftX <= enemies[i].drawX && this.rightX >= enemies[i].drawX) {
      stopLoop();
      gameOver();
      sound.play();
    }
  }
};

Enemy.prototype.draw = function() {
  this.drawY += this.speed;
  // console.log('Enemy Y: ' + this.drawY);
  // console.log('Enemy X: ' + this.drawX);
  ctxEnemy.drawImage(sprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
  this.checkPosition();

};

Enemy.prototype.checkPosition = function() {
  if ((this.drawY + this.height) > 800) {
    this.deleteEnemy();
  }
}

Enemy.prototype.deleteEnemy = function() {
  enemies.splice(enemies.indexOf(this), 1);
}

//main functionality
function createEnemy(number) {
  for (var i = 0; i < number; i++) {
    enemies[enemies.length] = new Enemy();
  }
}

function drawAllEnemies() {
  clearEnemy();
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].draw();
  }
}

function drawInterval() {
  stopDrawInterval();
  createInterval = setInterval(function() {
    createEnemy(1);
  }, 1000);
}

function stopDrawInterval() {
  clearInterval(createInterval);
}

function loop() {
  if (isPlaying) {
    car.draw();
    moveBg();
    drawAllEnemies();
    requestAnimFrame(loop);

    //score
    updateScore();
  }
}

function startLoop() {
  if (!isPlaying) {
    isPlaying = true;
    loop();
  }
}

function stopLoop() {
  isPlaying = false;
}

//clear car
function clearCar() {
  ctxCar.clearRect(0, 0, canvasWidth, canvasHeight);
}

//clear enemie
function clearEnemy() {
  ctxEnemy.clearRect(0, 0, canvasWidth, canvasHeight);
}

//clear menu
function clearMenu() {
  ctxMenu.clearRect(0, 0, canvasWidth, canvasHeight);
}

//update score
function updateScore() {
  ctxScore.clearRect(0, 0, canvasWidth, canvasHeight);
  score += 1;
  ctxScore.fillText('Score: 00' + score, 850, 40);
  if (score > 1000) {
    console.log("the speed is more then 1000");
  }
}

function gameOver() {
  ctxGO.clearRect(0, 0, canvasWidth, canvasHeight);
  ctxGO.fillText('Game Over', 200, 400);
}

//check key function
function checkKeyDown(k) {
  var keyID = (k.keyCode)
    ? k.keyCode
    : k.which;
  if (keyID === 38) {
    car.isUpKey = true;
    k.preventDefault();
  }
  if (keyID === 39) {
    car.isRightKey = true;
    k.preventDefault();
  }
  if (keyID === 40) {
    car.isDownKey = true;
    k.preventDefault();
  }
  if (keyID === 37) {
    car.isLeftKey = true;
    k.preventDefault();
  }
}

function checkKeyUp(k) {
  var keyID = (k.keyCode)
    ? k.keyCode
    : k.which;
  if (keyID === 38) {
    car.isUpKey = false;
    k.preventDefault();
  }
  if (keyID === 39) {
    car.isRightKey = false;
    k.preventDefault();
  }
  if (keyID === 40) {
    car.isDownKey = false;
    k.preventDefault();
  }
  if (keyID === 37) {
    car.isLeftKey = false;
    k.preventDefault();
  }
}
