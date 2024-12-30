function setup() {
  createCanvas(400, 400);
  background(255);
}

class Walker {
  constructor() {
    this.x = 200;
    this.y = 200;
  }

  getMouseDirection() {
    //moveX closer to mouse
    if (mouseX < this.x) {
      this.x -= random(1);
    } else {
      this.x += random(1);
    }

    //moveY closer to mouse
    if (mouseY < this.y) {
      this.y -= random(1);
    } else {
      this.y += random(1);
    }
  }

  step() {
    let randNumX = random(-1, 1);
    let randNumY = random(-1, 1);
    let mouseBias = random(1);
    print(mouseBias);
    if (mouseBias < 0.5) {
      this.getMouseDirection();
    }
    this.x += randNumX;
    this.y += randNumY;
  }

  show() {
    stroke(random(255));
    point(this.x, this.y);
  }
}

let walker = new Walker();

function draw() {
  print(mouseX);
  print(mouseY);
  walker.step();
  walker.show();
}
