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
    $('#page-mask').show();
    setTimeout(function () {
        $('#page-mask').hide();
        $("td").html("");
        possibleMoves = [0,1,2,3,4,5,6,7,8];
        playerPattern = 0;
        computerPattern = 0;
        playGame();
    }, 2000);
}

function computerNextMove() {
    var length = possibleMoves.length;
    var randomIndex = Math.floor(Math.random() * (length));
    var cellNum = possibleMoves[randomIndex];
    var hash = "#" + "cell-" + cellNum;
    possibleMoves.splice(randomIndex, 1);
    $(hash).html(computer);
    computerPattern |= Math.pow(2, cellNum);
    console.log(computerPattern);
    if(checkWin(computerPattern)) {
        console.log("Computer wins");
        setTimeout(function () {
            restart();
        }, 2000);
    }
    else if(checkEndGame()) {
        console.log("Game is over");
        restart();
    }
}

$('td').click(function() {
    var cellNum = parseInt(this.id.split("-")[1]);
    var hash = "#" + this.id;
    if($(hash).html() === "") {
        $(hash).html(player);
        removePositionFromBoard(cellNum);
        playerPattern |= Math.pow(2, cellNum);
        console.log(playerPattern);
        if(checkWin(playerPattern)) {
            console.log("Player wins");
            setTimeout(function () {
                restart();
            }, 2000);
        }
        else if(checkEndGame()) {
            console.log("Game is over");
            restart();
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
