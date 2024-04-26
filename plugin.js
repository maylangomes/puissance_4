import { Puissance_4 } from './script.js';
let playerOne = "Lulu";
let playerTwo = "Maylan";
let p4 = new Puissance_4(document.querySelector('#board'), {
  colors: ["green", "blue"],
  rows: 6,
  columns: 7
}, playerOne, playerTwo);
const cancel = document.getElementById("cancel");
cancel.addEventListener("click", () => {
  p4.back();
});