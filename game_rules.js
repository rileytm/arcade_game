let p1Name = document.getElementById("p1-name");
let p2Name = document.getElementById("p2-name");
let onePlayer = document.getElementById("one-player");
let twoPlayer = document.getElementById("two-player");

let columns = document.getElementsByClassName("column");
let board = [[],[],[],[],[],[],[]];
let boardState = {
    activePlayer: true,
    playableColumns: [],
    gameOver: false,
    reset: function (){
        this.activePlayer = true;
        this.playableColumns = [];
        this.gameOver = false;
        addClicks();
        numberColumns();
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
        computer: false
    }
}

function addClicks(){
    for (let i = 0; i < columns.length; i++){
        columns[i].addEventListener("click", playerChoice);
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

function isComputer(bool){
    if (bool) {
        p2Name.style.visibility = "hidden";
        playerInfo.player2.computer = bool;
    } else {
        p2Name.style.visibility = "visible";
        playerInfo.player2.computer = bool;
    }
}

function newGame(){
    boardState.reset;

    if (!p1Name.value || (!p2Name.value && p2Name.style.visibility === "visible")) {
        p1Name.classList.add("error");
        p2Name.classList.add("error");
        setTimeout( function() {
            p1Name.classList.remove("error");
            p2Name.classList.remove("error");
        }, 300 )
    }

    playerInfo.player1.name = p1Name.value;

    if (playerInfo.player2.computer) {
        playerInfo.player2.name = "The Computer";
    } else {
        playerInfo.player2.name = p2Name.value;
    }
}


function fullColumns(id){
    let fullColumn = parseInt(id);
    if (board[fullColumn].length >= 6) {
        let spot = boardState.playableColumns.indexOf(fullColumn);
        boardState.playableColumns.splice(spot, 1);
        columns[id].removeEventListener("click", playerChoice);
    }
    if (boardState.playableColumns.length === 0) {
        //end the game!!!
    }
}

function playerChoice(click){
    let column = click.target;
    if (column.classList.contains("pip")) {
        column = column.parentElement;
    }

    let x = board[column.id].length;
    let pips = column.children[x];
    if (boardState.activePlayer) {
        pips.classList.add(playerInfo.player1.color);
        board[column.id].push(true);
    } else {
        pips.classList.add(playerInfo.player2.color);
        board[column.id].push(false);
    }
    fullColumns(column.id);
    boardState.activePlayer = !boardState.activePlayer;

    if (playerInfo.player2.computer) {
        computerChoice()
    }
}

function computerChoice(){
    let x = Math.floor(Math.random() * boardState.playableColumns.length);
    let columnNum = boardState.playableColumns[x];
    let pip = columns[columnNum].children[board[columnNum].length];
    pip.classList.add(playerInfo.player2.color);
    board[columnNum].push(false);
    fullColumns(columnNum)
    boardState.activePlayer = !boardState.activePlayer;
}