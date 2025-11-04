function Cell() {
    let value = 0
    let marked = false
    const mark = function(symbol) {
        value = symbol
        marked = true
    }
    const getStatus = function() {
        return {value, marked}
    }
    return {mark, getStatus}
}

function Gameboard() {
    const board = []
    for (let i = 0; i < 9; i++) {
        board.push(Cell())
    }
    const getBoard = () => board

    const markCell = function(position, player) {
        if (board[position].getStatus().marked === false) {
            board[position].mark(player.symbol)
            return false
        } else {
            return true
        }
    }
    const displayBoard = function() {
        const simpleBoard = board.map((cell) => cell.getStatus().value)
        console.log(simpleBoard[0], simpleBoard[1], simpleBoard[2])
        console.log(simpleBoard[3], simpleBoard[4], simpleBoard[5])
        console.log(simpleBoard[6], simpleBoard[7], simpleBoard[8])
    }
    return {getBoard, markCell, displayBoard}
}

function Game(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
    const players = [{user: playerOneName, symbol: 1},
        {user: playerTwoName, symbol: 2}]
    console.log(`${players[0].user} as ${players[0].symbol} vs. ${players[1].user} as ${players[1].symbol} `)
    const newBoard = Gameboard()
    let active = players[0]
    const getActivePlayer = () => active.user
    const switchTurn = () => active = active === players[0] ? players[1] : players[0]

    const playRound = function(position) {
        if (newBoard.markCell(position, active)) {
            return console.log('Try again')
        }
        newBoard.displayBoard()
        switchTurn()
    }
    return {playRound, getActivePlayer}
}

const newGame = Game()