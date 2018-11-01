
export class View {
  constructor(board, canvas, sizeTile) {
    this.board = board;
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.sizeTile = sizeTile;
  }



  paintTile(tile, color) {
    let x = tile.getX() * this.sizeTile;
    let y = tile.getY() * this.sizeTile;
    let ctx = this.ctx;
    ctx.fillStyle = "black";
    if (tile.isWall() || typeof color!=='undefined') {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, this.sizeTile, this.sizeTile);
    }
    ctx.lineWidth = "1";
    ctx.rect(x, y, this.sizeTile, this.sizeTile);
    ctx.stroke();
  }

  paintGrid() {
    let g = this.board.grid;
    for (let j = 0; j<this.board.getHeight(); j++) {
      for (let i = 0; i<this.board.getWidth(); i++) {
        this.paintTile(g[j][i]);
      }
    }
  }
}
