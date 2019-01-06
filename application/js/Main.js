
import {Tile} from './model/Tile';
import {Board} from './model/Board';
import {PriorityQueue} from './util/PriorityQueue';
import {AStar} from './model/AStar';

window.onload = main;

function main() {
  let b = new Board(10,10);
  b.modifyTileAt(1,1);
  b.modifyTileAt(1,9);
  b.modifyTileAt(0,8);
  b.modifyTileAt(1,8);
  b.modifyTileAt(2,8);
  b.modifyTileAt(3,8);
  b.modifyTileAt(4,8);
  b.modifyTileAt(5,8);

  console.log(b.initTile);
  console.log(b.goalTile);

  let aStar = new AStar(b);
  if (b.targetsPlaced()) {
    console.log(aStar.weightAStar(1,1));
  }

  console.log(b.toString());
}
