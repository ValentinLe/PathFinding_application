
import {Tile} from './model/Tile.js';
import {Board} from './model/Board.js';
import {PriorityQueue} from './util/PriorityQueue.js';
import {AStar} from './model/AStar.js';
import {GuiManager} from './gui/GuiManager.js';

window.onload = main;

let gui;

function main() {
  let b = new Board(25,12);
  //console.log(b.toString());

  let aStar = new AStar(b, null, null);

  //console.log(b.toString());
  let widthWin = window.innerWidth-13;
  let heightWin = window.innerHeight-13;
  let canvas = document.getElementById("canvas");
  canvas.setAttribute("width", widthWin + "px");
  canvas.setAttribute("height", heightWin + "px");
  gui = new GuiManager(b, aStar, canvas);
  gui.paintView();

  document.getElementsByTagName("button")[0].addEventListener('click', function (e) {
    findSolution(e);
  });

  canvas.addEventListener('click', function (e) {
    clickOnCanvas(e);
  });

}

export function sleep(millis) {
    var now = Date.now();
    while(Date.now() < now + millis){}
}

function findSolution(e) {
  gui.findSolution();
}

function clickOnCanvas(e) {
  let x = Math.floor(e.clientX/gui.getSizeTile());
  let y = Math.floor(e.clientY/gui.getSizeTile());
  if (gui.isInIndex(x,y)) {
    gui.clickAt(x,y);
  }
}
