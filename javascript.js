function Gameboard() {
    const board = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const getBoard = () => board
    const markCell = function(position, player) {
        board[position] = player.symbol
    }
    const displayBoard = function() {
        console.log(board[0], board[1], board[2])
        console.log(board[3], board[4], board[5])
        console.log(board[6], board[7], board[8])
    }
    return {getBoard, markCell, displayBoard}
}

function Game() {
    const players = [{user: 'Player One', symbol: true},
        {user: 'Player Two', symbol: false}]
    const gameboard = Gameboard()
    let active = players[0]
    const getActivePlayer = () => active.user
    const switchPlayer = () => active = active === players[0] ? players[1] : players[0]

    let gameStatus = `${active.user}'s turn.`
    console.log(gameStatus)

    const playRound = function(position) {
        if (!gameStatus.includes('turn')) {
            return console.log('Game is over.')
        }
        gameboard.markCell(position, active)
        findGameStatus()
        }
    function findGameStatus() {
        const b = gameboard.getBoard()
        if (b[0] === b[1] && b[2] === b[1] ||
            b[3] === b[4] && b[5] === b[4] ||
            b[6] === b[7] && b[8] === b[7] ||
            b[0] === b[3] && b[6] === b[3] ||
            b[1] === b[4] && b[7] === b[4] ||
            b[2] === b[5] && b[8] === b[5] ||
            b[0] === b[4] && b[8] === b[4] ||
            b[2] === b[4] && b[6] === b[4]) {
            gameStatus = `${active.user} won!`
        } else if (b.filter((item) => typeof item !== 'boolean') == false) {
            gameStatus = 'Draw!'
        } else {
            switchPlayer()
            gameStatus = `${active.user}'s turn.`
        }
        gameboard.displayBoard()
        console.log(gameStatus)
    }   
    const getGameStatus = () => gameStatus
    return {playRound, getActivePlayer, getGameStatus}
}

const newGame = Game()