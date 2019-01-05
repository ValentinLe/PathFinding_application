
export class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // variable si c'est un obstacle
    this.wall = false;
    this.value = Number.MAX_VALUE;
    this.target = false;
    this.state = 0;
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

  getState() {
    return this.state;
  }

  setState(value) {
    this.state = value;
  }

  isTarget() {
    return this.target;
  }

  setTarget(target) {
    this.target = target;
  }

  switchWall() {
    if (this.isWall()) {
      this.setWall(false);
    } else {
      this.setWall(true);
    }
  }

  equals(o) {
    return this.getX()==o.getX() && this.getY()==o.getY();
  }


  // distance euclidienne entre 2 cases
  distance(o) {
    return Math.sqrt(Math.pow(o.getX() - this.getX(), 2) + Math.pow(o.getY() - this.getY(), 2));
  }

  // distance de manhattan entre 2 cases
  manhattanDistance(o) {
    return Math.abs(o.getY() - this.getY()) + Math.abs(o.getX() - this.getX());
  }

  toStringGrid() {
    if (this.wall) {
      return "#";
    } else if (this.target) {
      return " ";
    } else {
      return "" + (this.state==3 ? "+" : this.state);
    }
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}
