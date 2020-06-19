
class PriorityQueue {
  constructor(goalTile) {
    this.queue = [];
    this.length = 0;
    this.goalTile = goalTile;
  }

  // test si la queue est vide
  isEmpty() {
    return this.length==0;
  }

  // recupere la taille de la queue
  size() {
    return this.length;
  }

  // ajoute un element bien placer dans la queue selon son getValue
  add(element) {
    if (this.isEmpty()) {
      this.queue.push(element);
      this.length += 1;
    } else {
      let len = this.length ++;
      for (let i = 0; i < len; i++) {
        let curr_tile = this.queue[i];
        if (element.getValue() < curr_tile.getValue() ||
            (element.equals(curr_tile) && element.diagonalDistance(this.goalTile) < curr_tile.diagonalDistance(this.goalTile))) {
          this.queue.splice(i, 0, element);
          return;
        }
      }
      this.queue.push(element);
    }
  }

  // retire le premier element de la queue ou null si la queue est vide
  remove() {
    if (!this.isEmpty()) {
      let firstElement = this.queue[0];
      this.queue.shift();
      this.length -= 1;
      return firstElement;
    } else {
      return null;
    }
  }
}
