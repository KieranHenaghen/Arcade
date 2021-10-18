// As users playing a two player game we want to:

// enter our names and have them displayed
// have our order chosen for us by the game
// take alternating turns according to the rules
// pick a pit that has pips and is ours on our turn
// have those pips distributed correctly according to the rules of mancala
// capture opponent pips when we end in an empty pit on our side
// take an extra turn when we end in our mancala
// be told when a player wins or if there is a draw once all pips are in mancalas
// start the game over without having to reset the browser
// As a user playing a one player game I want to:

// see the name 'Computer' displayed as my opponent
// have the Computer player make moves as if it were a human player, obeying all the rules from the two player game
// As a user playing a single player game I would be delighted if:

// the computer made 'better-than-guessing' choices when choosing a pit for the next move

/* Game Loop:
// state
let initialState;

function buildInitialState() {

}

// render
function renderState() {

}

// maybe a dozen or so helper functions for tiny pieces of the interface

// listeners
function onBoardClick() {
  // update state, maybe with another dozen or so helper functions...

  renderState() // show the user the new state
}

$('.board').on('click', onBoardClick); // etc
*/


// Initial state
let board;
let p1;
let p2;
let turn;
let startGameButton = document.getElementById("startGame")
let turnMarker = document.getElementById("turn")
startGameButton.addEventListener("click", function() {

    if (confirm("Play with 2 Players?")) {
        p1 = prompt("Enter Player 1's username below:", "Player 1");
        p2 = prompt("Enter Player 2's username below:", "Player 2");
    } else {
        p1 = prompt("Enter Player 1's username below:", "Player 1");
        p2 = "CPU";
    }
    let p1User = document.getElementById("p1UserName");
    let p2User = document.getElementById("p2UserName");
    p1User.innerText = p1;
    p2User.innerText = p2;
    turnMarker.innerText = p1+"'s turn.";
    turn = 1;
    board = {
        pit1: 4,
        pit2: 4,
        pit3: 4,
        pit4: 4,
        pit5: 4,
        pit6: 4,
        p1Store: 0,
        pit7: 4,
        pit8: 4,
        pit9: 4,
        pit10: 4,
        pit11: 4,
        pit12: 4,
        p2Store: 0,
    };
    resetPips();
    addPips();
})

let pits = document.getElementsByClassName("pits");

let pits1 = document.getElementById("p1pits");
let pits2 = document.getElementById("p2pits");

let pit1 = document.getElementById("pit1")
let pit2 = document.getElementById("pit2")
let pit3 = document.getElementById("pit3")
let pit4 = document.getElementById("pit4")
let pit5 = document.getElementById("pit5")
let pit6 = document.getElementById("pit6")
let pit7 = document.getElementById("pit7")
let pit8 = document.getElementById("pit8")
let pit9 = document.getElementById("pit9")
let pit10 = document.getElementById("pit10")
let pit11 = document.getElementById("pit11")
let pit12 = document.getElementById("pit12")

let store1 = document.getElementById("p1Store")
let store2 = document.getElementById("p2Store")

let distributed;

// Gameplay Functions

function pipTaker(c) {
    if (c == 1) {
        board.p1Store = board.p1Store + board.pit12;
        board.pit12 = 0;
        removePips("pit12", "p1Store");
    }
    else if (c == 2) {
        board.p1Store = board.p1Store + board.pit11;
        board.pit11 = 0;
        removePips("pit11", "p1Store");
    }
    else if (c == 3) {
        board.p1Store = board.p1Store + board.pit10;
        board.pit10 = 0;
        removePips("pit10", "p1Store");
    }
    else if (c == 4) {
        board.p1Store = board.p1Store + board.pit9;
        board.pit9 = 0;
        removePips("pit9", "p1Store");
    }
    else if (c == 5) {
        board.p1Store = board.p1Store + board.pit8;
        board.pit8 = 0;
        removePips("pit8", "p1Store");
    }
    else if (c == 6) {
        board.p1Store = board.p1Store + board.pit7;
        board.pit7 = 0;
        removePips("pit7", "p1Store");
    }
    else if (c == 7) {
        board.p2Store = board.p2Store + board.pit6;
        board.pit6 = 0;
        removePips("pit6", "p2Store");
    }
    else if (c == 8) {
        board.p2Store = board.p2Store + board.pit5;
        board.pit5 = 0;
        removePips("pit5", "p2Store");
    }
    else if (c == 9) {
        board.p2Store = board.p2Store + board.pit4;
        board.pit4 = 0;
        removePips("pit4", "p2Store");
    }
    else if (c == 10) {
        board.p2Store = board.p2Store + board.pit3;
        board.pit3 = 0;
        removePips("pit3", "p2Store");
    }
    else if (c == 11) {
        board.p2Store = board.p2Store + board.pit2;
        board.pit2 = 0;
        removePips("pit2", "p2Store");
    }
    else if (c == 12) {
        board.p2Store = board.p2Store + board.pit1;
        board.pit1 = 0;
        removePips("pit1", "p2Store")
    }
    
}

