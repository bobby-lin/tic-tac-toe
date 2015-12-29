/**
 * Created on: 29/12/15
 *     Author: Bobby Lin
 */

function startGame() {
    $('#menu').addClass('.hidden');
}

function start(choice) {
    console.log(choice);
    setTimeout(function(){
        $('#select-menu').remove();
        $('#page-mask').remove();
    }, 200);
}
