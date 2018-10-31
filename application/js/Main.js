
import {Tile} from './model/Tile.js';
import {Board} from './model/Board.js';
import {PriorityQueue} from './util/PriorityQueue.js';
import {AStar} from './model/AStar.js';

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
  b.grid[1][1].setWall(true);
  console.log(b.consvois(0,0,1,true));

  let dict = {};
  dict[tile1] = 0;
  dict[tile2] = 8;
  dict[tile3] = 2;

  console.log(dict);
  console.log(tile2 in dict);

  console.log(b.consvois(0,0,1,false));
  let aStar = new AStar(b, tile1, tile2);
  console.log(aStar.weightAStar(1,1));
}
