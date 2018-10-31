
import {PriorityQueue} from '../util/PriorityQueue.js';

export class AStar {
  constructor(initialTile, goal) {
    this.initialTile = initialTile;
    this.goal = goal;
  }

  aStar() {
    return this.weightAStar(1);
  }

  weightAStar(weight) {
    let open = new PriorityQueue();
  }
}
