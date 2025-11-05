const boardDOM = document.querySelector('.gameboard')

function Gameboard() {
    const board = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const getBoard = () => board
    const markCell = function(position, value) {
        board[position] = value
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

function Game(array) {
    let value = true
    let active = array[0]
    const getActivePlayer = () => active
    const switchPlayer = function () {
        active = active === array[0] ? array[1] : array[0]
        value = value === true ? false : true
    }

    const gameboard = Gameboard()
    gameboard.displayBoard()

    let gameStatus = `${active.getUsername()}'s turn.`
    const getGameStatus = () => gameStatus

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
            console.log(`${array[0].getUsername()} - ${array[0].getScore()} vs. ${array[1].getScore()} - ${array[1].getUsername()}`)
        } else if (b.filter((item) => typeof item !== 'boolean') == false) {
            gameStatus = 'Draw!'
            console.log(gameStatus)
        } else {
            switchPlayer()
            gameStatus = `${active.getUsername()}'s turn.`
        }
    }

    const endGame = function() {
        cells.forEach((cell) => cell.remove())
    }
    return {playRound, getGameStatus, getActivePlayer, endGame}
}

let counter = 0
let currentPlayers = []
const currentGames = []
let currentMatchup = []

const list = document.querySelector('.list')
function Matchup(players) {
    const matchup = document.createElement('li')
    matchup.classList.add('matchup')
    const matchHeader = document.createElement('h2')
    matchHeader.textContent = `${players[0].getUsername()} (${players[0].getScore()}) vs. ${players[1].getUsername()} (${players[1].getScore()})`
    list.appendChild(matchup)
    matchup.appendChild(matchHeader)

    let matchCount = 1
    const appendMatch = function(winner) {
        const match = document.createElement('li')
        match.classList.add('match')
        match.textContent = `${matchCount}. ${winner} won!`
        matchup.appendChild(match)
        matchHeader.textContent = `${players[0].getUsername()} (${players[0].getScore()}) vs. ${players[1].getUsername()} (${players[1].getScore()})`
        matchCount++
    }

    return {appendMatch}
}

const form = document.querySelector('.form')
form.addEventListener('submit', createPlayers)
function createPlayers(event) {
    event.preventDefault()
    const formData = new FormData(form)
    const oneName = formData.get('one-name')
    const oneSymbol = formData.get('one-symbol')
    const twoName = formData.get('two-name')
    const twoSymbol = formData.get('two-symbol')
    const playerOne = Player(oneName, oneSymbol)
    const playerTwo = Player(twoName, twoSymbol)
    currentPlayers = [playerOne, playerTwo]
    currentMatchup = Matchup(currentPlayers)
    currentGames.push(Game(currentPlayers))
}

const newButton = document.querySelector('.new')
newButton.addEventListener('click', function() {
    currentMatchup.appendMatch(currentGames[counter].getActivePlayer().getUsername())
    currentGames[counter].endGame()
    counter++
    currentGames.push(Game(currentPlayers))
})
const submitButton = document.querySelector('.submit')
submitButton.addEventListener('click', function() {
    if (currentGames != false) currentGames[counter].endGame()
    currentPlayers.length = 0
    currentGames.length = 0
    counter = 0
})