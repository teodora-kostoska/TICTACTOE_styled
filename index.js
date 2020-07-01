let id = null;
var timerid;
var player = 2;
var player1 = "X";
var player2 = "O";
var nowPlaying = null;
const winCombos = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24],
  [0, 5, 10, 15, 20],
  [1, 6, 11, 16, 21],
  [2, 7, 12, 17, 22],
  [3, 8, 13, 18, 23],
  [4, 9, 14, 19, 24],
  [1, 6, 12, 18, 24],
  [4, 8, 12, 16, 21]
];
let gameBoard = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
];

function renderBoard() {
  let table = document.getElementById("board");
  let counter = 0;
  for (let i = 0; i < 5; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 5; j++) {
      let col = document.createElement("td");
      col.id = counter;
      col.onclick = function() {
        play(this.id);
      };
      counter++;
      row.appendChild(col);
    }
    table.appendChild(row);
  }
}

function currentPlayer() {
  if (player === 1) {
    nowPlaying = player2;
    player = 2;
  } else if (player === 2) {
    nowPlaying = player1;
    player = 1;
  }
}

function winner() {
  var winPlayer = 0;
  var j;
  for (j = 0; j < 5; j++) {
    if (
      gameBoard[winCombos[j][0]] === gameBoard[winCombos[j][1]] &&
      gameBoard[winCombos[j][1]] === gameBoard[winCombos[j][2]] &&
      gameBoard[winCombos[j][2]] === gameBoard[winCombos[j][3]] &&
      gameBoard[winCombos[j][3]] === gameBoard[winCombos[j][4]]
    ) {
      winPlayer = gameBoard[winCombos[j][0]];
      return winPlayer;
    }
  }
  for (j = 5; j < 10; j++) {
    if (
      gameBoard[winCombos[j][0]] === gameBoard[winCombos[j][1]] &&
      gameBoard[winCombos[j][1]] === gameBoard[winCombos[j][2]] &&
      gameBoard[winCombos[j][2]] === gameBoard[winCombos[j][3]] &&
      gameBoard[winCombos[j][3]] === gameBoard[winCombos[j][4]]
    ) {
      winPlayer = gameBoard[winCombos[j][0]];
      return winPlayer;
    }
  }
  if (
    gameBoard[winCombos[0][0]] === gameBoard[winCombos[1][1]] &&
    gameBoard[winCombos[1][1]] === gameBoard[winCombos[2][2]] &&
    gameBoard[winCombos[2][2]] === gameBoard[winCombos[3][3]] &&
    gameBoard[winCombos[3][3]] === gameBoard[winCombos[4][4]]
  ) {
    winPlayer = gameBoard[winCombos[0][0]];
  } else if (
    gameBoard[winCombos[0][4]] === gameBoard[winCombos[1][3]] &&
    gameBoard[winCombos[1][3]] === gameBoard[winCombos[2][2]] &&
    gameBoard[winCombos[2][2]] === gameBoard[winCombos[3][1]] &&
    gameBoard[winCombos[3][1]] === gameBoard[winCombos[4][0]]
  ) {
    winPlayer = gameBoard[winCombos[0][4]];
  } else {
    winPlayer = 0;
  }
  return winPlayer;
}

function play(clicked_id) {
  clearInterval(timerid);
  timer();
  id = clicked_id;
  if (id !== null) {
    if (gameBoard[id] === null) {
      let cell = document.getElementById(id);
      gameBoard[id] = player;
      cell.innerHTML = nowPlaying;
      if (player === 1) {
        cell.style.backgroundColor = "rgb(124, 252, 0)";
      } else if (player === 2) {
        cell.style.backgroundColor = "rgb(250, 128, 114)";
      }
    }
  } else {
    alert("Cell taken");
  }
  var winPlayer = winner();
  if (winPlayer !== 0 && winPlayer !== null) {
    alert("Player " + winPlayer + " won!");
  }
}

function timer() {
  currentPlayer();
  var element = document.getElementById("innerprogress");
  var width = 0;
  timerid = setInterval(frame, 900);
  function frame() {
    if (width >= 100) {
      currentPlayer();
      clearInterval(id);
    } else {
      width = width + 10;
      element.style.width = width + "%";
    }
  }
}

renderBoard();
