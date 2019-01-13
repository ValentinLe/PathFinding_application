
let b = new Board(50,26);
let ia = new AStar(b,0);
let changeTarget = false;
let pathDraw = false;

function setup() {
  createCanvas(screen.width, screen.height);
}

function draw() {
  let tileSize = findTileSize();
  background(0);
  if (mouseIsPressed) {
    mousePressed(tileSize);
  }
  paintGrid(tileSize);
}

function paintGrid(tileSize) {
  for (let j = 0; j < b.getHeight(); j++) {
    for (let i = 0; i < b.getWidth(); i++) {
      let tile = b.getTileAt(i, j);
      paintTile(tile, tileSize);
    }
  }
}

function paintTile(tile, tileSize) {
  let x = tile.getX();
  let y = tile.getY();
  if (b.isTarget(tile) && b.initTile && b.initTile.equals(tile)) {
    fill(76, 175, 80); // green
  } else if (b.isTarget(tile) && b.goalTile && b.goalTile.equals(tile)) {
    fill(229, 57, 53); // red
  } else if (tile.isWall()) {
    fill(0); // black
  } else {
    if (tile.getState() == 1) {
      fill(129,212,250); // blue
    } else if (tile.getState() == 2) {
      fill(0,145,234); // light blue
    } else if (tile.getState() == 3) {
      fill(255, 238, 88); // yellow
    } else {
      fill(255); // white
    }
  }
  rect(x*tileSize, y*tileSize, tileSize, tileSize);
}

function mousePressed(tileSize) {
  let x = Math.floor(mouseX/tileSize);
  let y = Math.floor(mouseY/tileSize);
  if (b.isInIndex(x, y)) {
    if (b.statesChanged) {
      b.initStates();
      b.statesChanged = false;
      pathDraw = false;
    }
    if (mouseButton == LEFT) {
      if (b.targetAt(x, y)) {
        if (!changeTarget) {
          changeTarget = true;
          b.addModificationAt(x, y);
          setTimeout(() => {
            changeTarget = false;
          },200);
        }
      } else {
        if (!changeTarget) {
          b.addModificationAt(x, y);
        }
        if (b.targetAt(x, y)) {
          changeTarget = true;
          setTimeout(() => {
            changeTarget = false;
          },200);
        }
      }
    } else if (mouseButton == RIGHT) {
      b.removeModificationAt(x, y);
    }
  }
}

function keyPressed() {
  if (key == "r") {
    b.initStates();
    pathDraw = false;
  } else if (key == "Delete") {
    b.resetGrid();
    pathDraw = false;
  } else if (key == "Enter") {
    if (b.targetsPlaced()) {
      if (!pathDraw) {
        let solution = ia.solution();
        pathDraw = true;
        if (!solution) {
          showMessage("Solution not found");
        }
      }
    } else {
      showMessage("The algorithm needs two targets")
    }
  } else if (key == "w") {
    if (pathDraw) {
      b.initStates();
      pathDraw = false;
    }
    b.placeRandowWall(0.1);
  } else if (key == "x") {
    if (pathDraw) {
      b.initStates();
      pathDraw = false;
    }
    b.deleteWalls();
  }
}

function findTileSize() {
  let valX = Math.floor(windowWidth/b.getWidth());
  let valY = Math.floor(windowHeight/b.getHeight());
  return Math.min(valX,valY);
}
