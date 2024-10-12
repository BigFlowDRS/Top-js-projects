const gameboard = (function(){
    let arr = [["", "",""],["", "",""],["", "",""]];

    return {arr};
})();

function player(name){
    let score = 0;

    const increase_score = () => score++;
    const get_score = () => score;
    // const get_score = function(){
    //     return score;
    // }

    return {name, get_score, increase_score};
}

const game = (function(){
    let turn = 0;
    let curr_turn = turn;

    const p0 = document.querySelector(".player0");
    const p0_scr = document.querySelector(".p0_score");

    const p1 = document.querySelector(".player1");
    const p1_scr = document.querySelector(".p1_score");

    const turn_indicator = document.querySelector(".turn");

    const player0 = player(p0.value);
    const player1 = player(p1.value);

    function reset_game(){
        let result = "";

        if(player0.get_score() > player1.get_score()){
            result = `${player0.name} wins the game`;
        }else{
            result = `${player1.name} win the game`;
        }

        const game_result_screen = document.createElement('div');
        game_result_screen.innerHTML = result;

        game_result_screen.classList.add("round_result");
        game_result_screen.classList.add("reset_screen");
        const reset_button = document.createElement('button');
        reset_button.innerHTML = "Reset";
        reset_button.addEventListener("click",removeResult)

        game_result_screen.appendChild(reset_button);

        document.body.appendChild(game_result_screen);
        document.body.classList.add("no-interaction");

        function removeResult() {
            console.log("hiiii")
            location.reload();
        }
    }

    const display_gameboard = function(){
        let i = 0;
        const game_board = document.querySelector(".game_board");
        game_board.innerHTML = "";
    
        gameboard.arr.forEach(element => {
            element.forEach(marker => {
                const block = document.createElement('div');
                block.innerHTML = marker;
                block.classList.add("box");
                block.id = i;
                block.addEventListener("click", move);
                game_board.appendChild(block);
                i++;
            })
        });
    };

    function winner(curr_turn_){
        if(curr_turn_ === 0){
            player0.increase_score();
        }else{
            player1.increase_score();
        }

        p0_scr.innerHTML = player0.get_score();
        p1_scr.innerHTML = player1.get_score();

    }

    function display_result(w){
        let result = "";

        if(w == 0){
            result = `${p0.value} win`;
        }else if(w == 1){
            result = `${p1.value} win`;
        }else{
            result = "Draw";
        }

        const result_screen = document.createElement('div');
        result_screen.innerHTML = result;

        result_screen.classList.add("round_result");

        document.body.appendChild(result_screen);

        document.body.classList.add("no-interaction");

        function removeResultScreen() {
            result_screen.remove(); 
            document.body.classList.remove("no-interaction");
            document.removeEventListener('keydown', onSpacePress);
            document.removeEventListener('click', removeResultScreen);
            reset();
        }

        function onSpacePress(event) {
            if (event.code === 'Space') {
                removeResultScreen();
            }
        }

        setTimeout(() => {
            document.addEventListener('click', removeResultScreen);
            document.addEventListener('keydown', onSpacePress);
        }, 100);
        
    }

    function reset(){
        turn++;
        curr_turn = 0;
        gameboard.arr = [["", "",""],["", "",""],["", "",""]];
        display_gameboard();
    }

    function CheckWinner(){
        console.log("hihi")
        if (
            (gameboard.arr[0][0] === gameboard.arr[0][1] && gameboard.arr[0][1] === gameboard.arr[0][2] && gameboard.arr[0][2] !== "") ||
            (gameboard.arr[1][0] === gameboard.arr[1][1] && gameboard.arr[1][1] === gameboard.arr[1][2] && gameboard.arr[1][2] !== "") ||
            (gameboard.arr[2][0] === gameboard.arr[2][1] && gameboard.arr[2][1] === gameboard.arr[2][2] && gameboard.arr[2][2] !== "") ||
            (gameboard.arr[0][0] === gameboard.arr[1][0] && gameboard.arr[1][0] === gameboard.arr[2][0] && gameboard.arr[2][0] !== "") ||
            (gameboard.arr[0][1] === gameboard.arr[1][1] && gameboard.arr[1][1] === gameboard.arr[2][1] && gameboard.arr[2][1] !== "") ||
            (gameboard.arr[0][2] === gameboard.arr[1][2] && gameboard.arr[1][2] === gameboard.arr[2][2] && gameboard.arr[2][2] !== "") ||
            (gameboard.arr[0][0] === gameboard.arr[1][1] && gameboard.arr[1][1] === gameboard.arr[2][2] && gameboard.arr[2][2] !== "") ||
            (gameboard.arr[0][2] === gameboard.arr[1][1] && gameboard.arr[1][1] === gameboard.arr[2][0] && gameboard.arr[2][0] !== "")
        ){
            winner((turn+curr_turn+1)%2);

            console.log(player0.get_score(), player1.get_score());

            if(player0.get_score() >= 3 || player1.get_score() >= 3){
                reset_game();
                return;
            }else{
                display_result((turn+curr_turn+1)%2);
            }
        }
    }

    function move(event){
        if(event.target.innerHTML !== ""){
            return;
        }
        let e_id = parseInt(event.target.id);

        if((curr_turn + turn)%2 == 0){
            event.target.innerHTML = "X";
            gameboard.arr[Math.floor(e_id/3)][e_id%3] = "X";
        }else{
            event.target.innerHTML = "O";
            gameboard.arr[Math.floor(e_id/3)][e_id%3] = "O";
        }
        curr_turn++;

        CheckWinner();

        if(curr_turn == 9){
            display_result(2);
            reset();
        }

        if((turn + curr_turn)%2 == 0){
            turn_indicator.innerHTML = `${player0.name}'s turn`;
        }else{
            turn_indicator.innerHTML = `${player1.name}'s turn`
        }        
    }

    display_gameboard();
    turn_indicator.innerHTML = `${player0.name}'s turn`;
})();