function winChecker() {
    let p1Pits = (board.pit1 + board.pit2 + board.pit3 + board.pit4 + board.pit5 + board.pit6)
    let p2Pits = (board.pit7 + board.pit8 + board.pit9 + board.pit10 +board.pit11 + board.pit12)
    if (p1Pits == 0 && p2Pits == 0) {
        
    }
    else if (p1Pits == 0){
        for (let i=7; i<13; i++) {
            board.p2Store = board.p2Store + board["pit"+i];
            board["pit"+i] = 0;
            removePips("pit"+i, "p2Store")
        }
    }
    else if (p2Pits == 0){
        for (let i=1; i<7; i++) {
            board.p1Store = board.p1Store +board["pit"+i];
            board["pit"+i] = 0;
            removePips("pit"+i, "p1Store")
        }
    }
    
    if (board.p1Store > board.p2Store && p1Pits + p2Pits == 0) {
        turnMarker.innerText = p1+" wins."+" Score: "+board.p1Store+" to "+board.p2Store+".";
    }
    else if (board.p2Store > board.p1Store && p1Pits + p2Pits == 0) {
        turnMarker.innerText = p2+" wins."+" Score: "+board.p2Store+" to "+board.p1Store+".";
    }
    else if (board.p2Store == board.p1Store && p1Pits + p2Pits == 0) {
        turnMarker.innerText = "It's a draw.";
    }

}

// P1 Specific Functions

function distribution1 (c, pitNum) {
    let placeholder = board[pitNum];
    let store1Var = board["p1Store"];
    let storeAdd;
    while (placeholder > 0) {
        if ("pit"+c == "pit6" && placeholder > 0) {
            store1Var = store1Var + 1;
            placeholder = placeholder - 1;
            storeAdd = true;
            movePips(pitNum, "p1Store");
        }
        else if ("pit"+c == "pit12") {
            c = 0;
        }
        if (placeholder !== 0){
        c += 1;
        board["pit"+c] = board["pit"+c] +1;
        placeholder -= 1;
        movePips(pitNum, "pit"+c);
        }
    }
    board[pitNum] = placeholder;
    board.p1Store = store1Var;

    if (board["pit"+c] == 1) {
        if (c<6) {
            pipTaker(c);
            turnMarker.innerText = p2+"'s turn.";
            turn = 2;
        }
        else if (c == 6 && storeAdd !== true) {
            pipTaker(c);
            turnMarker.innerText = p2+"'s turn.";
            turn = 2;
        }
    }
    else if (storeAdd == true && c == 6) {
        turnMarker.innerText = p1+"'s turn.";
        winChecker();
        turn = 1
    }
    else {
        turnMarker.innerText = p2+"'s turn.";
        turn = 2;
    }
    console.log(board)
    console.log(turnMarker.innerText, turn)
    winChecker();
    
}

function pitChoice1(event) {
    if (turn == 1) {
        if (event.target == pit1 && board.pit1 > 0) {
            distribution1(1, "pit1");            
        }
        else if (event.target == pit2 && board.pit2 > 0) {
            distribution1(2, "pit2");
        }
        else if (event.target == pit3 && board.pit3 > 0) {
            distribution1(3, "pit3");
        }
        else if (event.target == pit4 && board.pit4 > 0) {
            distribution1(4, "pit4");
        }
        else if (event.target == pit5 && board.pit5 > 0) {
            distribution1(5, "pit5");
        }
        else if (event.target == pit6 && board.pit6 > 0) {
            distribution1(6, "pit6");
        }
        else {
            return
        }
        if (turn == 2) {
            cpuChoice();
        }
    }
    else {
        return
    }
}
pits1.addEventListener("click", pitChoice1)

