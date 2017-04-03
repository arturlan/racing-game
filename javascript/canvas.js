//canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

//canvas for car
var canvasCar = document.getElementById('canvasCar');
var ctxCar = canvasCar.getContext('2d');

//canvas for enemie
var canvasEnemie = document.getElementById('canvasEnemie');
var ctxEnemy = canvasEnemie.getContext('2d');

//canvas for menu
var canvasMenu = document.getElementById('canvasMenu');
var ctxMenu = canvasMenu.getContext('2d');

//canvas for score
var canvasScore = document.getElementById('canvasScore');
var ctxScore = canvasScore.getContext('2d');
ctxScore.fillStyle = 'hsla(0, 0%, 100%, 0.5)';
ctxScore.font = 'bold 20px Arial';

//canvas background
var sprite = new Image();
sprite.src = 'images/sprite.png';
sprite.addEventListener('load', window.onload, false);

//canvas game over
var canvasGO = document.getElementById('canvasGO');
var ctxGO = canvasGO.getContext('2d');
ctxGO.fillStyle = 'hsla(0, 0%, 100%, 1.0)';
ctxGO.font = 'bold 120px Arial';