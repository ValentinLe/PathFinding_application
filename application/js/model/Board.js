
import {Tile} from './Tile.js';

export class Board {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = this.initGrid(width, height);
    this.initTile = null;
    this.goalTile = null;
  }

  getWidth() {
    return this.width;
  }

  setWidth(width) {
    this.width = width;
  }

  getHeight() {
    return this.height;
  }

  setHeight(height) {
    this.height = height;
  }

  getInitTile() {
    return this.initTile;
  }

  getGoalTile() {
    return this.goalTile;
  }

  initGrid(width, height) {
    let newGrid = [];
    for (let j = 0; j < height; j++) {
      newGrid[j] = [];
      for (let i = 0; i < width; i++) {
        newGrid[j][i] = new Tile(i,j);
      }
    }
    return newGrid;
  }

  initStates() {
    let tile;
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        tile = this.getTileAt(i, j);
        tile.setState(0);
      }
    }
  }

  getTileAt(x, y) {
    return this.grid[y][x];
  }

  modifyTileAt(x, y) {
    let tile = this.getTileAt(x, y);
    if (!this.targetsPlaced()) {
      // si au moins un des objectifs n'est pas place
      this.addTarget(tile);
    } else if (this.isTarget(tile)) {
      // si la tile est un objectfs
      this.removeTarget(tile);
    } else {
      // place un mur
      tile.switchWall();
    }
  }

  addTarget(tile) {
    if (this.initTile == null) {
      this.initTile = tile;
    } else if (this.goalTile == null) {
      this.goalTile = tile;
    }
    tile.setWall(false);
    tile.setTarget(true);
  }

  removeTarget(tile) {
    if (this.initTile != null && tile.equals(this.initTile)) {
      this.initTile = null;
    } else if (this.goalTile != null && tile.equals(this.goalTile)) {
      this.goalTile = null;
    }
    tile.setTarget(false);
  }

  isTarget(tile) {
    return tile.equals(this.initTile) || tile.equals(this.goalTile);
  }

  targetsPlaced() {
    return this.initTile && this.goalTile;
  }

  isInIndex(x, y) {
    return 0 <= x && x<this.width && 0 <=y && y<this.height;
  }

  // recupere les voisins dans la portée range de la case (x,y), si withWall = true
  // alors on a tous les voisins sinon on a que les voisins qui ne sont pas des murs
  consvois(x, y, range, withWall) {
    let neighbors = [];
    for (let j = y-range; j<(y + range + 1); j++) {
      for (let i = x-range; i<(x + range + 1); i++) {
        if (this.isInIndex(i,j)) {
          let tile = this.grid[j][i];
          if (x != i && y != j && withWall || !tile.isWall()) {
            neighbors.push(tile);
          }
        }
      }
    }
    return neighbors;
  }

  toString() {
    let ch = "   ";
    for (let k = 0; k<this.width; k++) {
      // numerotation superieur
      ch += k + " ";
    }
    ch += "\n\n";
    for (let j = 0; j < this.height; j++) {
      ch += j + "  "; // numerotation du coté
      for (let i = 0; i < this.width; i++) {
        ch += this.grid[j][i].toStringGrid() + " ";
      }
      ch += "\n";
    }
    return ch;
  }

}
