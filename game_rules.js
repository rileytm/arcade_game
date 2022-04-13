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
    rows: 6,
    columns: 7,
    reset: function (){
        this.activePlayer = true;
        this.playableColumns = [];
        this.gameOver = false;
        board = [[],[],[],[],[],[],[]];
        addClicks();
        numberColumns();
        clearPips();
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

function whoStarts(){
    document.getElementById("p1-display").classList.remove("active-player");
    document.getElementById("p2-display").classList.remove("active-player");
    if (Math.floor(Math.random() * 2) === 1){
        boardState.activePlayer = false;
        document.getElementById("p2-display").classList.toggle("active-player");
    } else {
        document.getElementById("p1-display").classList.toggle("active-player");
    }

    if (!boardState.activePlayer && playerInfo.player2.computer){
        computerChoice()
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

function isComputer(bool){
    if (bool) {
        p2Name.style.visibility = "hidden";
        playerInfo.player2.computer = bool;
    } else {
        p2Name.style.visibility = "visible";
        playerInfo.player2.computer = bool;
    }
}

function clearPips(){
    for (let c = 0; c < columns.length; c ++){
        for (let p = 0; p < columns[c].childElementCount; p++){
            let pip = columns[c].children[p];
            if (pip.classList.contains(playerInfo.player1.color)){
                pip.classList.remove(playerInfo.player1.color);
            }
            if (pip.classList.contains(playerInfo.player2.color)){
                pip.classList.remove(playerInfo.player2.color);
            }
        }
    }
}

function newGame(){
    if (playerInfo.player2.computer) {
        playerInfo.player2.name = "The Computer";
    } else {
        playerInfo.player2.name = p2Name.value;
    }

    if (!p1Name.value || (!p2Name.value && p2Name.style.visibility === "visible")) {
        p1Name.classList.add("error");
        p2Name.classList.add("error");
        setTimeout( function() {
            p1Name.classList.remove("error");
            p2Name.classList.remove("error");
        }, 300 )
    } else {
        boardState.reset();
        clearPips();
        whoStarts();
        playerInfo.player1.name = p1Name.value;
        document.getElementById("game-setup").classList.add("hidden");
        document.getElementById("active-game").classList.remove("hidden");
        document.getElementById("p1-display").innerText = playerInfo.player1.name;
        document.getElementById("p2-display").innerText = playerInfo.player2.name;
    }
}

function startOver(){
    document.getElementById("game-setup").classList.remove("hidden");
    document.getElementById("active-game").classList.add("hidden");
    document.getElementById("win-state").classList.add("hidden");
    boardState.reset();
}

function fullColumns(id){
    let fullColumn = parseInt(id);
    if (board[fullColumn].length >= 6) {
        let spot = boardState.playableColumns.indexOf(fullColumn);
        boardState.playableColumns.splice(spot, 1);
        columns[id].removeEventListener("click", playerChoice);
    }
    if (boardState.playableColumns.length === 0) {
        document.getElementById("win-state").classList.remove("hidden");
        document.getElementById("active-game").classList.add("hidden");
        document.getElementById("winning-player").innerText = "NOBODY WINS!!!!";
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

    iWin(column, height);
    fullColumns(column);
    boardState.activePlayer = !boardState.activePlayer;
    document.getElementById("p1-display").classList.toggle("active-player");
    document.getElementById("p2-display").classList.toggle("active-player");

    if (playerInfo.player2.computer) {
        computerChoice();
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
    document.getElementById("p1-display").classList.toggle("active-player");
    document.getElementById("p2-display").classList.toggle("active-player");
}

// let computerWinningMoves = [];

function checkVertical(columnNum, rowNum){
    for (let i = 0; i < 4; i++){
        if (board[columnNum][rowNum - i] === boardState.activePlayer) {}
        else {
            // if (i === 4 && playerInfo.player2.computer){
            //     let spot = [columnNum, rowNum - i];
            //     computerWinningMoves.push(spot);
            // }
        return false}
    }
    return true;
}

function checkHorizontal(columnNum, rowNum){
    for (let run = 0; run < 4; run++){
        for (let i = 0; i < 4; i++){
            if (columnNum + i >= board.length){break}

            if (board[columnNum + i][rowNum] === boardState.activePlayer) {}
            else {break};
            if (i === 3) {return true};
        }
        columnNum = columnNum - 1;
        if (columnNum < 0) {return false}
    }
}

function diagDownRight(columnNum, rowNum){
    for (let run = 0; run < 4; run++){
        for (let i = 0; i < 4; i++){
            if (columnNum + i >= board.length || rowNum - i < 0){break}
            if (board[columnNum + i][rowNum - i] === boardState.activePlayer) {}
            else {break};
            if (i === 3) {return true};
        }
        columnNum = columnNum - 1;
        rowNum = rowNum + 1;
        if (columnNum < 0 || rowNum > boardState.rows) {return false}
    }
}

function diagUpRight(columnNum, rowNum){
    for (let run = 0; run < 4; run++){
        for (let i = 0; i < 4; i++){
            if (columnNum + i >= board.length || rowNum + i > boardState.rows){break}
            if (board[columnNum + i][rowNum + i] === boardState.activePlayer) {}
            else {break};
            if (i === 3) {return true};
        }
        columnNum = columnNum - 1;
        rowNum = rowNum - 1;
        if (columnNum < 0 || rowNum < 0) {return false}
    }
}

function iWin(columnNum, rowNum){
    if (checkVertical(columnNum, rowNum) ||
    checkHorizontal(columnNum, rowNum) ||
    diagDownRight(columnNum, rowNum) ||
    diagUpRight(columnNum, rowNum)){
        document.getElementById("active-game").classList.add("hidden");
        document.getElementById("win-state").classList.remove("hidden");
        let winner = playerInfo.player1.name;
        if (!boardState.activePlayer){winner = playerInfo.player2.name}
        document.getElementById("winning-player").innerText = `${winner} Wins The Game!!`;
        for (let i = 0; i < columns.length; i++){
            columns[i].removeEventListener("click", playerChoice);
        }
    }
}