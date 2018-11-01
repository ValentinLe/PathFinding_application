
import {View} from './View.js';
import {Tile} from '../model/Tile.js';

export class GuiManager {
  constructor(board, ia, canvas) {
    this.board = board;
    this.ia = ia;
    this.canvas = canvas;
    this.moveCost = 1;
    this.weight = 1;
    this.sizeTile = this.findSizeTile(this.canvas.offsetWidth, this.canvas.offsetHeight)
    this.view = new View(this.board, this.canvas, this.sizeTile);
    this.paintTile(this.ia.getInitialTile(), 'green');
    this.paintTile(this.ia.getGoalTile(), 'red');
  }

  paintView() {
    this.view.paintGrid();
  }

  paintTile(tile, color) {
    this.view.paintTile(tile, color);
  }

  getInitialTile() {
    return this.ia.getInitialTile();
  }

  getGoalTile() {
    return this.ia.getGoalTile();
  }

  setInitialTile(newTile) {
    this.ia.setInitialTile(newTile);
  }

  setGoalTile(newTile) {
    this.ia.setGoalTile(newTile);
  }

  findSizeTile(width, height) {
    let x = Math.floor(width/this.board.getWidth());
    let y = Math.floor(height/this.board.getHeight());
    return Math.min(x, y);
  }

  getSizeTile() {
    return this.sizeTile;
  }

  isInIndex(x, y) {
    return this.board.isInIndex(x, y);
  }

  getSolution() {
    return this.ia.weightAStar(this.moveCost, this.weight);
  }

  setWallTile(tile) {
    this.board.setWallTile(tile);
  }

  clickAt(x, y) {
    let tile = this.board.getTileAt(x,y);
    this.setWallTile(tile);
    console.log(this.board.toString());
    if (tile.isWall()) {
      this.paintTile(tile, 'black');
    } else {
      this.paintTile(tile, 'white');
    }
  }
}
