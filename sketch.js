let x = 0;
let y = 0;
let space;
let doneWithLine = false;
let lineSize;
let randNum;

function setup() {
  // createCanvas(2560, 1664);
  createCanvas(800, 800);
  fill(0);

  rectMode(CENTER);

  space = 40;
  lineSize = 40;
  colorMode(HSB)

  pixelDensity(1);
  mask = createGraphics(width, height);
  pattern = createGraphics(width, height);
  mask.pixelDensity(1);
  pattern.pixelDensity(1);
  pattern.loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      index = (x + y * width) * 4;
      pattern.pixels[index + 0] = map(x, 0, width, 0, 255, true);
      pattern.pixels[index + 1] = 0;
      pattern.pixels[index + 2] = map(y, 0, height, 0, 255, true);
      pattern.pixels[index + 3] = 255;

    }
  }
  pattern.updatePixels();

  mask.background(255);
  mask.stroke(0);
  mask.strokeWeight(2);
  for (x = 0; x < width + space; x += space) {
    for (y = 0; y < height + space; y += space) {
      // line(x, y, x + space, y);
      // line(x, y, x, y + space);
      // square(x, y, 10)
      // square(x+space/2, y+space/2, 10)
      // stroke(floor(random(2))*255);
      randNum = random(2);
      if (randNum <= 1) {
        // stroke(30);
        mask.line(x, y, x + lineSize, y + lineSize);
      } else {
        // stroke(255);
        mask.line(x, y + lineSize, x + lineSize, y);
      }
      // stroke('#F00');
      // point(x, y);

    }
  }

  mask.loadPixels();
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      index = (x + y * width) * 4;
      if (mask.pixels[index + 0] > 0 || mask.pixels[index + 1] > 0 || mask.pixels[index + 2] > 0) {
        mask.pixels[index + 3] = 0;
      } else {
        mask.pixels[index + 3] = 255;
      }
    }
  }
  mask.updatePixels();

  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      index = (x + y * width) * 4;
      pattern.pixels[index + 3] = mask.pixels[index + 3];
    }
  }
  pattern.updatePixels();
  image(pattern, 0, 0);
  image(mask, 0, 0);


  // saveCanvas('gradient-background2.jpg');
  frameRate(2);
}

function draw() {
  if (x < width + space && y < height + space) {
    randNum = random(2);
    if (randNum <= 1) {
      line(x, y, x + space, y + space);
    } else {
      line(x, y + space, x + space, y);
    }
    stroke('#00F');
    point(x, y);
    stroke(0);
  }
  y += space;
  if (y == height + space) {
    x += space;
    y = 0;
  }

}
