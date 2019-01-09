
let b = new Board(10,10);
b.addModificationAt(2,2);
b.addModificationAt(5,6);
b.addModificationAt(4,5);
b.addModificationAt(3,5);

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);
  for (let j = 0; j < b.getHeight(); j++) {
    for (let i = 0; i < b.getWidth(); i++) {
      let tile = b.getTileAt(i, j);
      if (b.isTarget(tile) && b.initTile && b.initTile.equals(tile)) {
        fill(125,20,150);
      } else if (b.isTarget(tile) && b.goalTile && b.goalTile.equals(tile)) {
        fill(200,150,20);
      } else if (tile.isWall()) {
        fill(0);
      }
      ellipse(30 + i*60, 30 + j*60, 60, 60);
      fill(255);
    }
  }
}
