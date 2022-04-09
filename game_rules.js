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
    winCon: 4,
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
        name: "Player 1",
        color: "red"
    },
    player2: {
        name: "Player 2",
        color: "yellow",
        computer: false
    }
}

function addClicks(){
    for (let i = 0; i < columns.length; i++){
        columns[i].addEventListener("click", playerChoice);
        boardState.playableColumns.push(i);
    }
    console.log("clicks added");
}

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
    console.log("start game");
    boardState.reset();

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
    
    column = parseInt(column.id)
    let height = board[column].length;
    let pips = columns[column].children[height];
    
    
    if (boardState.activePlayer) {
        pips.classList.add(playerInfo.player1.color);
        board[column].push(true);
    } else {
        pips.classList.add(playerInfo.player2.color);
        board[column].push(false);
    }

    if (checkVertical(column, height)) {console.log("vertical win!")};
    if (goRight(column, height)) {console.log("right win!")};
    if (goLeft(column, height)) {console.log("left win!")};

    fullColumns(column);
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


function checkVertical(columnNum, rowNum){
    for (let i = 0; i < 4; i++){
        if (board[columnNum][rowNum - i] === boardState.activePlayer) {}
        else {return false}
    }
    return true;
}


function goRight(columnNum, rowNum){
    for (let i = 0; i < 4; i++){
        if (columnNum + i >= board.length){return false}

        if (board[columnNum + i][rowNum] === boardState.activePlayer) {}
        else {return false}
    }
    return true;
}

function goLeft(columnNum, rowNum){
    for (let i = 0; i < 4; i++){
        if (columnNum - i < 0){return false}

        if (board[columnNum - i][rowNum] === boardState.activePlayer) {}
        else {return false}
    }
    return true;
}

function diagUpRight(columnNum, rowNum){
}