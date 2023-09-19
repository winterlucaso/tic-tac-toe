// To Do:

// Notes:
// - if you need only one of something, use a module
// - if you need multiples of something, use a factory

const gameBoard = (() => { // TTT board
    // board[0][0], board[0][1], board[0][2]
    // board[1][0], board[1][1], board[1][2]
    // board[2][0], board[2][1], board[2][2]
    const board = [];
    initializeBoard();
    function initializeBoard() {
        for (let x = 0; x < 3; x++) {
            board[x] = [];
            for (let y = 0; y < 3; y++) {
                board[x].push(createCell(""));
            }
        }
    };

    const getBoard = () => board;

    const printBoard = () => {
        const boardWithValues = board.map((row) => row.map((cell) => cell.value));
        console.log("Updated Board:")
        return console.log(boardWithValues);
    }

    const resetBoard = () => {
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                board[x][y].value = "";
            }
        }
        return console.log("Board has been reset")
    }

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

const gameController = (() => { // Keeps track of game logic
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

    const placeSign = (row, column) => {
        // Do nothing if the sign is already filled
        if (gameBoard.getBoard()[row][column].value !== "") {
            console.log("This sign is taken");
            return;
        }

        // Place sign
        console.log(activePlayer.name + " is placing a sign at: [" + row + "]["+ column + "]");
        gameBoard.getBoard()[row][column].value = activePlayer.value;
        gameBoard.printBoard();

        // Check game state
        if (checkWin(row, column)) {
            //Game End Protocol
            ScreenController.endgameMenu();
            ScreenController.updateScreen();
        }
        else if (checkTie()) {
            //Game End Protocol
            ScreenController.updateScreen();
        }
        else {
            switchActivePlayer();
            ScreenController.updateScreen();
        }
        return;
    }

    // Return true if game is won at placed tile
    const checkWin = (row, column) => {
        const gameWon = 
            // Check row of placed sign for win
            (((gameBoard.getBoard()[row][0].value === gameBoard.getBoard()[row][1].value) && (gameBoard.getBoard()[row][0].value === gameBoard.getBoard()[row][2].value))
            // Check column of placed sign for win
            || ((gameBoard.getBoard()[0][column].value === gameBoard.getBoard()[1][column].value) && (gameBoard.getBoard()[0][column].value === gameBoard.getBoard()[2][column].value))
            // Diagonals win false if middle tile value is empty
            || ((gameBoard.getBoard()[1][1].value !== "")
                // Check first diagonal
                && (((gameBoard.getBoard()[0][0].value === gameBoard.getBoard()[1][1].value) && (gameBoard.getBoard()[0][0].value === gameBoard.getBoard()[2][2].value))
                // Check second diagonal
                || ((gameBoard.getBoard()[0][2].value === gameBoard.getBoard()[1][1].value) && (gameBoard.getBoard()[0][2].value === gameBoard.getBoard()[2][0].value)))));

        console.log("checkWin: " + gameWon);
        return gameWon;
    }

    const checkTie = () => {
        for (let x = 0; x < 3; x++) {
            for (let y = 0; y < 3; y++) {
                if (gameBoard.getBoard()[x][y].value === "") {
                    console.log("checkTie: false")
                    return false;
                }
            }
        }
        console.log("checkTie: true")
        return true;
    }

    return {
        switchActivePlayer,
        getActivePlayer,
        placeSign,
        checkWin,
        checkTie,
    }
})();

const ScreenController = (() => {
    // const game = GameController();
    const playerTurnDiv = document.querySelector('#turn');
    const boardDiv = document.querySelector('#board');

    const board = gameBoard.getBoard();

    const updateScreen = () => {
        const activePlayer = gameController.getActivePlayer();

        // Clear the board
        boardDiv.textContent = "";

        // Display players turn
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        // Iterate through board to add elements
        for (let row = 0; row < 3; row++) {
            for (let column = 0; column < 3; column++) {
                // Anything clickable should be a button!!
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                // Apply the correct sign
                cellButton.innerText = board[row][column].value;
                boardDiv.appendChild(cellButton);
            }
        }
    }

    const endgameMenu = (outcome) => {
        // Show endgame menu
        const endgameMenu = document.querySelector("#endgame-menu");
        endgameMenu.showModal();

        // const updateEndgameMsg = () => {

        // }

        // Restart Button
        const restartBtn = document.querySelector("#restartBtn");
        restartBtn.addEventListener("click", () => {
            gameBoard.resetBoard();
            ScreenController.updateScreen();
            endgameMenu.close();
        });
        return;
    }

    return {
        updateScreen,
        endgameMenu,

    }

})();

ScreenController.updateScreen();