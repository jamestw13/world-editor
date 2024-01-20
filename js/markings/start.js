class Start extends Marking {
  constructor(center, directionVector, width, height) {
    super(center, directionVector, width, height);

    this.type = 'start';

    this.img = new Image();
    this.img.src = 'car.png';
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.center.x, this.center.y);
    ctx.rotate(angle(this.directionVector) - Math.PI / 2);

    ctx.drawImage(this.img, -this.width / 2, -this.height / 2);

    ctx.restore();
  }
}
