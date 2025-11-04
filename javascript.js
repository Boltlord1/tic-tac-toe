const boardDOM = document.querySelector('.gameboard')
function Gameboard() {
    const board = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const getBoard = () => board
    const markCell = function(position, player) {
        board[position] = player.symbol
    }
    const displayBoard = function() {
        const cellsDOM = []
        for (let i = 0; i < 9; i++) {
            cellsDOM.push(document.createElement('div'))
            cellsDOM[i].classList.add('cell')
            boardDOM.appendChild(cellsDOM[i])
        }
    }
    return {getBoard, markCell, displayBoard}
}

function Game() {
    const players = [{user: 'Player One', symbol: true, string: 'X'},
        {user: 'Player Two', symbol: false, string: 'O'}]
    let active = players[0]
    const switchPlayer = () => active = active === players[0] ? players[1] : players[0]

    const gameboard = Gameboard()
    gameboard.displayBoard()

    let gameStatus = `${active.user}'s turn.`
    console.log(gameStatus)

    const cells = document.querySelectorAll('.cell')
    for (const [index, cell] of cells.entries()) {
        cell.addEventListener('click', function() {
            if (!gameStatus.includes('turn')) return console.log('Game is over')
            cell.textContent = active.string
            playRound(index)
        }, {once: true})
    }

    const playRound = function(position) {
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
        console.log(gameStatus)
    }   
    const getGameStatus = () => gameStatus
    return {playRound, getGameStatus}
}

const newGame = Game()