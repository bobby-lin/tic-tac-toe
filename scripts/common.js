/**
 * Created on: 29/12/15
 *     Author: Bobby Lin
 */
    
const WINNING_PATTERN = [7, 56, 448, 292, 146, 73, 273, 84]; // Binary converts to Decimal
var player;
var computer;
var possibleMoves = [1,2,3,4,5,6,7,8,9];

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
    console.log("Game is over");
    $("td").html("");
    possibleMoves = [1,2,3,4,5,6,7,8,9];
    playGame();
}

function computerNextMove() {
    var length = possibleMoves.length;
    var randomIndex = Math.floor(Math.random() * (length));
    var cellNum = possibleMoves[randomIndex];
    var hash = "#" + "cell-" + cellNum;
    possibleMoves.splice(randomIndex, 1);
    $(hash).html(computer);
    checkWin();
    checkEndGame();
}

$('td').click(function() {
    var cellNum = parseInt(this.id.split("-")[1]);
    var hash = "#" + this.id;
    if($(hash).html() === "") {
        $(hash).html(player);
        removePositionFromBoard(cellNum);
        computerNextMove();
        checkWin();
    }
    else {
        console.log("Invalid move");
    }
    checkEndGame();
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
    if(length === 0) {
        setTimeout(function () {
            $('#page-mask').show();
            setTimeout(function () {
                $('#page-mask').hide();
                restart();
            }, 2000);
        },1000);
    }
}

function checkWin(pattern, cellNum) {
    
}