// P2 Specific Functions

function distribution2 (c, pitNum) {
    let placeholder = board[pitNum];
    let store2Var = board["p2Store"];
    let storeAdd;
    console.log(pitNum, c, board["pit"+c])
    while (placeholder > 0) {
        if ("pit"+c == "pit12") {
            store2Var = store2Var + 1;
            placeholder = placeholder - 1;
            storeAdd = true;
            c = 0;
            movePips(pitNum, "p2Store");
        }
        if (placeholder !== 0){
            c += 1;
            board["pit"+c] = board["pit"+c] + 1;
            placeholder -= 1;
            movePips(pitNum, "pit"+c)
        }
    }
    console.log(board[pitNum])
    board[pitNum] = placeholder;
    board.p2Store = store2Var;

    if (board["pit"+c] == 1 && c < 13 && c > 6) {
        pipTaker(c);
        turnMarker.innerText = p1+"'s turn.";
        turn = 1;

    }
    else if (storeAdd = true && c == 0) {
        turnMarker.innerText = p2+"'s turn.";
        winChecker();
        turn = 2;
    }
    else {
        turnMarker.innerText = p1+"'s turn.";
        turn = 1;
    }
    distributed = true;
    console.log(board)
    console.log(turnMarker.innerText, turn)
    winChecker();
    

}

function pitChoice2(event) {
    if (turn == 2 && turnMarker.innerText !== "CPU"+"'s turn.") {
        if (event.target == pit7 && board.pit7 > 0) {
            distribution2(7, "pit7");            
        }
        else if (event.target == pit8 && board.pit8 > 0) {
            distribution2(8, "pit8");
        }
        else if (event.target == pit9 && board.pit9 > 0) {
            distribution2(9, "pit9");
        }
        else if (event.target == pit10 && board.pit10 > 0) {
            distribution2(10, "pit10");
        }
        else if (event.target == pit11 && board.pit11 > 0) {
            distribution2(11, "pit11");
        }
        else if (event.target == pit12 && board.pit12 > 0) {
            distribution2(12, "pit12");
        }
        else {
            return
        }
    }
    else {
        return
    }
}
pits2.addEventListener("click", pitChoice2)

// CPU player

function twoTurns() {
    if (board.pit12 == 1 || board.pit12 == 14) {
        distribution2(12, "pit12");
        cpuChoice();
    }
    else if (board.pit11 == 2 || board.pit11 == 15) {
        distribution2(11, "pit11");
        cpuChoice();
    }
    else if (board.pit10 == 3 || board.pit10 == 16) {
        distribution2(10, "pit10");
        cpuChoice();
    }
    else if (board.pit9 == 4 || board.pit9 == 17) {
        distribution2(9, "pit9");
        cpuChoice();
    }
    else if (board.pit8 == 5 || board.pit8 == 18) {
        distribution2(8, "pit8");
        cpuChoice();
    }
    else if (board.pit7 == 6 || board.pit7 == 19) {
        distribution2(7, "pit7");
        cpuChoice();
    }
}

