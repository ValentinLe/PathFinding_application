
let b = new Board(20,10);
let ia = new AStar(b,0);
let changeTarget = false;

function setup() {
  createCanvas(screen.width, screen.height);
}

function draw() {
  let tileSize = findTileSize();
  background(0);
  if (mouseIsPressed) {
    let x = Math.floor(mouseX/tileSize);
    let y = Math.floor(mouseY/tileSize);
    if (b.isInIndex(x, y)) {
      if (b.statesChanged) {
        b.initStates();
        b.statesChanged = false;
      }
      if (mouseButton == LEFT) {
        if (b.targetInPosition(x, y)) {
          if (!changeTarget) {
            changeTarget = true;
            b.addModificationAt(x, y);
            setTimeout(() => {
              changeTarget = false;
            },100);
          }
        } else {
          b.addModificationAt(x, y);
        }
      } else if (mouseButton == RIGHT) {
        b.removeModificationAt(x, y);
      }
    }
  }
  for (let j = 0; j < b.getHeight(); j++) {
    for (let i = 0; i < b.getWidth(); i++) {
      let tile = b.getTileAt(i, j);
      if (b.isTarget(tile) && b.initTile && b.initTile.equals(tile)) {
        fill(76, 175, 80);
      } else if (b.isTarget(tile) && b.goalTile && b.goalTile.equals(tile)) {
        fill(229, 57, 53);
      } else if (tile.isWall()) {
        fill(0);
      } else {
        if (tile.getState() == 1) {
          fill(129,212,250);
        } else if (tile.getState() == 2) {
          fill(0,145,234);
        } else if (tile.getState() == 3) {
          fill(255, 238, 88);
        } else {
          fill(255);
        }
      }
      rect(i*tileSize, j*tileSize, tileSize, tileSize);
      fill(255);
    }
  }
}

function keyPressed() {
  if (key == "r") {
    b.initStates();
  } else if (key == "Delete") {
    b.resetGrid();
  } else if (key == "Enter") {
    if (b.targetsPlaced()) {
      let solution = ia.weightAStar(1,1);
      if (!solution) {
        showMessage("No solution found");
      }
    } else {
      showMessage("The algorithm needs two targets")
    }
  }
}

function findTileSize() {
  let valX = Math.round(windowWidth/b.getWidth());
  let valY = Math.round(windowHeight/b.getHeight());
  return Math.min(valX,valY);
}
