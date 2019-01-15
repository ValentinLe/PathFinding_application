
let b = new Board(50,26);
let ia = new AStar(b,0);
let changeTarget = false;
let pathDraw = false;
let tileSize = 30;

function setup() {
  createCanvas(screen.width, screen.height);
  b.setWidth(findWidthBoard());
  b.setHeight(findHeightBoard());
}

function draw() {
  background(0);
  b.setWidth(findWidthBoard());
  b.setHeight(findHeightBoard());
  if (mouseIsPressed) {
    mousePressed();
  }
  paintGrid();
}

function paintGrid() {
  for (let j = 0; j < b.getHeight(); j++) {
    for (let i = 0; i < b.getWidth(); i++) {
      let tile = b.getTileAt(i, j);
      paintTile(tile);
    }
  }
}

function paintTile(tile) {
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

function mousePressed() {
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

function mouseWheel(event) {
  addTileSize(event.delta);
}

function addTileSize(number) {
  let minSize = 20;
  let maxSize = 50;
  if (tileSize + number < minSize) {
    tileSize = minSize;
  } else if (tileSize + number > maxSize) {
    tileSize = maxSize;
  } else {
    tileSize += number;
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

function findWidthBoard() {
  return Math.floor(windowWidth/tileSize) + 1;
}

function findHeightBoard() {
  return Math.floor(windowHeight/tileSize) + 1;
}
