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

function Game(pX, pO) {
    let value = true
    let active = pX
    const getActivePlayer = () => active
    const switchPlayer = function () {
        active = active === pX ? pO : pX
        value = value === true ? false : true
    }

    const gameboard = Gameboard()
    let gameStatus = 0
    const getGameStatus = () => gameStatus
    const endGame = function() {
        if (gameStatus === 0) gameStatus = 1
        MatchController.getMatchup()(gameStatus, active)
        DomController.disableCells(gameboard.getDisplay())
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
            console.log(`${pX.getUsername()} - ${pX.getScore()} vs. ${pO.getScore()} - ${pO.getUsername()}`)
        } else if (b.filter((item) => typeof item !== 'boolean') == false) {
            gameStatus = 1
            endGame()
        } else {
            switchPlayer()
        }
    }

    DomController.displayBoard(gameboard.getDisplay(), playRound)
    return {playRound, getGameStatus, getActivePlayer, endGame}
}

const MatchController = (function() {
    let players = []
    let game
    let matchup
    const getMatchup = () => matchup

    const newGame = function() {
        DomController.removeBoard()
        game = Game(players[0], players[1])
    }

    const newMatchup = function(event) {
        event.preventDefault()
        const formData = new FormData(document.querySelector('.form'))
        const oneName = formData.get('one-name')
        const oneSymbol = formData.get('one-symbol')
        const twoName = formData.get('two-name')
        const twoSymbol = formData.get('two-symbol')
        players = [Player(oneName, oneSymbol), Player(twoName, twoSymbol)]
        matchup = DomController.displayMatchup(players)
        newGame()
    }

    return {newGame, newMatchup, getMatchup}
})()

const DomController = (function() {
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

    const removeBoard = () => document.querySelectorAll('.cell').forEach((item) => boardDOM.removeChild(item))

    const disableCells = function(array) {
        for (const cell of array) {
            cell.setAttribute('disabled', true)
        }
    }

    const list = document.querySelector('.list')
    const displayMatchup = function(players) {
        const matchup = document.createElement('li')
        list.appendChild(matchup)
        const matchupHeader = document.createElement('h2')
        matchupHeader.textContent = `${players[0].getUsername()} (${players[0].getScore()}) vs. ${players[1].getUsername()} (${players[1].getScore()})`
        matchup.appendChild(matchupHeader)
        return function displayMatch(status, winner) {
            const match = document.createElement('li')
            if (status === 2) {
                match.textContent = `${winner.getUsername()} won!`
            } else {
                match.textContent = 'Draw!'
            }
            matchupHeader.textContent = `${players[0].getUsername()} (${players[0].getScore()}) vs. ${players[1].getUsername()} (${players[1].getScore()})`
            matchup.appendChild(match)
        }
    }

    const newButton = document.querySelector('.new')
    newButton.addEventListener('click', MatchController.newGame)
    const form = document.querySelector('.form')
    form.addEventListener('submit', MatchController.newMatchup)

    const blank = Gameboard()
    displayBoard(blank.getDisplay())
    disableCells(blank.getDisplay())

    return {displayBoard, disableCells, removeBoard, displayMatchup}
})()