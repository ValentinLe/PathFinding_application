
import {Tile} from './model/Tile.js';
import {Board} from './model/Board.js';
import {PriorityQueue} from './util/PriorityQueue.js';
import {AStar} from './model/AStar.js';
import {View} from './gui/View.js';

window.onload = main;

function main() {
  let b = new Board(10,10);
  b.getTileAt(4,0).setWall(true);
  b.getTileAt(4,1).setWall(true);
  b.getTileAt(4,2).setWall(true);
  b.getTileAt(4,3).setWall(true);
  b.getTileAt(4,4).setWall(true);
  //console.log(b.toString());
  let tile1 = b.getTileAt(0,0);
  let tile2 = b.getTileAt(9,0);
  let tile3 = b.getTileAt(0,2);
  let tile4 = b.getTileAt(2,1);

  let aStar = new AStar(b, tile1, tile2);
  let plan = aStar.weightAStar(1,1);
  let x;
  let y;
  for(let i = 0; i<plan.length; i++) {
    x = plan[i].getX();
    y = plan[i].getY();
    b.grid[y][x].setBrowsed(true);
  }
  //console.log(b.toString());
  let html = document.getElementsByTagName("html")[0];
  let widthWin = window.innerWidth-13;
  let heightWin = window.innerHeight-13;
  let canvas = document.getElementById("canvas");
  canvas.setAttribute("width", widthWin + "px");
  canvas.setAttribute("height", heightWin + "px");
  let view = new View(canvas, b);
  view.paintGrid();

}
