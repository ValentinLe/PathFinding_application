
/** Classe representant la grille */
class Board {
  /**
   * Construit une grille
   * @param {int} width la largeur de la grille
   * @param {int} height la hauteur de la grille
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    // construction de la grille
    this.grid = [];
    this.initGrid(width, height);
    // les targets
    this.initTile = null;
    this.goalTile = null;

    this.statesChanged = false;
  }

  /**
   * Getter sur la largeur de la grille
   * @return {int} la largeur de la grille
   */
  getWidth() {
    return this.width;
  }

  /**
   * Getter sur la hauteur de la grille
   * @return {int} la hauteur de la grille
   */
  getHeight() {
    return this.height;
  }

  /**
   * Getter de la cible de depart
   * @return {Tile} la case de depart
   */
  getInitTile() {
    return this.initTile;
  }

  /**
   * Getter sur la cible d'arrivee
   * @return {Tile} la case d'arrivee
   */
  getGoalTile() {
    return this.goalTile;
  }

  /**
   * Setter sur la largeur de la grille (avec gestion du redimentionnement de la grille)
   * @param {int} newWidth la nouvelle largeur de la grille
   */
  setWidth(newWidth) {
    if (this.width != newWidth) {
      // si la largeur a changee
      if (this.width < newWidth) {
        // si la nouvelle largeur est plus grande que l'ancienne on ajoute le nombre
        // de collonnes necessaires
        this.addColumn(newWidth - this.width);
      } else {
        // sinon on supprime le nombre de colonnes necessaires
        this.removeColumn(this.width - newWidth);
      }
    }
  }

  /**
   * Ajoute un nombre de colonnes donnees a la grille
   * @param {int} nbColumn le nombre de colonnes a ajoutees avec 0 < nbColumn
   */
  addColumn(nbColumn) {
    if (nbColumn > 0) {
      for (let j = 0; j < this.height; j++) {
        // pour j parcourant la hauteur
        for (let i = this.width; i < (this.width + nbColumn); i++) {
          // pour i partant de la largeur et faisant nbColumn iterations
          this.grid[j][i] = new Tile(i, j);
        }
      }
      // /!\ modification de la largeur de la grille apres avoir cree les cases /!\
      this.width += nbColumn;
    }
  }

  /**
   * Supprime un nombre de colonnes donnee a la grille
   * @param {int} nbColumn le nombre de colonnes a supprimees avec 0 < nbColumn
   */
  removeColumn(nbColumn) {
    if (nbColumn > 0) {
      for (let j = 0; j < this.height; j++) {
        // pour j parcourant la hauteur
        for (let i = this.width; i >= (this.width - nbColumn); i--) {
          // pour i partant de la largeur et faisant nbColumn iterations en decrementant
          this.removeTargetAtColumn(i);
          this.grid[j].splice(i, 1);
        }
      }
      // /!\ modification de la largeur de la grille apres avoir cree les cases /!\
      this.width -= nbColumn;
    }
  }

  /**
   * Supprime la ou les cibles si elles sont présente dans la colonnes
   * @param {int} column la collonne voulue
   */
  removeTargetAtColumn(column) {
    if (this.initTile && this.initTile.getX() == column) {
      this.initTile = null;
    }
    if (this.goalTile && this.goalTile.getX() == column) {
      this.goalTile = null;
    }
  }

  /**
   * Setter sur la hauteur de la grille (avec gestion du redimentionnement de la grille)
   * @param {int} newHeight la nouvelle hauteur de la grille
   */
  setHeight(newHeight) {
    if (this.height != newHeight) {
      // si la hauteur a changee
      if (this.height < newHeight) {
        // si la nouvelle hauteur est plus grande que l'ancienne on ajoute le nombre
        // de lignes necessaires
        this.addLine(newHeight - this.height);
      } else {
        // sinon on supprime le nombre de lignes necessaires
        this.removeLine(this.height - newHeight);
      }
    }
  }

  /**
   * Ajoute un nombre de lignes donnees a la grille
   * @param {int} nbLine le nombre de lignes a ajoutees avec 0 < nbLine
   */
  addLine(nbLine) {
    if (nbLine > 0) {
      for (let j = 0; j < nbLine; j++) {
        // on itere que sur le nombre de lignes a ajoutees
        // ajout du  tableau pour la ligne a ajoutee
        let coordX = this.height + j;
        this.grid[coordH] = [];
        for (let i = 0; i < this.width; i++) {
          // creation des cases a la ligne donnee en parcourant la largeur
          this.grid[coordX][i] = new Tile(i, coordX);
        }
      }
      // /!\ modification de la hauteur de la grille apres avoir cree les cases /!\
      this.height += nbLine;
    }
  }

  /**
   * Supprime un nombre de lignes donnees a la grille
   * @param {int} nbLine le nombre de lignes a supprimees avec 0 < nbLine
   */
  removeLine(nbLine) {
    for (let h = this.height; h >= (this.height - nbLine); h--) {
      this.removeTargetAtLine(h);
      this.grid.splice(h, 1);
    }
    this.height -= nbLine;
  }

  removeTargetAtLine(y) {
    if (this.initTile && this.initTile.getY() == y) {
      this.initTile = null;
    }
    if (this.goalTile && this.goalTile.getY() == y) {
      this.goalTile = null;
    }
  }

