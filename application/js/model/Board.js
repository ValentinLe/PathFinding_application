
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
        this.grid[coordX] = [];
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
      // parcours inverse
      // suppressions des targets si elle est presente sur la ligne
      this.removeTargetAtLine(h);
      this.grid.splice(h, 1);
    }
    // /!\ modification de la hauteur de la grille apres avoir cree les cases /!\
    this.height -= nbLine;
  }

  /**
   * Supprime la ou les 2 cibles présent(s) sur la ligne donnee
   * @param {int} y la coordonnee de la ligne
   */
  removeTargetAtLine(y) {
    if (this.initTile && this.initTile.getY() == y) {
      this.initTile = null;
    }
    if (this.goalTile && this.goalTile.getY() == y) {
      this.goalTile = null;
    }
  }

  /**
   * Initialisation de la grille de this avec une taille donnee
   * @param {int} width la largeur de la grille
   * @param {int} height la hauteur de la grille
   */
  initGrid(width, height) {
    this.grid = [];
    for (let j = 0; j < height; j++) {
      this.grid[j] = [];
      for (let i = 0; i < width; i++) {
        this.grid[j][i] = new Tile(i,j);
      }
    }
  }

  /**
   * Reinitialise la grille en faisant une Reinitialisation de chaque case et en enlevant
   * les cibles
   */
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

  /**
   * Met tous les etats des cases de la grille a 0
   */
  initStates() {
    let tile;
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        tile = this.getTileAt(i, j);
        tile.setState(0);
      }
    }
  }

  /**
   * Test si les cibles sont dans la grille et la met a null sinon
   */
  checkTargetsInIndex() {
    if (!this.tileInIndex(this.initTile)) {
      this.initTile = null;
    }
    if (!this.tileInIndex(this.goalTile)) {
      this.goalTile = null;
    }
  }

  /**
   * Retourne la case en (x,y) de la grille
   * @param {int} x l'abscisse de la case
   * @param {int} y l'ordonnee de la case
   * @return {Tile} la case en (x,y)
   */
  getTileAt(x, y) {
    return this.grid[y][x];
  }

  /**
   * Ajoute une modification en (x,y), si il manque au moins une cible on en place
   * une, sinon on met la case a l'etat de mur
   * @param {int} x l'abscisse de la modification
   * @param {int} y l'ordonnee de la modification
   */
  addModificationAt(x, y) {
    let tile = this.getTileAt(x, y);
    let isTarget = this.isTarget(tile);
    if (!this.targetsPlaced()) {
      // si au moins un des objectifs n'est pas place
      if (!isTarget) {
        // on place la case comme cible
        this.addTarget(tile);
      } else {
        // on echange les cibles
        this.changeTarget();
      }
    } else if (!isTarget) {
      // on place un mur si la case en (x,y) n'est pas une cible
      tile.setWall(true);
    }
  }

  /**
   * Retire une modification en (x,y), si c'est une cible on la retire et sinon
   * on met la case a l'etat de non mur
   * @param {int} x l'abscisse de la modification a retiree
   * @param {int} y l'ordonnee de la modification a retiree
   */
  removeModificationAt(x, y) {
    let tile = this.getTileAt(x, y);
    if (this.isTarget(tile)) {
      this.removeTarget(tile);
    } else {
      tile.setWall(false);
    }
  }

  /**
   * Echange les cibles si il y a uniquement une des 2 cibles placee
   */
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

  /**
   * Ajoute une case comme cible
   * @param {Tile} tile la case a ajoutee
   */
  addTarget(tile) {
    if (!this.initTile) {
      this.initTile = tile;
    } else if (!this.goalTile) {
      this.goalTile = tile;
    }
    tile.setWall(false);
  }

  /**
   * Supprime la cible correspondant a la case donnee si la case est une cible
   * @param {Tile} tile la case pour la suppression
   */
  removeTarget(tile) {
    if (this.initTile && tile.equals(this.initTile)) {
      this.initTile = null;
    } else if (this.goalTile && tile.equals(this.goalTile)) {
      this.goalTile = null;
    }
  }

  /**
   * Retourne true si la case est l'une des cibles
   * @param {Tile} tile la case a tester
   * @return {boolean} true si la case est l'une des cibles
   */
  isTarget(tile) {
    return (this.initTile && tile.equals(this.initTile)) || (this.goalTile && tile.equals(this.goalTile));
  }

  /**
   * Retourne true il y a une cible en (x,y)
   * @param {int} x l'abscisse
   * @param {int} y l'ordonnee
   */
  targetAt(x, y) {
    return this.isTarget(this.getTileAt(x, y));
  }

  /**
   * Test si il y a uniquement une des 2 cibles placee
   * @return {boolean} true si il y a uniquement une des 2 cibles placee
   */
  justOneTargetPlaced() {
    return (this.initTile && !this.goalTile) || (!this.initTile && this.goalTile);
  }

  /**
   * Test si les 2 cibles sont placee
   * @return {boolean} true si les 2 cibles sont placee
   */
  targetsPlaced() {
    return this.initTile && this.goalTile;
  }

  /**
   * Test si la coordonnee (x,y) est dans la grille
   * @param {int} x la coordonnee en abscisse
   * @param {int} y la coordonnee en ordonnee
   * @return {boolean} true si la coordonnee
   */
  isInIndex(x, y) {
    return 0 <= x && x < this.width && 0 <= y && y < this.height;
  }

  /**
   * Test si la case est dans la grille
   * @param {Tile} tile la case a tester
   * @return {boolean} true si la case est dans la grille
   */
  tileInIndex(tile) {
    return this.isInIndex(tile.getX(), tile.getY());
  }

  /**
   * Place des murs aleatoirement dans la grille avec une probabilite donnee
   * @param {double} proba la probabilite qu'une case soit un mur
   */
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

  /**
   * Enleve tous les murs de la grille
   */
  deleteWalls() {
    for (let j = 0; j < this.height; j++) {
      for (let i = 0; i < this.width; i++) {
        let tile = this.getTileAt(i, j);
        tile.setWall(false);
      }
    }
  }

  /**
   * recupere les voisins dans la portée range de la case (x,y), si withWall = true
   * alors on a tous les voisins sinon on a que les voisins qui ne sont pas des murs
   * @param {int} x la coordonnee en abscisse de la case centrale
   * @param {int} y la coordonnee en ordonnee de la case centrale
   * @param {int} range le rayon du voisinage
   * @param {boolean} diagonal true si on veut recuperer les cases qui sont en diagonales
   * en passant entre 2 murs
   * @param {boolean} withWall true si on veut recuperer les murs
   * @return {Tile[]} la liste des voisins de (x,y) selon les caracteristiques
   */
  consvois(x, y, range, diagonal, withWall) {
    let neighbors = [];
    for (let j = y-range; j<(y + range + 1); j++) {
      for (let i = x-range; i<(x + range + 1); i++) {
        if (this.isInIndex(i,j)) {
          let tile = this.getTileAt(i, j);
          if (this.isTileAccepted(tile, x, y, diagonal, withWall)) {
            // si la case remplie toutes les conditions
            neighbors.push(tile);
          }
        }
      }
    }
    return neighbors;
  }

  /**
   * recupere le voisinage de la case en (x,y) sans murs et sans aller en diagonal
   * en passant entre 2 murs
   * @param {int} x la coordonnee en abscisse de la case centrale
   * @param {int} y la coordonnee en ordonnee de la case centrale
   * @param {int} range le rayon du voisinage
   * @return {Tile[]} la liste des voisins de (x,y) selon les caracteristiques
   */
  consvoisWithoutCrossAndWall(x, y, range) {
    return this.consvois(x, y, range, false, false);
  }

  /**
   * Test si la case remplie les conditions du voisinage
   * @param {Tile} tile la case a tester
   * @param {int} x la coordonnee en abscisse de la case centrale
   * @param {int} y la coordonnee en ordonnee de la case centrale
   * @param {boolean} diagonal true si on veut accepter les cases qui sont en diagonales
   * en passant entre 2 murs
   * @param {boolean} withWall true si on veut accepter les murs
   * @return {boolean} true si les conditions donnees sont respectees
   */
  isTileAccepted(tile, x, y, diagonal, withWall) {
    let tx = tile.getX();
    let ty = tile.getY();
    // si ce n'est pas la case centrale
    let testTileXY = x != tx || y != ty;
    // si le test sur la diagonale est satisfait
    let testCrossWall = diagonal || this.tileCanGoToOtherTile(tile, this.getTileAt(x,y));
    // si le test sur la prise en compte des murs est satisfait
    let testWallTile = withWall || !tile.isWall();

    return testTileXY && testCrossWall && testWallTile;
  }

  /**
   * Test si la premiere case peut se rendre a la seconde case si elle n'est pas
   * en diagonale et que si elle est en diagonale, elles ne sont pas separees par 2 murs
   * @param {Tile} tile la premiere case
   * @param {Tile} otherTile la seconde case
   * @return {boolean} true si on peut se rendre de la premiere case a la deuxieme
   */
  tileCanGoToOtherTile(tile, otherTile) {
    let tx = tile.getX();
    let ty = tile.getY();
    let ox = otherTile.getX();
    let oy = otherTile.getY();
    let firstTile = this.getTileAt(tx, oy);
    let secondTile = this.getTileAt(ox, ty);
    return !(tx != ox && ty != oy && firstTile.isWall() && secondTile.isWall());
  }

  /**
   * representation sous forme de string de la grille
   * @return {string} la representation sous forme de string
   */
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
