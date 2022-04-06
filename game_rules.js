let columns = document.getElementsByClassName("column");
let board = [[],[],[],[],[],[],[]];
let boardState = {
    activePlayer: true,
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
        board = [[],[],[],[],[],[],[]];
        columns = document.getElementsByClassName("column");
    }
}

let playerInfo = {
    player1: {
        name: "riley",
        color: "red"
    },
    player2: {
        name: "Stella",
        color: "yellow",
        computer: true
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
        //this function needs to find the index of the column and splice from there, it's splicing the wrong places now
    }
    if (boardState.playableColumns.length === 0) {
        //end the game!!!
    }
}

function selectColumn(choice) {
    let column;
    let fill;
    
    if (boardState.activePlayer){
        fill = playerInfo.player1.color;
    } else {
        fill = playerInfo.player2.color};

    if (choice.type === "click") {
        column = choice.target;
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
    fullColumns(board[column.id], column.id);//this doesn't neend the board to the functiona global variable
    boardState.activePlayer = !boardState.activePlayer;
    computerMove();
}

function computerMove(){
    if (playerInfo.player2.computer && !boardState.activePlayer) {
        let number = Math.floor(Math.random() * boardState.playableColumns.length);
        selectColumn(boardState.playableColumns[number]);
    }
}