function pipChecker() {
    if (board.pit7 == 0 && board.pit6 > 0) {
        if (board.pit12 == 8) {
            distribution2(12, "pit12")
        }
        else if (board.pit11 == 9) {
            distribution2(11, "pit11");
        }
        else if (board.pit10 == 10) {
            distribution2(10, "pit10");
        }
        else if (board.pit9 == 11) {
            distribution2(9, "pit9");
        }
        else if (board.pit8 == 12) {
            distribution2(8, "pit8");
        }
    }
    else if (board.pit8 == 0 && board.pit5 > 0) {
        if (board.pit12 == 9) {
            distribution2(12, "pit12")
        }
        else if (board.pit11 == 10) {
            distribution2(11, "pit11");
        }
        else if (board.pit10 == 11) {
            distribution2(10, "pit10");
        }
        else if (board.pit9 == 12) {
            distribution2(9, "pit9");
        }
        else if (board.pit7 == 1 || board.pit7 == 14) {
            distribution2(7, "pit7");
        }
    }
    else if (board.pit9 == 0 && board.pit4 > 0) {
        if (board.pit12 == 10) {
            distribution2(12, "pit12")
        }
        else if (board.pit11 == 11) {
            distribution2(11, "pit11");
        }
        else if (board.pit10 == 12) {
            distribution2(10, "pit10");
        }
        else if (board.pit8 == 1 || board.pit8 == 14) {
            distribution2(8, "pit8");
        }
        else if (board.pit7 == 2 || board.pit7 == 15) {
            distribution2(7, "pit7");
        }
    }
    else if (board.pit10 == 0 && board.pit3 > 0) {
        if (board.pit12 == 11) {
            distribution2(12, "pit12")
        }
        else if (board.pit11 == 12) {
            distribution2(11, "pit11");
        }
        else if (board.pit9 == 1 || board.pit9 == 14) {
            distribution2(9, "pit9");
        }
        else if (board.pit8 == 2 || board.pit8 == 15) {
            distribution2(8, "pit8");
        }
        else if (board.pit7 == 3 || board.pit7 == 16) {
            distribution2(7, "pit7");
        }
    }
    else if (board.pit11 == 0 && board.pit2 > 0) {
        if (board.pit12 == 12) {
            distribution2(12, "pit12")
        }
        else if (board.pit10 == 1 || board.pit10 == 14) {
            distribution2(10, "pit10");
        }
        else if (board.pit9 == 2 || board.pit9 == 15) {
            distribution2(9, "pit9");
        }
        else if (board.pit8 == 3 || board.pit8 == 16) {
            distribution2(8, "pit8");
        }
        else if (board.pit7 == 4 || board.pit7 == 17) {
            distribution2(7, "pit7");
        }
    }
    else if (board.pit12 == 0 && board.pit1 > 0) {
        if (board.pit11 == 1 || board.pit11 == 14) {
            distribution2(11, "pit11");
        }
        else if (board.pit10 == 2 || board.pit10 == 15) {
            distribution2(10, "pit10");
        }
        else if (board.pit9 == 3 || board.pit9 == 16) {
            distribution2(9, "pit9");
        }
        else if (board.pit8 == 4 || board.pit8 == 17) {
            distribution2(8, "pit8");
        }
        else if (board.pit7 == 5 || board.pit7 == 18) {
            distribution2(7, "pit7");
        }
    }
}

function cpuChoice() {
    console.log(board)
    console.log(turnMarker.innerText)

    if (turnMarker.innerText == "CPU's turn.") {
        distributed = false;
        twoTurns();
        pipChecker();
        if (distributed !== true) {
            let largestPit = board["pit"+7];
            let largestPitNum = "pit"+7;
            let iLargest = 7;
            for (let i =8; i<13; i++) {
                
                if (largestPit < board["pit"+i]) {
                    largestPit = board["pit"+i];
                    largestPitNum = "pit"+i
                    iLargest = i;
                }
            
            }
            distribution2(iLargest, largestPitNum)
        }
    }
}

// Pip

function addPips() {

    for (let key in board) {
        for (let j = 0; j<board[key]; j++) {
            const pip = document.createElement('img');
            pip.src = "indigo.png";
            pip.style.height = '10px';
            pip.style.width = '10px';
            pip.style.borderRadius = '10px';
            
            document.getElementById(key).appendChild(pip);
            
        }
    }
}
function movePips(pitOrigin, pitNew) {
    let pips = document.getElementById(pitOrigin).getElementsByTagName('img');
    document.getElementById(pitNew).appendChild(pips[0])
}

function removePips(pitOrigin, pitNew) {
    let pipsId = document.getElementById(pitOrigin)
    let pips = pipsId.getElementsByTagName('img');
    while (pips.length>0) {
        console.log(pips);
        document.getElementById(pitNew).appendChild(pips[0])
    }
}
function resetPips() {
    let boardArr = [p1Store, p2Store, pit1, pit2, pit3, pit4, pit5, pit6, pit7, pit8, pit9, pit10, pit11, pit12]
    for (let i=0; i<boardArr.length; i++) {
        let pips = boardArr[i].getElementsByTagName('img');

        while(pips.length>0) {
            console.log(boardArr, pips)
            boardArr[i].removeChild(pips[0]);
        }
        
    }

}