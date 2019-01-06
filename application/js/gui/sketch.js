
function setup() {
  createCanvas(400,400);
}

function draw() {
  background(0);
  for (let j = 0; j < 10; j++) {
    for (let i = 0; i < 10; i++) {
      ellipse(i*10, j*10, 10, 10);
    }
  }
}
