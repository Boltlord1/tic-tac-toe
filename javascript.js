function Gameboard() {
    const board = []
    for (let i = 0; i < 9; i++) {
        board.push({value: i, dom: document.createElement('button')})
    }
    const getBoard = () => board.map((item) => item.value)
    const getDisplay = () => board.map((item) => item.dom)
    const markCell = function(position, value) {
        board[position].value = value
    }
    
    return {getBoard, getDisplay, markCell}
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

    let gameStatus = 0
    const getGameStatus = () => gameStatus
    const endGame = function() {
        if (gameStatus === 0) gameStatus = 1
        domController.disableCells(gameboard.getDisplay())
    }

    const playRound = function(position, cell) {
        if (gameStatus !== 0) return
        gameboard.markCell(position, value)
        cell.textContent = active.getSymbol()
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
            gameStatus = 2
            active.incrementScore()
            endGame()
            console.log(`${array[0].getUsername()} - ${array[0].getScore()} vs. ${array[1].getScore()} - ${array[1].getUsername()}`)
        } else if (b.filter((item) => typeof item !== 'boolean') == false) {
            gameStatus = 1
            endGame()
        } else {
            switchPlayer()
        }
    }

    domController.displayBoard(gameboard.getDisplay(), playRound)
    return {playRound, getGameStatus, getActivePlayer, endGame}
}

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



const domController = (function() {
    const boardDOM = document.querySelector('.gameboard')
    const displayBoard = function(array, func) {
        for (const [index, cell] of array.entries()) {
            cell.classList.add('cell')
            boardDOM.appendChild(cell)
            cell.addEventListener('click', function() {
                func(index, cell)
            })
        }
    }

    const disableCells = function(array) {
        for (const cell of array) {
            cell.setAttribute('disabled', true)
        }
    }

    /* const form = document.querySelector('.form')
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
    } */
   
    return {displayBoard, disableCells}
})()

const newGame = Game([Player('Bruce', 'X'), Player('Rob', 'O ')])