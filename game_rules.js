let button = document.getElementById("random-column");
button.addEventListener("click", randomColumn);

let columns = document.getElementsByClassName("column");
let board = [[],[],[],[],[],[],[]];
let boardState = {
    activePlayer: true,
    computerPlayer: false,
    player1: "riley",
    player2: "stella",
    playableColumns: [],
    gameOver: false,
    reset: function (){
        this.activePlayer = true;
        this.computerPlayer = false;
        this.player1 = "riley";
        this.player2 = "stella";
        this.playableColumns = [];
        this.gameOver = false;
        addClicks();
        numberColumns();
    }
}

function addClicks(){
    for (let i = 0; i < columns.length; i++){
        columns[i].addEventListener("click", selectColumn);
        boardState.playableColumns.push(i);
    }
}

addClicks();

function numberColumns(){
    for (let i = 0; i < columns.length; i++) {
        columns[i].id = i;
    }
}

numberColumns();


function fullColumns(column, id) {
    if (column.length >= 6) {
        boardState.playableColumns.splice(id, 1);
        columns[id].removeEventListener("click", selectColumn);
    }
    if (boardState.playableColumns.length === 0) {
        //end the game!!!
    }
}

function selectColumn(choice) {
    let column;
    let fill = "yellow";
    if (choice.type === "click") {
        column = choice.target;
        fill = "red";
    } else {
        column = columns[choice];
    }

    if (column.className === "pip"){
        column = column.parentElement;
    }
    
    let x = board[column.id].length;
    let pips = column.children[x];
    pips.id = fill;
    board[column.id].push("X");
    fullColumns(board[column.id], column.id);
    boardState.activePlayer = !boardState.activePlayer;
}

function randomColumn(){
    let number = Math.floor(Math.random() * boardState.playableColumns.length);
    selectColumn(boardState.playableColumns[number]);
}

//use objects in the arrays that represent the squares to represent each square's state