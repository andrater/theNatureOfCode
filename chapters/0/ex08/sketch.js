function setup() {
  createCanvas(400, 400);
  background(255);
}

class Walker {
  constructor() {
    this.xoff = 0;
    this.yoff = 10000;
    this.x = 200;
    this.y = 200;
  }

  step() {
    let stepMin = -5;
    let stepMax = 5;
    let stepX = map(noise(this.xoff), 0, 1, stepMin, stepMax);
    let stepY = map(noise(this.yoff), 0, 1, stepMin, stepMax);
    this.xoff += 1;
    this.yoff += 1;
    this.x += stepX;
    this.y += stepY;
  }

  show() {
    stroke(random(255));
    circle(this.x, this.y, 10);
    //point(this.x, this.y)
  }
}

let walker = new Walker();

function draw() {
  walker.step();
  walker.show();
}
