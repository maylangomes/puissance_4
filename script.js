export class Puissance_4 {
  constructor(div, options, playerOne, playerTwo) {
    this.div = div;
    this.colorOne = options.colors[0];
    this.colorTwo = options.colors[1];
    if (this.colorOne === this.colorTwo) {
      this.colorOne = "red";
      this.colorTwo = "yellow";
    }
    this.rows = localStorage.getItem("row") || options.rows;
    console.log(localStorage.getItem("column"));
    this.columns = localStorage.getItem("column") || options.columns;
    this.playerOne = playerOne;
    this.playerTwo = playerTwo;
    this.currentPlayer = playerOne;
    this.gameOver = false;
    let last_col = this.rows - 1;
    this.currentColumns = [last_col, last_col, last_col, last_col, last_col, last_col, last_col];
    const board = document.getElementById("board");
    let height = 540;
    if (this.rows < 6) {
      let height_diffInf = 6 - this.rows;
      for (let i = 0; i < height_diffInf; i++) {
        height -= 90;
      }
    } else if (this.rows > 6) {
      let height_diffSupp = this.rows - 6;
      for (let i = 0; i < height_diffSupp; i++) {
        height += 90;
      }
    }
    board.style.height = height + "px";
    let width = 630;
    if (this.columns < 7) {
      let width_diffInf = 7 - this.columns;
      for (let j = 0; j < width_diffInf; j++) {
        width -= 90;
      }
    } else if (this.columns > 7) {
      let width_diffSupp = this.columns - 7;
      for (let j = 0; j < width_diffSupp; j++) {
        width += 90;
        this.currentColumns.push(last_col);
      }
    }
    board.style.width = width + "px";
    this.timerPlayerOne = 2;
    this.timerPLayerTwo = 2;
    this.startGame();
    const infoPlayerOne = document.getElementById("info_1");
    const infoPlayerTwo = document.getElementById("info_2");
    const info_1 = document.createElement("p");
    const info_2 = document.createElement("p");
    info_1.textContent = "Player 1 = " + this.playerOne + " (color " + this.colorOne + ")";
    info_2.textContent = "Player 2 = " + this.playerTwo + " (color " + this.colorTwo + ")";
    info_1.classList.add(this.colorOne);
    info_2.classList.add(this.colorTwo);
    infoPlayerOne.appendChild(info_1);
    infoPlayerTwo.appendChild(info_2);
    this.saveCase;
    this.r;
    this.c;
    this.height;
    const timer = document.getElementById("timer");
    this.time = 60;
    timer.innerText = this.time;
    document.getElementById("button_player_1").addEventListener("click", () => {
      let player_1 = document.getElementById("player_1").value;
      let element_1 = document.getElementsByClassName(this.colorOne);
      console.log(element_1);
      element_1[0].textContent = "Player 1 = " + player_1 + " (color " + this.colorOne + ")";
    });
    document.getElementById("button_player_2").addEventListener("click", () => {
      let player_2 = document.getElementById("player_2").value;
      let element_2 = document.getElementsByClassName(this.colorTwo);
      console.log(element_2);
      element_2[0].textContent = "Player 2 = " + player_2 + " (color " + this.colorTwo + ")";
      console.log(element_2[0]);
    });
    $(document).keypress(function (event) {
      if (event.which == '13') {
        event.preventDefault();
      }
    });
  }
  eachSecond() {
    if (this.gameOver) {
      return;
    }
    timer.innerText = this.time;
    this.time -= 1;
  }
  startGame() {
    const countP1 = document.getElementById("countP1");
    const countP2 = document.getElementById("countP2");
    if (!parseInt(localStorage.getItem("winP1")) && !parseInt(localStorage.getItem("winP2"))) {
      localStorage.setItem("winP1", 0);
      localStorage.setItem("winP2", 0);
    }
    this.countWinP1 = parseInt(localStorage.getItem("winP1"));
    this.countWinP2 = parseInt(localStorage.getItem("winP2"));
    countP1.innerText = " Win : " + this.countWinP1;
    countP2.innerText = " Win : " + this.countWinP2;
    // countP1.classList.add(this.colorOne.toString());
    // countP2.classList.add(this.colorTwo.toString());
    // const reset = document.getElementById("reset_count");
    // reset.addEventListener("click", window.localStorage.clear.bind(window.localStorage));
    setInterval(this.eachSecond.bind(this), 1000);
    this.board = [];
    for (let r = 0; r < this.rows; r++) {
      let row = [];
      //console.log(row);
      for (let c = 0; c < this.columns; c++) {
        row.push(' ');
        //console.log(row);

        let cases = document.createElement("table");
        cases.id = r.toString() + "-" + c.toString();
        cases.classList.add("cases");
        cases.addEventListener("click", this.insertPiece.bind(this), false);
        document.getElementById("board").append(cases);
        //console.log(cases.id);
      }
      //console.log(this.board);
      this.board.push(row);
      //console.log(this.board);
    }
  }
  insertPiece(e) {
    const alert = document.getElementById("alert");
    if (this.time < 0) {
      this.time = 60;
      if (this.currentPlayer === this.playerOne) {
        this.timerPlayerOne--;
        if (this.timerPlayerOne === 1) {
          alert.innerText = "Warning for " + this.playerOne + " ! Next time you lose";
        }
      }
      if (this.currentPlayer === this.playerTwo) {
        this.timerPLayerTwo--;
        if (this.timerPLayerTwo === 1) {
          alert.innerText = "Warning for " + this.playerTwo + " ! Next time you lose";
        }
      }
    } else if (this.time > 0) {
      alert.innerText = "";
    }
    if (this.timerPlayerOne <= 0) {
      winner.innerText = this.playerTwo + " Wins ! " + this.playerOne + " is too slow...";
      this.gameOver = true;
    }
    if (this.timerPLayerTwo <= 0) {
      winner.innerText = this.playerOne + " Wins ! " + this.playerTwo + " is too slow...";
      this.gameOver = true;
    }
    if (this.gameOver) {
      return;
    }
    //console.log(this.currentColumns);
    //console.log(this.id);
    //console.log(e.target);
    let coords = e.target.id.split("-");
    let r = coords[0];
    let c = coords[1];
    //console.log(coords);
    //console.log(c);
    //console.log(r);
    //console.log(this.currentColumns[c]);
    r = this.currentColumns[c];
    //console.log(this.currentColumns);
    if (r < 0) {
      return;
    }
    //console.log(r);
    //console.log(c);
    this.board[r][c] = this.currentPlayer;
    //console.log(this.board[r][c]);
    let cases = document.getElementById(r.toString() + "-" + c.toString());
    let case1 = document.getElementById(0 + "-" + c.toString());
    //console.log(case1);
    //console.log(cases);
    this.saveCase = cases;
    if (this.currentPlayer === this.playerOne) {
      let anim_height = 0;
      for (let i = 0; i < r; i++) {
        anim_height += 90;
      }
      this.height = anim_height + "px";
      // if (r === 5) {
      //   this.height = "452px";
      // } else if (r === 4) {
      //   this.height = "352px";
      // } else if (r === 3) {
      //   this.height = "264px";
      // } else if (r === 2) {
      //   this.height = "180px";
      // } else if (r === 1) {
      //   this.height = "90px";
      // } else if (r === 0) {
      //   this.height = "0px";
      // }
      //console.log(this.height);
      cases.classList.add("white-piece");
      let keyframe = [{
        transform: "translateY(" + this.height + ")",
        backgroundColor: this.colorOne
      }];
      let options = {
        duration: 1000
      };
      case1.animate(keyframe, options);
      setTimeout(() => {
        cases.classList.remove("white-piece");
    }, 1000);
      cases.classList.add(this.colorOne.toString() + "-piece");
      this.currentPlayer = this.playerTwo;
    } else if (this.currentPlayer === "IA") {
      let iaCoord = cases.id.split("-");
      let iaC = iaCoord[1];
      //let iaR = iaCoord[0];
      cases = document.getElementById(r.toString() + "-" + iaC);
      cases.classList.add(this.colorTwo.toString() + "-piece");
      this.currentPlayer = this.playerOne;
      //console.log(iaR);
      //console.log(iaCoord);
      //console.log(iaC);
      // if (iaC === "3") {
      //   iaC = "4";  
      //   r++;
      //   this.r = r;
      //   cases = document.getElementById(r.toString() + "-" + iaC);
      //   cases.classList.add(this.colorTwo.toString() + "-piece");
      //   this.currentPlayer = this.playerOne;
      //   console.log(this.currentColumns[iaC]);
      //   this.currentColumns[iaC] = iaR;
      //   this.c = iaC;
      // } else if (iaC === "4") {
      //   iaC = "3";
      //   r++;
      //   this.r = r;
      //   cases = document.getElementById(r.toString() + "-" + iaC);
      //   cases.classList.add(this.colorTwo.toString() + "-piece");
      //   this.currentPlayer = this.playerOne;
      //   this.currentColumns[iaC] = iaR;
      //   this.c = iaC;
      // } else if (iaC === "2") {
      //   iaC = "1";
      //   r++;
      //   this.r = r;
      //   cases = document.getElementById(r.toString() + "-" + iaC);
      //   cases.classList.add(this.colorTwo.toString() + "-piece");
      //   this.currentPlayer = this.playerOne;
      //   this.currentColumns[iaC] = iaR;
      //   this.c = iaC;
      // }
    } else {
      cases.classList.add("white-piece");
      let heightTwo = 0;
      for (let i = 0; i < r; i++) {
        heightTwo += 90;
      }
      this.height = heightTwo + "px";
      let keyframe = [{
        transform: "translateY(" + this.height + ")",
        backgroundColor: this.colorTwo
      }];
      let options = {
        duration: 1000
      };
      case1.animate(keyframe, options);
      setTimeout(() => {
        cases.classList.remove("white-piece");
    }, 1000);
      cases.classList.add(this.colorTwo.toString() + "-piece");
      this.currentPlayer = this.playerOne;
    }
    this.saveCase = cases;
    const infoPlayer = document.getElementById("playing");
    const playing = document.createElement("p");
    playing.textContent = this.currentPlayer;
    playing.classList.add("playing");
    //console.log(infoPlayer.childNodes.length);
    if (infoPlayer.childNodes.length === 0) {
      infoPlayer.appendChild(playing);
      playing.textContent += "'s turn";
      //infoPlayer.removeChild(infoPlayer.getElementsByTagName('div')[0]);
    } else if (infoPlayer.childNodes.length === 1) {
      infoPlayer.removeChild(infoPlayer.firstChild);
      infoPlayer.appendChild(playing);
      playing.textContent += "'s turn";
    }
    r -= 1;
    // if (this.playerTwo === "IA" && this.currentPlayer === this.playerTwo) {
    //     r+= 1;
    // }
    this.currentColumns[c] = r;
    this.r = r;
    this.c = c;
    // if (this.playerTwo === "IA" && this.currentPlayer === this.playerTwo) {
    //     r-= 1;
    // }
    this.checkWinner();
    let a = this.currentColumns.toString();
    if (a === "-1,-1,-1,-1,-1,-1,-1") {
      winner.innerText = "Draw !";
      const restart = document.getElementById("restart");
      restart.style.display = "inline-block";
      this.gameOver = true;
    }
    if (this.playerTwo === "IA" && this.currentPlayer === "IA") {
      this.insertPiece(e);
    }
    this.time = 20;
  }

  clearBoard() {
    localStorage.removeItem("row");
    localStorage.removeItem("column");
    location.reload();
  }

  clearWin() {
    localStorage.removeItem("winP1");
    localStorage.removeItem("winP2");
    location.reload();
  }

  changePlayerColor(playerNumber, newColor) {
    if (playerNumber === 1) {
      this.colorOne = newColor;
    } else if (playerNumber === 2) {
      this.colorTwo = newColor;
    }
    this.updatePlayerInfo();
    this.updateBoardColors();
  }

  updatePlayerInfo() {
    let infoPlayerOne = document.getElementById("info_1");
    let infoPlayerTwo = document.getElementById("info_2");

    infoPlayerOne.innerHTML = "";
    infoPlayerTwo.innerHTML = "";

    let info_1 = document.createElement("p");
    let info_2 = document.createElement("p");

    info_1.textContent = "Player 1 = " + this.playerOne + " (color " + this.colorOne + ")";
    info_2.textContent = "Player 2 = " + this.playerTwo + " (color " + this.colorTwo + ")";

    info_1.classList.add(this.colorOne);
    info_2.classList.add(this.colorTwo);

    infoPlayerOne.appendChild(info_1);
    infoPlayerTwo.appendChild(info_2);
  }

  changePlayerName(playerNumber, newName) {
    if (playerNumber === 1) {
      this.playerOne = newName;
    } else if (playerNumber === 2) {
      this.playerTwo = newName;
    }
    this.updatePlayerInfo();
  }

  updateBoardColors() {
    let piecesOne = document.querySelectorAll("." + this.colorOne + "-piece");
    let piecesTwo = document.querySelectorAll("." + this.colorTwo + "-piece");

    piecesOne.forEach(piece => {
      piece.style.backgroundColor = this.colorOne;
    });

    piecesTwo.forEach(piece => {
      piece.style.backgroundColor = this.colorTwo;
    });
  }

  updateBoardSize(newRow, newColumn) {
    localStorage.setItem("row", newRow);
    localStorage.setItem("column", newColumn);
    location.reload();
  }

  back() {
    if (this.currentPlayer === this.playerOne) {
      this.currentPlayer = this.playerTwo;
    } else if (this.currentPlayer === this.playerTwo) {
      this.currentPlayer = this.playerOne;
    }
    //console.log(this.currentPlayer);
    let lastCoord = this.saveCase.id.split("-");
    let lastR = lastCoord[0];
    let lastC = lastCoord[1];
    let lastCase = document.getElementById(lastR + "-" + lastC);
    lastCase.classList.remove("blue-piece");
    lastCase.classList.remove("red-piece");
    lastCase.classList.remove("yellow-piece");
    lastCase.classList.remove("orange-piece");
    lastCase.classList.remove("black-piece");
    lastCase.classList.remove("green-piece");
    this.r = lastR;
    this.c = lastC;
    this.currentColumns[this.c] = this.r;
    this.board[this.r][this.c] = ' ';
    this.r -= 1;
  }
  checkWinner() {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] != ' ') {
          if (this.board[r][c] === this.board[r][c + 1] && this.board[r][c + 1] === this.board[r][c + 2] && this.board[r][c + 2] === this.board[r][c + 3]) {
            this.isWinner(r, c);
            return;
          }
        }
      }
    }
    for (let c = 0; c < this.columns; c++) {
      for (let r = 0; r < this.rows - 3; r++) {
        if (this.board[r][c] != ' ') {
          if (this.board[r][c] === this.board[r + 1][c] && this.board[r + 1][c] === this.board[r + 2][c] && this.board[r + 2][c] === this.board[r + 3][c]) {
            this.isWinner(r, c);
            return;
          }
        }
      }
    }
    for (let r = 0; r < this.rows - 3; r++) {
      for (let c = 0; c < this.columns - 3; c++) {
        if (this.board[r][c] != ' ') {
          //console.log(this.board[r][c]);
          if (this.board[r][c] === this.board[r + 1][c + 1] && this.board[r + 1][c + 1] === this.board[r + 2][c + 2] && this.board[r + 2][c + 2] === this.board[r + 3][c + 3]) {
            this.isWinner(r, c);
            return;
          }
        }
      }
    }
    for (let r = 3; r < this.rows; r++) {
      //console.log(r);
      for (let c = 0; c < this.columns - 3; c++) {
        //console.log(r);
        if (this.board[r][c] != ' ') {
          if (this.board[r][c] === this.board[r - 1][c + 1] && this.board[r - 1][c + 1] === this.board[r - 2][c + 2] && this.board[r - 2][c + 2] === this.board[r - 3][c + 3]) {
            this.isWinner(r, c);
            return;
          }
        }
      }
    }
  }
  isWinner(r, c) {
    // localStorage.setItem("winP1", 5);
    // localStorage.setItem("winP2", 5);
    //console.log(localStorage.getItem("winP1"));
    const restart = document.getElementById("restart");
    let winner = document.getElementById("winner");
    if (this.board[r][c] === this.playerOne) {
      winner.innerText = this.playerOne + " Wins !";
      localStorage.setItem("winP1", ++this.countWinP1);
    } else {
      winner.innerText = this.playerTwo + " Wins !";
      localStorage.setItem("winP2", ++this.countWinP2);
    }
    countP1.innerText = " Win : " + this.countWinP1;
    countP2.innerText = " Win : " + this.countWinP2;
    this.gameOver = true;
    restart.style.display = "inline-block";
  }
}
