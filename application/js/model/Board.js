
import {Tile} from './Tile.js';

export class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Board.initGrid(width, height);
  }

  static initGrid(width, height) {
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

  getTileAt(x, y) {
    return this.grid[y][x];
  }

  setWallTile(tile) {
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
        if ((i==x || j==y) && this.isInIndex(i,j)) {
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
        ch += this.grid[j][i].toString() + " ";
      }
      ch += "\n";
    }
    return ch;
  }

}
