const boardDOM = document.querySelector('.gameboard')

function Gameboard() {
    const board = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const getBoard = () => board
    const markCell = function(position, player) {
        board[position] = player.value
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

function Player(name, sym) {
    const username = name
    const symbol = sym
    let score = 0
    
    const getUsername = () => username
    const getSymbol = () => symbol
    const getScore = () => score
    const incrementScore = function() {score++}

    return {getUsername, getSymbol, getScore, incrementScore}
}

function Game(pX, pO) {
    pX.value = true
    pO.value = false
    let active = pX
    const switchPlayer = () => active = active === pX? pO : pX

    const gameboard = Gameboard()
    gameboard.displayBoard()

    let gameStatus = `${active.getUsername()}'s turn.`
    const getGameStatus = () => gameStatus
    console.log(gameStatus)

    const cells = document.querySelectorAll('.cell')
    for (const [index, cell] of cells.entries()) {
        cell.addEventListener('click', function() {
            if (!gameStatus.includes('turn')) return
            cell.textContent = active.getSymbol()
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
            gameStatus = `${active.getUsername()} won!`
            active.incrementScore()
            console.log(`${pX.getUsername()} - ${pX.getScore()} vs. ${pO.getScore()} - ${pO.getUsername()}`)
        } else if (b.filter((item) => typeof item !== 'boolean') == false) {
            gameStatus = 'Draw!'
        } else {
            switchPlayer()
            gameStatus = `${active.getUsername()}'s turn.`
        }
        console.log(gameStatus)
    }

    const endGame = function() {
        cells.forEach((cell) => cell.remove())
    }
    return {playRound, getGameStatus, endGame}
}

const bruce = Player('Bruce', 'X')
const rob = Player('Rob', 'O')

const games = [Game(bruce, rob)]
let counter = 0
const newButton = document.querySelector('.new')
newButton.addEventListener('click', function() {
    games[counter].endGame()
    counter++
    games.push(Game(bruce, rob))
})