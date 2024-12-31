new p5();

canvasWidth = 400;
canvasHeight = 400;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  background(255);
}

class Walker {
  constructor() {
    this.position = createVector(canvasHeight / 2, canvasHeight / 2);
    console.log(this.position);
    // this.x = this.position.x;
    // this.y = this.position.y;
  }

  getMouseDirection() {
    //moveX closer to mouse
    if (mouseX < this.position.x) {
      this.position.x -= random(1);
    } else {
      this.position.x += random(1);
    }

    //moveY closer to mouse
    if (mouseY < this.position.y) {
      this.position.y -= random(1);
    } else {
      this.position.y += random(1);
    }
  }

  step() {
    let randNumX = random(-1, 1);
    let randNumY = random(-1, 1);
    let mouseBias = random(1);
    //print(mouseBias);
    if (mouseBias < 0.5) {
      this.getMouseDirection();
      //console.log("going towards mouse");
    } else {
      console.log(
        `${this.position.x} + ${randNumX} = ${(this.position.x += randNumX)}`
      );
      this.position.x += randNumX;
      this.position.y += randNumY;
    }

    console.log(`X: ${this.position.x} Y: ${this.position.y}`);
    console.log(`MouseX: ${mouseX}, MouseY: ${mouseY}`);
  }

  show() {
    stroke(100, 100, 100);
    strokeWeight(2);
    point(this.position.x, this.position.y);
  }
}

let walker = new Walker();

function draw() {
  //print(mouseX);
  //print(mouseY);
  walker.step();
  walker.show();
}
