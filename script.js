// To Do:

// Notes:
// - if you need only one of something, use a module
// - if you need multiples of something, use a factory

const gameBoard = (() => { // TTT board
    // board[0][0], board[0][1], board[0][2]
    // board[1][0], board[1][1], board[1][2]
    // board[2][0], board[2][1], board[2][2]
    const board = [];
    for (let x = 0; x < 3; x++) {
        board[x] = [];
        for (let y = 0; y < 3; y++) {
            board[x].push(createCell(""));
        }
    }

    // function placeTile() {

    // }

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.value));
        console.log("Updated Board:")
        return console.log(boardWithValues);
        // return console.log(board);
    }

    // const resetBoard = () => {
    //     // for ()
    //     return console.log("Board has been reset")
    // }

    return {
        getBoard,
        printBoard,
        resetBoard,
        //another function here
    };
})();

function createCell(value) {
    return {
        value: value,

        getValue() {
            return value;
        },
    };
}

const gameController = (() => { // Keeps track of whose turn it is
    const player1 = {
        name: "Jeff",
        value: "X"
    };
    const player2 = {
        name: "Sally",
        value: "O"
    };
    const players = [player1, player2];
    let activePlayer = players[0];

    const switchActivePlayer = () => {
        activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];
        console.log("Switching activePlayer to: " + activePlayer.name);
        return;
    }

    const getActivePlayer = () => {
        console.log("activePlayer is: " + activePlayer.name);
        return activePlayer;
    }

    const placeTile = (row, column) => {
        console.log(activePlayer.name + " is placing a tile at: [" + row + "]["+ column + "]")
        gameBoard.getBoard()[row][column].value = activePlayer.value;
        gameBoard.printBoard();
        switchActivePlayer();
        return;
    }

    return {
        players,
        activePlayer,
        switchActivePlayer,
        getActivePlayer,
        placeTile,
    }
})();

// const player1 = Player("jeff");
// const player2 = Player("sally");

