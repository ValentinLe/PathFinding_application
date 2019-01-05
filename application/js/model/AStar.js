
import {PriorityQueue} from '../util/PriorityQueue.js';

export class AStar {
  constructor(board) {
    this.board = board;
    this.initTile = board.getInitTile();
    this.goalTile = board.getGoalTile();
  }

  weightAStar(moveCost, weight) {
    let open = new PriorityQueue();
    open.add(this.initTile);
    let distance = new Map(); // tile : int
    this.initTile.setValue(0);
    distance.set(this.initTile, 0);
    let father = new Map(); // tile : tile
    father.set(this.initTile, null);
    while (!open.isEmpty()) {
      let tile = open.remove();
      tile.setState(2);
      if (tile.equals(this.goalTile)) {
        return this.getPlan(father, tile);
      } else {
        let neighbors = this.board.consvois(tile.getX(), tile.getY(), 1, false);
        for (let i = 0; i<neighbors.length; i++) {
          let next = neighbors[i];
          if (!(this.tileInMap(distance, next))) {
            next.setState(1);
            distance.set(next, Number.MAX_VALUE);
          }
          if (distance.get(next) > distance.get(tile) + moveCost) {
            distance.set(next, distance.get(tile) + moveCost);
            next.setValue(distance.get(next) + weight * next.distance(this.goalTile));
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
      if (tile.equals(keyTile)) {
        return true;
      }
    }
    return false;
  }

  getPlan(father, goal) {
    let plan = [];
    while (goal != null) {
      plan.push(goal);
      goal.setState(3);
      goal = father.get(goal);
    }
    plan.reverse();
    return plan;
  }
}
