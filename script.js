// const gameBoard - create board, clear board, update board
// const displayController - check for win, rounds
// const gamePlayer - factory =sign + playercreation
// const

//module
const gameBoard = (() => {
  //this stores either X or Y
  const boardPlayerValue = [];
  for (let i = 0; i < 9; i++) {
    boardPlayerValue.push("");
  }

  //this function stores sign of player in boardPlayerValue
  const inBoard = (position, sign) => {
    if (position > boardPlayerValue.length) return;
    boardPlayerValue[position] = sign;
  };

  const startB = document.querySelector("#startGame");
  startB.addEventListener("click", createBoard);
  const buildingBoard = document.querySelector("#gridContainer");
  function createBoard() {
    for (let i = 0; i < 9; i++) {
      let grids = document.createElement("div");
      buildingBoard.insertAdjacentElement("afterbegin", grids);
      grids.setAttribute("data-number", `${i}`);
    }
    startB.disabled = true;
    let wholeBoard = buildingBoard.querySelectorAll("div");
    wholeBoard.forEach((block) => block.addEventListener("click", updateBoard));
    wholeBoard.forEach((block) =>
      block.addEventListener("click", storePosition)
    );
    wholeBoard.forEach((block) => block.addEventListener("click", alerWin));
  }
  function storePosition() {
    inBoard(this.dataset.number, this.textContent);
    console.log(boardPlayerValue);
  }
  function alerWin() {
    displayController.checkForWin(boardPlayerValue);
  }

  const clearB = document.querySelector("#clearGrid");
  clearB.addEventListener("click", clearBoard);
  function clearBoard() {
    const buildingBoard = document.querySelector("#gridContainer");
    let wholeBoard = buildingBoard.querySelectorAll("div");
    wholeBoard.forEach((block) => (block.textContent = ""));
    for (let i = 0; i < boardPlayerValue.length; i++) {
      boardPlayerValue[i] = "";
    }
    displayController.resetRoundC();
    const winMess = document.querySelector("#winnerDiv");
    winMess.textContent = "Who is going to win?";
    //   wholeBoard.forEach(block => block.addEventListener("click", updateBoard))
  }
  const stopGame = () => {
    let wholeBoard = buildingBoard.querySelectorAll("div");
    wholeBoard.forEach((block) =>
      block.removeEventListener("click", updateBoard)
    );
    clearBoard();
  };

  function updateBoard() {
    if (this.textContent == "X" || this.textContent == "O") {
      return;
    } else {
      this.textContent += displayController.whichSign();
    }
  }

  function showBoardStatus() {
    console.log(boardPlayerValue);
  }
  //TODO - clear board
  return {
    createBoard,
    clearBoard,
    inBoard,
    showBoardStatus,
    alerWin,
    stopGame,
  };
})();

//factory
const gamePlayer = (sign) => {
  this.sign = sign; //
  const showSign = () => {
    return sign;
  };
  return { showSign }; //public
};

//module
const displayController = (() => {
  //create players
  const playerX = gamePlayer("X");
  const playerO = gamePlayer("O");

  //sign
  let roundC = 1;
  const whichSign = () => {
    if (roundC === 10) {
      return;
    } else if (roundC % 2 === 1) {
      roundC++;
      return playerX.showSign();
    } else if (roundC % 2 === 0) {
      roundC++;
      return playerO.showSign();
    }
  };

  const resetRoundC = () => {
    roundC = 1;
    return roundC;
  };
  //check for win --> win conditions
  const checkForWin = (boardArray) => {
    winnerX = false;
    winnerO = false;
    draw = false;
    const conditionsForWin = [
      // 0 1 2
      // 3 4 5
      // 6 7 8
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [3, 4, 5],
      [6, 4, 2],
      [6, 7, 8],
      [1, 4, 7],
      [2, 5, 8],
    ];
    const annouceWinner = () => {
      const winMess = document.querySelector("#winnerDiv");
      if (winnerX == true) {
        winMess.textContent = "Player X is the winner";
      } else if (winnerO == true) {
        winMess.textContent = "Player O is the winner";
      } else {
        winMess.textContent = "draw";
      }
    };
    conditionsForWin.forEach((winComb) => {
      const value0 = boardArray[winComb[0]];
      const value1 = boardArray[winComb[1]];
      const value2 = boardArray[winComb[2]];
      if (value0 == "" || value1 == "" || value2 == "") {
        return;
      } else if (value0 == "X" && value0 == value1 && value1 == value2) {
        console.log("holy poggers X won");
        winnerX = true;
        //         gameBoard.stopGame()
        annouceWinner();
        //         winnerX = false;
      } else if (value0 == "O" && value0 == value1 && value1 == value2) {
        console.log("O won");
        winnerO = true;
        //         gameBoard.stopGame()
        annouceWinner();
        //        winnerO = false;
      } else if (!boardArray.includes("")) {
        draw = true;
        annouceWinner();
      }
    });
  };
  return { whichSign, resetRoundC, checkForWin };
})();
