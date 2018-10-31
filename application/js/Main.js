
import {Tile} from './model/Tile.js';
import {Board} from './model/Board.js';
import {PriorityQueue} from './util/PriorityQueue.js';

window.onload = main;

function main() {
  let b = new Board(4,5);
  console.log(b.toString());
  let tile1 = b.getTileAt(1,2);
  let tile2 = b.getTileAt(3,4);
  let tile3 = b.getTileAt(0,2);
  let tile4 = b.getTileAt(2,1);
  console.log(Tile.manhattanDistance(tile1, tile2));
  console.log(Tile.manhattanDistance(tile1, tile2));

  let prio = new PriorityQueue();
  tile1.value = 1;
  tile2.value = 3;
  tile3.value = 2;
  tile4.value = 0;
  prio.add(tile3);
  prio.add(tile1);
  prio.add(tile4);
  prio.add(tile2);
  console.log(prio.queue);
}
