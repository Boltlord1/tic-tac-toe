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

function winChecker(board) {
    let values = board.map((item) => item.getStatus())
    if (values[0].value === values[1].value && values[2].value === values[1].value && values[1].marked ||
        values[3].value === values[4].value && values[5].value === values[4].value && values[4].marked ||
        values[6].value === values[7].value && values[8].value === values[7].value && values[7].marked ||
        values[0].value === values[3].value && values[6].value === values[3].value && values[3].marked ||
        values[1].value === values[4].value && values[7].value === values[4].value && values[4].marked ||
        values[2].value === values[5].value && values[8].value === values[5].value && values[5].marked ||
        values[0].value === values[4].value && values[8].value === values[4].value && values[4].marked ||
        values[2].value === values[4].value && values[6].value === values[4].value && values[4].marked) {
        return 2
    } else if (values.filter((item) => !item.marked) == false) {
        return 1
    } else {
        return 0
    }
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
            return console.log('Invalid position, try again')
        }
        newBoard.displayBoard()
        const winCheck = winChecker(newBoard.getBoard(), moveCount)
        if (winCheck === 2) {
            console.log(`${active.user} won!`)
        } else if (winCheck === 1) {
            console.log('Draw!')
        }
        switchTurn()
    }
    return {playRound, getActivePlayer}
}

const newGame = Game()