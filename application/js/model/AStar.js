
import {PriorityQueue} from '../util/PriorityQueue.js';
import {Tile} from './Tile.js';

export class AStar {
  constructor(board, initialTile, goalTile) {
    this.board = board;
    this.initialTile = initialTile;
    this.goalTile = goalTile;
  }

  getInitialTile() {
    return this.initialTile;
  }

  getGoalTile() {
    return this.goalTile;
  }

  setInitialTile(newTile) {
    this.initialTile = newTile;
  }

  setGoalTile(newTile) {
    this.goalTile = newTile;
  }

  weightAStar(moveCost, weight) {
    let open = new PriorityQueue();
    open.add(this.initialTile);
    let distance = new Map(); // tile : int
    this.initialTile.setValue(0);
    distance.set(this.initialTile, 0);
    let father = new Map(); // tile : tile
    father.set(this.initialTile, null);
    while (!open.isEmpty()) {
      let tile = open.remove();
      if (Tile.is(tile, this.goalTile)) {
        return this.getPlan(father, tile);
      } else {
        let neighbors = this.board.consvois(tile.getX(), tile.getY(), 1, false);
        for (let i = 0; i<neighbors.length; i++) {
          let next = neighbors[i];
          if (!(this.tileInMap(distance, next))) {
            distance.set(next, Number.MAX_VALUE);
          }
          if (distance.get(next) > distance.get(tile) + moveCost) {
            distance.set(next, distance.get(tile) + moveCost);
            next.setValue(distance.get(next) + weight * Tile.distance(next, this.goalTile));
            father.set(next, tile);
            open.add(next);
          }
        }
      }
    }
    return null;
  }

  tileInMap(map, tile) {
    for(let keyTile of map.keys()) {
      if (Tile.is(tile, keyTile)) {
        return true;
      }
    }
    return false;
  }

  getPlan(father, goal) {
    let plan = [];
    while (goal != null) {
      plan.push(goal);
      goal = father.get(goal);
    }
    plan.reverse();
    return plan;
  }
}
