
import {Tile} from './model/Tile.js';
import {Board} from './model/Board.js';
import {PriorityQueue} from './util/PriorityQueue.js';
import {AStar} from './model/AStar.js';
import {GuiManager} from './gui/GuiManager.js';

window.onload = main;

let gui;

function main() {
  let b = new Board(10,10);
  b.getTileAt(4,0).setWall(true);
  b.getTileAt(4,1).setWall(true);
  b.getTileAt(4,2).setWall(true);
  b.getTileAt(4,3).setWall(true);
  b.getTileAt(4,4).setWall(true);

  b.getTileAt(8,0).setWall(true);
  b.getTileAt(8,1).setWall(true);
  b.getTileAt(8,2).setWall(true);
  b.getTileAt(8,3).setWall(true);
  b.getTileAt(8,4).setWall(true);
  b.getTileAt(8,5).setWall(true);
  b.getTileAt(8,6).setWall(true);
  b.getTileAt(8,7).setWall(true);
  b.getTileAt(8,8).setWall(true);
  //console.log(b.toString());
  let tile1 = b.getTileAt(0,0);
  let tile2 = b.getTileAt(9,0);

  let aStar = new AStar(b, tile1, tile2);

  //console.log(b.toString());
  let widthWin = window.innerWidth-13;
  let heightWin = window.innerHeight-13;
  let canvas = document.getElementById("canvas");
  canvas.setAttribute("width", widthWin + "px");
  canvas.setAttribute("height", heightWin + "px");
  gui = new GuiManager(b, aStar, canvas);
  gui.paintView();
  let plan = gui.getSolution();
  let x;
  let y;
  for(let i = 1; i<(plan.length-1); i++) {
    x = plan[i].getX();
    y = plan[i].getY();
    b.grid[y][x].setBrowsed(true);
    gui.paintTile(b.grid[y][x], "cyan");
  }

  canvas.addEventListener('click', function (e) {
    clickOnCanvas(e);
  });

}

function clickOnCanvas(e) {
  let x = Math.floor(e.clientX/gui.getSizeTile());
  let y = Math.floor(e.clientY/gui.getSizeTile());
  if (gui.isInIndex(x,y)) {
    gui.clickAt(x,y);
  }
}
