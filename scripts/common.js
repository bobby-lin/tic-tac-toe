/**
 * Created on: 29/12/15
 *     Author: Bobby Lin
 */

var player;
var computer;
var boardPosition = [1,2,3,4,5,6,7,8,9];

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
    boardPosition = [1,2,3,4,5,6,7,8,9];
    playGame();
}

function computerNextMove() {
    var length = boardPosition.length;
    var randomIndex = Math.floor(Math.random() * (length));
    console.log(boardPosition[randomIndex]);
    var hash = "#" + "cell-" + boardPosition[randomIndex];
    boardPosition.splice(randomIndex, 1);
    $(hash).html(computer);
    console.log(boardPosition);
    checkEndGame();
}

$('td').click(function() {
    var index = parseInt(this.id.split("-")[1]);
    var hash = "#" + this.id;
    if($(hash).html() === "") {
        $(hash).html(player);
        removePositionFromBoard(index);
        computerNextMove();
    }
    else {
        console.log("Invalid move");
    }
    checkEndGame();
});

function removePositionFromBoard(p) {
    for(var i = 0; i < boardPosition.length; i++) {
        if(boardPosition[i] === p) {
            console.log("Removed " + p + " Successfully");
            boardPosition.splice(i, 1);
            break;
        }
    }
}

function checkEndGame() {
    var length = boardPosition.length;
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
