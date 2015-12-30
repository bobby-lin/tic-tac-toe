/**
 * Created on: 29/12/15
 *     Author: Bobby Lin
 */
    
const WINNING_PATTERN = [7, 56, 448, 292, 146, 73, 273, 84]; // Binary converts to Decimal
var player;
var computer;
var possibleMoves = [0,1,2,3,4,5,6,7,8];
var playerPattern = 0;
var computerPattern = 0;

function selectSymbol() {
    $('#menu').addClass('.hidden');
}

function removeMask() {
    setTimeout(function () {
        $('#select-menu').hide();
        $('#page-mask').hide();
    }, 200);
}

function initSymbols(choice) {
    player = choice;
    if (player === "O") {
        computer = "X";
    }
    else {
        computer = "O";
    }
}

function initGame(choice) {
    initSymbols(choice);
    removeMask();
    playGame();
}

function playGame() {
    computerNextMove();
}

function restart() {
    $('#page-mask').hide();
    $("td").html("");
    possibleMoves = [0,1,2,3,4,5,6,7,8];
    playerPattern = 0;
    computerPattern = 0;
    playGame();
}

function computerNextMove() {
    var length = possibleMoves.length;
    var cellNum;
    var hash = "#cell-";
    if((cellNum = checkWinningMove(computerPattern)) != -1) {
        removePositionFromBoard(cellNum);
        console.log(possibleMoves);
    } 
    else if((cellNum = checkWinningMove(playerPattern)) != -1) {
        removePositionFromBoard(cellNum);
        console.log(possibleMoves);
    }
    else {
        var randomIndex = Math.floor(Math.random() * (length));
        console.log(randomIndex);
        cellNum = possibleMoves[randomIndex];
        possibleMoves.splice(randomIndex, 1);
        console.log(possibleMoves);
    }
    hash += cellNum;
    $(hash).html(computer);
    computerPattern |= Math.pow(2, cellNum);
    if(checkWin(computerPattern)) {
        $('#page-mask').show();
        $('#result').html("Computer wins");
        $('#result').show();
        setTimeout(function () {
            restart();
            $('#result').hide();
        }, 3000);
    }
    else if(checkEndGame()) {
        $('#page-mask').show();
        $('#result').html("Draw");
        $('#result').show();
        setTimeout(function () {
            restart();
            $('#result').hide();
        }, 3000);
    }
}

function checkWinningMove(pattern) {
    for(var i = 0; i < possibleMoves.length; i++) {
        var currentPattern = pattern;
        if(checkWin(currentPattern |= Math.pow(2, possibleMoves[i]))) {
            return possibleMoves[i];
        }
    }
    return -1;
}

$('td').click(function() {
    var cellNum = parseInt(this.id.split("-")[1]);
    var hash = "#" + this.id;
    if($(hash).html() === "") {
        $(hash).html(player);
        removePositionFromBoard(cellNum);
        playerPattern |= Math.pow(2, cellNum);
        if(checkWin(playerPattern)) {
            console.log("Player wins");
            setTimeout(function () {
                restart();
            }, 2000);
        }
        else if(checkEndGame()) {
            console.log("Draw");
            setTimeout(function () {
                restart();
            }, 2000);
        }
        else {
            computerNextMove();
        }
    }
    else {
        console.log("Invalid move");
    }
});

function removePositionFromBoard(p) {
    for(var i = 0; i < possibleMoves.length; i++) {
        if(possibleMoves[i] === p) {
            console.log("Removed " + p + " Successfully");
            possibleMoves.splice(i, 1);
            break;
        }
    }
}

function checkEndGame() {
    var length = possibleMoves.length;
    return length === 0;
}

function checkWin(pattern) {
    for(var i = 0; i< WINNING_PATTERN.length; i++) {
        if( (pattern & WINNING_PATTERN[i]) === WINNING_PATTERN[i]) {
            return true;
        }
    }
    return false;
}
