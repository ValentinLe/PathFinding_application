
import {PriorityQueue} from '../util/PriorityQueue.js';
import {Tile} from './Tile.js';

export class AStar {
  constructor(board, initialTile, goalTile) {
    this.board = board;
    this.initialTile = initialTile;
    this.goalTile = goalTile;
  }

  weightAStar(moveCost, weight) {
    let open = new PriorityQueue();
    open.add(this.initialTile);
    let distance = {}; // tile : int
    this.initialTile.setValue(0);
    distance[this.initialTile] = 0;
    let father = {}; // tile : tile
    father[this.initialTile] = null;
    while (!open.isEmpty()) {
      let tile = open.remove();
      if (Tile.is(tile, this.goalTile)) {
        return this.getPlan(father, tile);
      } else {
        let neighbors = this.board.consvois(tile.getX(), tile.getY(), 1, false);
        for (let i = 0; i<neighbors.length; i++) {
          let next = neighbors[i];
          if (!(this.tileInMap(distance, next))) {
            distance[next] = Number.MAX_VALUE;
          }
          if (distance[next] < distance[tile] + moveCost) {
            distance[next] = distance[tile] + moveCost;
            next.setValue(distance[next] + weight * Tile.distance(next, this.goalTile));
            father[next] = tile;
            open.add(next);
          }
        }
      }
    }
    return null;
  }

  tileInMap(map, tile) {
    console.log(map);
    for(let keyTile in map) {
      console.log(keyTile.getX() + " " + keyTile.getY());
      if (Tile.is(tile, tile)) {
        return true;
      }
    }
    return false;
  }

  getPlan(father, goal) {
    let plan = [];
    while (goal != null) {
      plan.push(goal);
      goal = father[goal];
    }
    return plan;
  }
}
