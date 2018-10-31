
export class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // variable si c'est un obstacle
    this.isWall = false;
    this.value = Number.MAX_VALUE;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  isWall() {
    return this.isWall;
  }

  setWall(newState) {
    this.isWall = newState;
  }

  getValue() {
    return this.value;
  }

  setValue(value) {
    this.value = value;
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
    if (this.isWall) {
      return "#";
    } else {
      return ".";
    }
  }
}
