
import {Tile} from './model/Tile.js';
import {Board} from './model/Board.js';
import {PriorityQueue} from './util/PriorityQueue.js';
import {AStar} from './model/AStar.js';

window.onload = main;

function main() {
  let b = new Board(10,10);
  console.log(b.toString());
  let tile1 = b.getTileAt(0,0);
  let tile2 = b.getTileAt(9,0);
  let tile3 = b.getTileAt(0,2);
  let tile4 = b.getTileAt(2,1);
  console.log(Tile.manhattanDistance(tile1, tile2));
  console.log(Tile.manhattanDistance(tile1, tile2));

  let prio = new PriorityQueue();
  prio.add(tile3);
  prio.add(tile1);
  prio.add(tile4);
  prio.add(tile2);

  b.getTileAt(4,0).setWall(true);
  b.getTileAt(4,1).setWall(true);
  b.getTileAt(4,2).setWall(true);
  b.getTileAt(4,3).setWall(true);
  b.getTileAt(4,4).setWall(true);

  let aStar = new AStar(b, tile1, tile2);
  let plan = aStar.weightAStar(1,1);
  let x;
  let y;
  for(let i = 0; i<plan.length; i++) {
    x = plan[i].getX();
    y = plan[i].getY();
    b.grid[y][x].setBrowsed(true);
  }
  console.log(b.toString());
}
