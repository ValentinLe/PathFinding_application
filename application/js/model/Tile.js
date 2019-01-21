
/** Classe representant une case */
class Tile {
  /**
   * Cree une case
   * @param {double} x la coordonnee en abscisse de la case
   * @param {double} y la coordonnee en ordonnee de la case
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.wall = false;
    this.value = Number.MAX_VALUE;
    this.state = 0;
  }

  /**
   * Getter de l'abscisse de la case
   *
   * @return {number}
   */
  getX() {
    return this.x;
  }

  /**
   * Getter de l'ordonne de la case
   *
   * @return {number}
   */
  getY() {
    return this.y;
  }

  /**
   * Retourne true si la case est un mur
   *
   * @return {boolean}
   */
  isWall() {
    return this.wall;
  }

  /**
   * Setter sur le fait que la case soit un mur ou non
   *
   * @param {boolean} newState le nouvelle etat de la case
   */
  setWall(newState) {
    this.wall = newState;
  }

  /**
   * Getter sur la valeur de la case (utilise par l'IA)
   * @return {double} la valeur de la case
   */
  getValue() {
    return this.value;
  }

  /**
   * Setter sur la valeur de la case
   *
   * @param {double} value la valeur qu'aura la case
   */
  setValue(value) {
    this.value = value;
  }

  /**
   * Getter sur l'etat de la case (non parcourue = 0, dans les ouverts = 1,
   * parcourue = 2, fait partie du chemin = 3)
   *
   * @return {int} etat de la case
   */
  getState() {
    return this.state;
  }

  /**
   * Setter sur l'etat de la case
   *
   * @param {int} value etat de la case dans [0:3]
   */
  setState(value) {
    this.state = value;
  }

  /**
   * Change le fait que la case soit un mur ou non comme une switch on/off
   */
  switchWall() {
    if (this.isWall()) {
      this.setWall(false);
    } else {
      this.setWall(true);
    }
  }

  /**
   * Test si la case donnee est egale a this
   *
   * @param {Tile} o la case pour tester l'egalite
   */
  equals(o) {
    return this.getX()==o.getX() && this.getY()==o.getY();
  }

  /**
   * Rinitialise la case en enlevant le mur, remise de la valeur de la case a
   * la valeur maximale (voir AStar), remise a 0 de son l'etat
   */
  resetTile() {
    this.setWall(false);
    this.setValue(Number.MAX_VALUE);
    this.setState(0);
  }

  /**
   * Distance euclidienne entre this et une case donnee
   *
   * @param {Tile} o l'autre case pour calculer la distance
   */
  distance(o) {
    return Math.sqrt(Math.pow(o.getX() - this.getX(), 2) + Math.pow(o.getY() - this.getY(), 2));
  }

  /**
   * Distance de manhattan entre this et une autre case donnee
   *
   * @param {Tile} o l'autre case pour calculer la distance
   */
  manhattanDistance(o) {
    return Math.abs(o.getY() - this.getY()) + Math.abs(o.getX() - this.getX());
  }

  /**
   * Distance diagonale entre this et une autre case donnee
   *
   * @param {Tile} o l'autre case pour calculer la distance
   */
  diagonalDistance(o) {
    let dx = Math.abs(this.x - o.getX());
    let dy = Math.abs(this.y - o.getY());
    let line = 1;
    let diagonal = Math.sqrt(2);
    return line * (dx + dy) + (diagonal - 2*line) * Math.min(dx,dy);
  }

  /**
   * toString de la case sous forme d'un caractere pour pouvoir faire un toString
   * de la grille
   *
   * @return {string} le caractere representant la case selon ses caracteristiques
   */
  toStringGrid() {
    if (this.wall) {
      return "#";
    } else {
      return "" + (this.state==3 ? "." : this.state);
    }
  }

  /**
   * toString de la case qui affiche sous forme (3,2) pour une case ou x=3 et y=2
   * @return {string} la representation string de la case
   */
  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}
