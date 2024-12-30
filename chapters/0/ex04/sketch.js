let colorSlider;
let colorStdDevSlider;

function setup() {
  createCanvas(400, 400);
  background(255);
  colorMode(HSB, 100);

  colorSlider = createSlider(0, 100);
  colorSlider.position(10, 10);
  colorSlider.size(80);

  colorStdDevSlider = createSlider(0, 100);
  colorStdDevSlider.position(10, 40);
  colorStdDevSlider.size(80);
}

class PaintPoint {
  constructor() {
    this.x = randomGaussian(width / 2, width / 8);
    this.y = randomGaussian(height / 2, height / 8);
    let myColor = color(
      randomGaussian(colorSlider.value(), colorStdDevSlider.value()),
      100,
      100,
      30
    );
    this.paintColor = myColor;
  }

  show() {
    fill(this.paintColor);
    noStroke();
    circle(this.x, this.y, 10);
  }
}

function draw() {
  let paintBrush = new PaintPoint();
  paintBrush.show();
}
