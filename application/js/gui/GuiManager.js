
import {View} from './View.js';
import {Tile} from '../model/Tile.js';
import {sleep} from '../Main.js';

export class GuiManager {
  constructor(board, ia, canvas) {
    this.board = board;
    this.ia = ia;
    this.canvas = canvas;
    this.moveCost = 1;
    this.weight = 1;
    this.sizeTile = this.findSizeTile(this.canvas.offsetWidth, this.canvas.offsetHeight)
    this.view = new View(this.board, this.canvas, this.sizeTile);
    this.pathDraw = false;
  }

  paintView() {
    this.view.paintGrid();
    if (this.getInitialTile() != null) {
      this.paintTile(this.getInitialTile(), 'green');
    }
    if (this.getGoalTile() != null) {
      this.paintTile(this.getGoalTile(), 'red');
    }
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
    if (newTile != null) {
      this.paintTile(newTile, 'green');
    }
  }

  setGoalTile(newTile) {
    this.ia.setGoalTile(newTile);
    if (newTile != null) {
      this.paintTile(newTile, 'red');
    }
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

  findSolution() {
    let plan = this.ia.weightAStar(this.moveCost, this.weight);
    this.paintView();
    this.pathDraw = true;
    let x;
    let y;
    let tile;
    if (plan != null) {
      for(let i = 1; i<(plan.length-1); i++) {
        x = plan[i].getX();
        y = plan[i].getY();
        tile = this.board.getTileAt(x,y);
        this.paintTile(tile, "cyan");
      }
    } else {
      alert("Euh... What ??");
    }
  }

  setWallTile(tile) {
    this.board.setWallTile(tile);
  }

  clickAt(x, y) {
    let tile = this.board.getTileAt(x,y);
    if (this.pathDraw) {
      this.paintView();
      this.pathDraw = false;
    }
    if (this.getInitialTile() == null) {
      this.setInitialTile(tile);
      return;
    }
    if (this.getGoalTile() == null) {
      this.setGoalTile(tile);
      return;
    }
    if (Tile.is(tile, this.getInitialTile())) {
      this.paintTile(tile, "white");
      this.setInitialTile(null);
      return;
    }
    if (Tile.is(tile, this.getGoalTile())) {
      this.paintTile(tile, "white");
      this.setGoalTile(null);
      return;
    }
    this.setWallTile(tile);
    if (tile.isWall()) {
      this.paintTile(tile, 'black');
    } else {
      this.paintTile(tile, 'white');
    }
  }
}
