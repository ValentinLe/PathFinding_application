
class AStar {
  constructor(board, delay) {
    this.board = board;
    this.delay = delay;
  }

  getDelay() {
    return this.delay;
  }

  setDelay(delay) {
    this.delay = delay;
  }

  getInitTile() {
    return this.board.initTile;
  }

  getGoalTile() {
    return this.board.goalTile;
  }

  weightAStar(moveCost, weight) {
    let open = new PriorityQueue();
    open.add(this.getInitTile());
    let distance = new Map(); // tile : int
    this.getInitTile().setValue(0);
    distance.set(this.getInitTile(), 0);
    let father = new Map(); // tile : tile
    father.set(this.getInitTile(), null);
    while (!open.isEmpty()) {
      let tile = open.remove();
      tile.setState(2);
      this.board.statesChanged = true;
      if (this.delay != 0) {
        sleep(this.delay);
      }
      if (tile.equals(this.getGoalTile())) {
        return this.getPlan(father, tile);
      } else {
        let neighbors = this.board.convoisWithoutCrossWallInDiagonal(tile.getX(), tile.getY(), 1, false);
        for (let i = 0; i<neighbors.length; i++) {
          let next = neighbors[i];
          if (!(this.tileInMap(distance, next))) {
            next.setState(1);
            distance.set(next, Number.MAX_VALUE);
          }
          if (distance.get(next) > distance.get(tile) + moveCost) {
            distance.set(next, distance.get(tile) + moveCost);
            next.setValue(distance.get(next) + weight * next.distance(this.getGoalTile()));
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
