
import {Tile} from './Tile.js';

export class Board {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = this.initGrid(width, height);
    this.initTile = null;
    this.goalTile = null;
    this.targets = [];
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

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getInitTile() {
    return this.initTile;
  }

  getGoalTile() {
    return this.goalTile;
  }

  getTileAt(x, y) {
    return this.grid[y][x];
  }

  modifyTileAt(x, y) {
    let tile = this.getTileAt(x, y);
    if (this.targets.length < 2) {
      this.addTarget(tile);
    } else if (tile.equals(this.initTile) || tile.equals(this.goalTile)) {
        this.removeTarget(tile);
    } else {
      this.switchWallTile(tile);
      console.log(tile.isWall());
    }
  }

  addTarget(tile) {
    if (this.initTile == null) {
      this.initTile = tile;
    } else if (this.goalTile == null) {
      this.goalTile = tile;
    }
    tile.setWall(false);
    this.targets.push(tile);
    tile.objectif = true;
  }

  removeTarget(tile) {
    let i = this.targets.indexOf(tile);
    if (this.initTile != null && tile.equals(this.initTile)) {
      this.initTile = null;
    } else if (this.goalTile != null && tile.equals(this.goalTile)) {
      this.goalTile = null;
    }
    tile.objectif = false;
    this.targets.splice(i, 1);
  }

  targetsPlaced() {
    return this.initTile && this.goalTile;
  }

  switchWallTile(tile) {
    if (tile.isWall()) {
      tile.setWall(false);
    } else {
      tile.setWall(true);
    }
  }

  isInIndex(x, y) {
    return 0<=x && x<this.width && 0<=y && y<this.height;
  }

  // recupere les voisins dans la portée range de la case (x,y), si withWall = true
  // alors on a tous les voisins sinon on a que les voisins qui ne sont pas des murs
  consvois(x, y, range, withWall) {
    let neighbors = [];
    for (let j = y-range; j<(y + range + 1); j++) {
      for (let i = x-range; i<(x + range + 1); i++) {
        if (this.isInIndex(i,j)) {
          let tile = this.grid[j][i];
          if (withWall || !tile.isWall()) {
            neighbors.push(tile);
          }
        }
      }
    }
    return neighbors;
  }

  toString() {
    let ch = "  ";
    for (let k = 0; k<this.width; k++) {
      // numerotation superieur
      ch += k + " ";
    }
    ch += "\n";
    for (let j = 0; j < this.height; j++) {
      ch += j + " "; // numerotation du coté
      for (let i = 0; i < this.width; i++) {
        ch += this.grid[j][i].toStringGrid() + " ";
      }
      ch += "\n";
    }
    return ch;
  }

}
