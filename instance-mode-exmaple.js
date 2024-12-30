const s = (p5) => {
  p5.setup = () => {
    p5.createCanvas(400, 400);
    p5.background(255);
  };

  class Walker {
    constructor() {
      this.x = 200;
      this.y = 200;
    }

    step() {
      let randNumX = p5.random(-1, 1);
      let randNumY = p5.random(-1, 1.1);
      //print(randNum)
      this.x += randNumX;
      this.y += randNumY;
    }

    show() {
      p5.stroke(p5.random(255));
      p5.point(this.x, this.y);
    }
  }

  let walker = new Walker();

  p5.draw = () => {
    walker.step();
    walker.show();
  };
};

let myp5 = new p5(s, document.getElementById("ex0.1"));
