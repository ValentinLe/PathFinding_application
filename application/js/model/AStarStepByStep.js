
class AStarStepByStep {
  constructor(board) {
    this.board = board;
    this.pathFinded = false;
    this.searching = false;
    this.resetAsked = true;
  }

  reset() {
    this.open = new PriorityQueue();
    this.open.add(this.getInitTile());
    this.distance = new Map();
    this.getInitTile().setValue(0);
    this.distance.set(this.getInitTile(), 0);
    this.father = new Map();
    this.father.set(this.getInitTile(), null);
    this.pathFinded = false;
    this.resetAsked = false;
  }

  getInitTile() {
    return this.board.initTile;
  }

  getGoalTile() {
    return this.board.goalTile;
  }

  isPathFinded() {
    return this.pathFinded;
  }

  isSearching() {
    return this.searching;
  }

  setSearching(searching) {
    this.searching = searching;
  }

  askReset() {
    this.resetAsked = true;
  }

  nextStep() {
    if (this.resetAsked) {
      this.reset();
    }
    if (!this.searching || this.pathFinded) {
      return;
    }
    if (!this.open.isEmpty()) {
      let tile = this.open.remove();
      tile.setState(2);
      this.board.statesChanged = true;
      if (tile.equals(this.getGoalTile())) {
        this.pathFinded = true;
        this.searching = false;
        return this.getPlan();
      } else {
        let neighbors = this.board.consvoisWithoutCrossAndWall(tile.getX(), tile.getY(), 1);
        for (let next of neighbors) {
          if (!(this.tileInMap(this.distance, next))) {
            next.setState(1);
            this.distance.set(next, Number.MAX_VALUE);
          }
          let moveCost = this.costTo(tile, next);
          let weight = 1;
          //console.log("\ntile : " + tile + " = " + tile.value + "  " + "next : " + next + " = " + next.value);
          if (this.distance.get(next) > this.distance.get(tile) + moveCost) {
            //console.log("tileAccepted");
            this.distance.set(next, this.distance.get(tile) + moveCost);
            next.setValue(this.distance.get(tile) + weight * next.diagonalDistance(this.getGoalTile()));
            this.father.set(next, tile);
            this.open.add(next);
          } else {
            //console.log("tileDenied");
          }
        }
      }
    } else {
      this.searching = false;
      showMessage("No solution found");
    }
  }

  tileInMap(map, tile) {
    for(let keyTile of map.keys()) {
      if (tile.equals(keyTile)) {
        return true;
      }
    }
    return false;
  }

  costTo(tileStart, tileEnd) {
    if (tileStart.getX() != tileEnd.getY() && tileStart.getY() != tileEnd.getY()) {
      return Math.sqrt(2);
    }
    return 1;
  }

  getPlan() {
    let plan = [];
    let goal = this.getGoalTile();
    while (goal != null) {
      plan.push(goal);
      goal.setState(3);
      goal = this.father.get(goal);
    }
    plan.reverse();
    return plan;
  }
}
