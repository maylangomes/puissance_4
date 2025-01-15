import { Puissance_4 } from './script.js';
let playerOne = "Maylan";
let playerTwo = "Visitor";
let p4 = new Puissance_4(document.querySelector('#board'), {
  colors: ["red", "yellow"],
  rows: 6,
  columns: 7
}, playerOne, playerTwo);


document.getElementById("button_color_player_1").addEventListener("click", () => {
  let newColorOne = document.getElementById("color_player_1").value;
  p4.changePlayerColor(1, newColorOne);
});

document.getElementById("button_color_player_2").addEventListener("click", () => {
  let newColorTwo = document.getElementById("color_player_2").value;
  p4.changePlayerColor(2, newColorTwo);
});

// Gestionnaires d'événements pour changer les noms
document.getElementById("button_player_1").addEventListener("click", () => {
  let player_1 = document.getElementById("player_1").value;
  p4.changePlayerName(1, player_1);
});

document.getElementById("button_player_2").addEventListener("click", () => {
  let player_2 = document.getElementById("player_2").value;
  p4.changePlayerName(2, player_2);
});

document.getElementById("button_update_size").addEventListener("click", () => {
  let newRow = 6;
  let newColumn = 7;
  let inputRow = document.getElementById("num_rows");
  let inputColumn = document.getElementById("num_columns");
  if (inputRow.value.trim() !== '') {
    newRow = parseInt(inputRow.value);
  }
  if (inputColumn.value.trim() !== '') {
    newColumn = parseInt(inputColumn.value);
  }
  p4.updateBoardSize(newRow, newColumn);
});

document.getElementById("button_reset_board").addEventListener("click", () => {
  p4.clearBoard();
});

document.getElementById("reset_count").addEventListener("click", () => {
  p4.clearWin();
});

const cancel = document.getElementById("cancel");
cancel.addEventListener("click", () => {
  p4.back();
});