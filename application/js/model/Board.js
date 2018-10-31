
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

  getTileAt(x, y) {
    return this.grid[y][x];
  }

  toString() {
    let ch = "";
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        ch += this.grid[j][i].toString() + " ";
      }
      ch += "\n";
    }
    return ch;
  }

}
