//Object of the car
function Car() {
	this.srcX = 1000;
	this.srcY = 0;
	this.drawX = 390; //530
	this.drawY = 500;
	this.width = 80;
	this.height = 150;
	this.speed = 3;

	this.leftX = this.drawX;
	this.rightX = this.drawX + this.width;
	this.topY = this.drawY;
	this.bottomY = this.drawY + this.height;

	this.isUpKey = false;
	this.isDownKey = false;
	this.isRightKey = false;
	this.isLeftKey = false;
}

//Object of the enemie
function Enemy() {
	this.srcX = 1000;
	this.srcY = 200;
	this.drawX = Math.random() < 0.5 ? 390 : 530;
	this.drawY = Math.floor(Math.random() * -300);
	this.width = 80;
	this.height = 150;
	this.speed = 7;
}