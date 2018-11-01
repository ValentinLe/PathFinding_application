
import {View} from './View.js';

export class GuiManager {
  constructor(board, ia, canvas) {
    this.board = board;
    this.ia = ia;
    this.canvas = canvas;
    this.view = new View(this.board, this.canvas);
    this.moveCost = 1;
    this.weight = 1;
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

  getSolution() {
    return this.ia.weightAStar(this.moveCost, this.weight);
  }
}