  initGrid(width, height) {
    this.grid = [];
    for (let j = 0; j < height; j++) {
      this.grid[j] = [];
      for (let i = 0; i < width; i++) {
        this.grid[j][i] = new Tile(i,j);
      }
    }
  }

  resetGrid() {
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        let tile = this.getTileAt(i, j);
        tile.resetTile();
      }
    }
    this.initTile = null;
    this.goalTile = null;
  }

  initStates() {
    let tile;
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        tile = this.getTileAt(i, j);
        tile.setState(0);
      }
    }
  }

  checkTargetsInIndex() {
    if (!this.tileInIndex(this.initTile)) {
      this.initTile = null;
    }
    if (!this.tileInIndex(this.goalTile)) {
      this.goalTile = null;
    }
  }

  getTileAt(x, y) {
    return this.grid[y][x];
  }

  addModificationAt(x, y) {
    let tile = this.getTileAt(x, y);
    let isTarget = this.isTarget(tile);
    if (!this.targetsPlaced()) {
      // si au moins un des objectifs n'est pas place
      if (!isTarget) {
        this.addTarget(tile);
      } else {
        this.changeTarget();
        console.log("ok");
      }
    } else if (!isTarget) {
      tile.setWall(true);
    }
  }

  removeModificationAt(x, y) {
    let tile = this.getTileAt(x, y);
    if (this.isTarget(tile)) {
      this.removeTarget(tile);
    } else {
      tile.setWall(false);
    }
  }

  changeTarget() {
    if (this.justOneTargetPlaced()) {
      if (this.initTile) {
        this.goalTile = this.initTile;
        this.initTile = null;
      } else {
        this.initTile = this.goalTile;
        this.goalTile = null;
      }
    }
  }

  addTarget(tile) {
    if (!this.initTile) {
      this.initTile = tile;
    } else if (!this.goalTile) {
      this.goalTile = tile;
    }
    tile.setWall(false);
  }

  removeTarget(tile) {
    if (this.initTile && tile.equals(this.initTile)) {
      this.initTile = null;
    } else if (this.goalTile && tile.equals(this.goalTile)) {
      this.goalTile = null;
    }
  }

  isTarget(tile) {
    return (this.initTile && tile.equals(this.initTile)) || (this.goalTile && tile.equals(this.goalTile));
  }

  targetAt(x, y) {
    return this.isTarget(this.getTileAt(x, y));
  }

  justOneTargetPlaced() {
    return (this.initTile && !this.goalTile) || (!this.initTile && this.goalTile);
  }

  targetsPlaced() {
    return this.initTile && this.goalTile;
  }

  isInIndex(x, y) {
    return 0 <= x && x < this.width && 0 <= y && y < this.height;
  }

  tileInIndex(tile) {
    return this.isInIndex(tile.getX(), tile.getY());
  }

  placeRandowWall(proba) {
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        if (Math.random() < proba) {
          let tile = this.getTileAt(i, j);
          tile.setWall(true);
        }
      }
    }
    // pour eviter que les cibles ne soit pas des murs et donc de ne pas trouver
    // de solutions dans l'algo
    this.initTile.setWall(false);
    this.goalTile.setWall(false);
  }

  deleteWalls() {
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        let tile = this.getTileAt(i, j);
        tile.setWall(false);
      }
    }
  }

  // recupere les voisins dans la portée range de la case (x,y), si withWall = true
  // alors on a tous les voisins sinon on a que les voisins qui ne sont pas des murs
  consvois(x, y, range, diagonal, withWall) {
    let neighbors = [];
    for (let j = y-range; j<(y + range + 1); j++) {
      for (let i = x-range; i<(x + range + 1); i++) {
        if (this.isInIndex(i,j)) {
          let tile = this.getTileAt(i, j);
          if (this.isTileAccepted(tile, x, y, diagonal, withWall)) {
            neighbors.push(tile);
          }
        }
      }
    }
    return neighbors;
  }

  consvoisWithoutCrossAndWall(x, y, range) {
    return this.consvois(x, y, range, false, false);
  }

  isTileAccepted(tile, x, y, diagonal, withWall) {
    let tx = tile.getX();
    let ty = tile.getY();
    let testTileXY = x != tx || y != ty;
    let testCrossWall = diagonal || this.tileCanGoToOtherTile(tile, this.getTileAt(x,y));
    let testWallTile = withWall || !tile.isWall();
    return testTileXY && testCrossWall && testWallTile;
  }

  tileCanGoToOtherTile(tile, otherTile) {
    let tx = tile.getX();
    let ty = tile.getY();
    let ox = otherTile.getX();
    let oy = otherTile.getY();
    let firstTile = this.getTileAt(tx, oy);
    let secondTile = this.getTileAt(ox, ty);
    return !(tx != ox && ty != oy && firstTile.isWall() && secondTile.isWall());
  }

  toString() {
    let ch = "   ";
    for (let k = 0; k<this.width; k++) {
      // numerotation superieur
      ch += k + " ";
    }
    ch += "\n\n";
    for (let j = 0; j < this.height; j++) {
      ch += j + "  "; // numerotation du coté
      for (let i = 0; i < this.width; i++) {
        ch += this.grid[j][i].toStringGrid() + " ";
      }
      ch += "\n";
    }
    return ch;
  }

}
