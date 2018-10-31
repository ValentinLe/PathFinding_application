
import {Tile} from './model/Tile.js';
import {Board} from './model/Board.js';

window.onload = main;

function main() {
  let b = new Board(4,5, []);
  console.log(b.toString());
}
