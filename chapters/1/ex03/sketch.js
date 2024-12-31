new p5();

canvasWidth = 400;
canvasHeight = 400;

function setup() {
  createCanvas(canvasWidth, canvasHeight, WEBGL);
  background(255);
}

class BoundingBox {
  constructor(width_, height_, depth_) {
    this.width = width_;
    this.height = height_;
    this.depth = depth_;

    //assume position at 0,0,0
    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.xBounds = [this.x - this.width / 2, this.x + this.width / 2];
    this.yBounds = [this.y - this.height / 2, this.y + this.height / 2];
    this.zBounds = [this.z - this.depth / 2, this.z + this.width / 2];
  }

  render() {
    box(this.width, this.height, this.depth);
  }

  renderEdges() {}
}

class BouncyBall {
  constructor(radius_, id_) {
    this.id = id_;
    this.radius = radius_;

    //assume position at 0,0,0
    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.xBounds = [this.x - this.radius, this.x + this.radius];
    this.yBounds = [this.y - this.radius, this.y + this.radius];
    this.zBounds = [this.z - this.radius, this.z + this.radius];

    const initialMovementVector = createVector(
      random(-0.001, 0.001),
      random(-0.001, 0.001),
      random(-0.001, 0.001)
    );
    this.movementVector = initialMovementVector;

    const initialVelocity = createVector(
      random(-1, 1),
      random(-1, 1),
      random(-1, 1)
    );
    //const initialVelocity = createVector(1, 0.5, 0);
    this.velocity = initialVelocity;
    //console.log(this.movementVector);
  }

  render() {
    noFill();
    //this.move();
    sphere(this.radius, 10, 10);
  }

  renderHitbox() {
    push();

    translate(this.xBounds[0], 0, 0);
    rotateY(120);
    plane(this.radius * 2);

    pop();
  }

  update(newPosition_) {
    this.x = newPosition_.x;
    this.y = newPosition_.y;
    this.z = newPosition_.z;

    this.xBounds = [this.x - this.radius, this.x + this.radius];
    this.yBounds = [this.y - this.radius, this.y + this.radius];
    this.zBounds = [this.z - this.radius, this.z + this.radius];
  }

  move() {
    let newPosition = this.movementVector.add(this.velocity);
    //console.log(newPosition);
    this.update(newPosition);
    translate(newPosition);
    this.render();
  }
}

let myBox = new BoundingBox(100, 100, 100);
//let myBall = new BouncyBall(10);
let myBalls = [];
for (let index = 0; index < 1; index++) {
  myBalls.push(new BouncyBall(10, index));
}

function collisionDetection(boundingBox_, balls_) {
  balls_.forEach((ball) => {
    //console.log(ball);
    // console.log(
    //   `Ball Bounds: X:${ball.xBounds},Y:${ball.yBounds},Z:${ball.zBounds}`
    // );
    // console.log(
    //   `Box Bounds: X:${boundingBox_.xBounds},Y:${boundingBox_.yBounds},Z:${boundingBox_.zBounds}`
    // );
    if (ball.xBounds[0] <= boundingBox_.xBounds[0]) {
      console.log(`ball${ball.id} hit X left bound`);
      changeDirection(ball, "x");
    }
    if (ball.xBounds[1] >= boundingBox_.xBounds[1]) {
      console.log(`ball${ball.id} hit X right bound`);
      changeDirection(ball, "x");
    }
    if (ball.yBounds[0] <= boundingBox_.yBounds[0]) {
      console.log(`ball${ball.id} hit Y left bound`);
      changeDirection(ball, "y");
    }
    if (ball.yBounds[1] >= boundingBox_.yBounds[1]) {
      console.log(`ball${ball.id} hit Y right bound`);
      changeDirection(ball, "y");
    }
    if (ball.zBounds[0] <= boundingBox_.zBounds[0]) {
      console.log(`ball${ball.id} hit Z left bound`);
      changeDirection(ball, "z");
    }
    if (ball.zBounds[1] >= boundingBox_.zBounds[1]) {
      console.log(`ball${ball.id} hit Z left bound`);
      changeDirection(ball, "z");
    }
  });
}

function changeDirection(ball_, contactPlane) {
  console.log(contactPlane);
  let updatedVelocity = [0, 0, 0];
  function pickArrVectorPos(contactPlane) {
    switch (contactPlane) {
      case "x":
        updatedVelocity = createVector(
          -ball_.velocity.x,
          ball_.velocity.y,
          ball_.velocity.z
        );
        break;
      case "y":
        updatedVelocity = createVector(
          ball_.velocity.x,
          -ball_.velocity.y,
          ball_.velocity.z
        );
        break;
      case "z":
        updatedVelocity = createVector(
          ball_.velocity.x,
          ball_.velocity.y,
          -ball_.velocity.z
        );
    }
  }

  pickArrVectorPos(contactPlane);

  ball_.velocity = updatedVelocity;
}

function renderAllBalls() {
  myBalls.forEach((ball) => {
    ball.move();
    ball.render();
  });
}

function draw() {
  clear();
  orbitControl();
  myBox.render();
  collisionDetection(myBox, myBalls);
  renderAllBalls();
}
