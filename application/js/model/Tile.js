
export class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // variable si c'est un obstacle
    this.wall = false;
    this.value = Number.MAX_VALUE;
    this.browsed = false;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  isWall() {
    return this.wall;
  }

  setWall(newState) {
    this.wall = newState;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
  }

  getBrowsed() {
    return this.browsed;
  }

  setBrowsed(newState) {
    this.browsed = newState;
  }

  static is(tile1, tile2) {
    return tile1.getX()==tile2.getX() && tile1.getY()==tile2.getY();
  }

  // distance euclidienne entre 2 cases
  static distance(tile1, tile2) {
    return Math.sqrt(Math.pow(tile2.getX() - tile1.getX(), 2) + Math.pow(tile2.getY() - tile1.getY(), 2));
  }

  // distance de manhattan entre 2 cases
  static manhattanDistance(tile1, tile2) {
    return Math.abs(tile2.getY() - tile1.getY()) + Math.abs(tile2.getX() - tile1.getX());
  }

  toString() {
    if (this.wall) {
      return "#";
    } else if (this.browsed) {
      return "+";
    } else {
      return ".";
    }
  }
}
