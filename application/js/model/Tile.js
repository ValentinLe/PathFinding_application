
export class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // variable si c'est un obstacle
    this.wall = false;
    this.value = Number.MAX_VALUE;
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

  equals(o) {
    return this.getX()==o.getX() && this.getY()==o.getY();
  }

  // distance euclidienne entre 2 cases
  distance(o) {
    return Math.sqrt(Math.pow(o.getX() - this.getX(), 2) + Math.pow(o.getY() - this.getY(), 2));
  }

  // distance de manhattan entre 2 cases
  static manhattanDistance(o) {
    return Math.abs(o.getY() - this.getY()) + Math.abs(o.getX() - this.getX());
  }

  toStringGrid() {
    if (this.wall) {
      return "#";
    } else if (this.browsed) {
      return "+";
    } else {
      return ".";
    }
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}
