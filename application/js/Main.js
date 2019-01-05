
import {Tile} from './model/Tile.js';
import {Board} from './model/Board.js';
import {PriorityQueue} from './util/PriorityQueue.js';
import {AStar} from './model/AStar.js';

window.onload = main;

function main() {
  let b = new Board(10,10);
  b.modifyTileAt(1,1);
  b.modifyTileAt(4,9);
  b.modifyTileAt(4,8);

  console.log(b.targets);

  let aStar = new AStar(b);
  if (b.targetsPlaced()) {
    console.log(aStar.weightAStar(1,1));
  }
  console.log(b.toString());
}
