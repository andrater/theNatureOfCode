setup = () => {
  createCanvas(400, 400);
  background(255);
};

class Walker {
  constructor() {
    this.x = 200;
    this.y = 200;
  }

  step() {
    let randNumX = random(-1, 1);
    let randNumY = random(-1, 1.1);
    //print(randNum)
    this.x += randNumX;
    this.y += randNumY;
  }

  show() {
    stroke(random(255));
    point(this.x, this.y);
  }
}

let walker = new Walker();

draw = () => {
  walker.step();
  walker.show();
};
