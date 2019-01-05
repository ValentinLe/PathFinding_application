
import {Tile} from './model/Tile.js';
import {Board} from './model/Board.js';
import {PriorityQueue} from './util/PriorityQueue.js';
import {AStar} from './model/AStar.js';

window.onload = main;

function main() {
  let b = new Board(10,10);
  console.log(b.toString());

  let t1 = new Tile(2,2);
  let t2 = new Tile(8,9);
  let t3 = new Tile(2,2);
  console.log(t1.equals(t2));
  console.log(t1.equals(t3));

  b.addTarget(t1);
  b.addTarget(t2);
  console.log(b.targets);

  let aStar = new AStar(b);
  if (b.targetsPlaced()) {
    console.log(aStar.weightAStar(1,1));
  }
}
