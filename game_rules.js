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
        columns[id].removeEventListener("click", selectColumn);
    }
    if (boardState.playableColumns.length === 0) {
        //end the game!!!
    }
}

function selectColumn(choice){
    let column;
    let fill;
    
    if (boardState.activePlayer){ //put this later after we know what the pip is and just fill it
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
    pips.id = fill; //change this to a class
    board[column.id].push("X");
    fullColumns(column.id);
    boardState.activePlayer = !boardState.activePlayer;
    computerMove();
}

function computerMove(){
    if (playerInfo.player2.computer && !boardState.activePlayer) {
        let number = Math.floor(Math.random() * boardState.playableColumns.length);
        selectColumn(boardState.playableColumns[number]);
    }
}

function playerChoice(click){
    let column = click.target;
    if (column.className === "pip") {
        column = column.parentElement;
    }

    let x = board[column.id].length;
    let pips = column.children[x];
    if (boardState.activePlayer) {
        pips.classList.add = playerInfo.player1.color;
        board[column.id].push(true);
    } else {
        pips.classList.add = playerInfo.player2.color;
        board[column.id].push(false);
    }

    boardState.activePlayer = !boardState.activePlayer;

    if (playerInfo.player2.computer) {
        //do the computer move
    }
}