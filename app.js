const gameBoard = document.querySelector('.game-container');
let gameTiles = ['','','','','','','','',''];
const userForm = document.getElementById("start-game");
const submitButton = document.getElementById("start-button");
let player1, player2;
let winner = 1;
let currentPlayer = 'X';

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];



const playerFactory = (name, shape) =>{
    let playerName;
    console.log(name, shape)
    if(shape == 'X'){
        playerName = name || 'Player 1';
    } else {
        playerName = name || 'Player 2';
    }
    console.log(playerName)
    const getName = () => playerName;
    const getShape = () => shape
    return {getName, getShape}
}


const winningBanner = document.createElement('div');
const winnerText = document.createElement('div');
winningBanner.classList.add('winning-banner');
winnerText.classList.add('winner-text');
function createBoard(){
    gameBoard.style.gridTemplateColumns = 'repeat(3, 1fr)';
    gameBoard.style.gridTemplateRows = 'repeat(3, 1fr)';
    gameTiles = ['','','','','','','','',''];

    //not working

    createPlayers()
    for(let i = 0; i < 9; i++){
        newTile = createTile(i);
        gameBoard.appendChild(newTile.div);
    }
    gameBoard.appendChild(winningBanner);
    winningBanner.appendChild(winnerText);
}

function togglePlayer(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function imageSelector(){
    source = currentPlayer === 'X' ? 'cross.png' : 'circle.png';
    const image = document.createElement('img');
    image.src = source;
    image.style.maxWidth = '97%';
    image.style.maxHeight = '97%';
    return image;
}

function clickHandler(e, div,clicked,tileIndex){
    if(!clicked.value && !winner){
        const tile = e.target;
        if(currentPlayer == 'X'){
            div.appendChild(imageSelector())
            gameTiles[tileIndex] = 'X';
            togglePlayer();
        } else {
            div.appendChild(imageSelector())
            gameTiles[tileIndex] = 'O';
            togglePlayer();
        }
        clicked.value = true;
        winChecker();
    }
    return;
}

const winChecker = () =>{
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameTiles[a] && gameTiles[a] === gameTiles[b] && gameTiles[a] === gameTiles[c]) {
            if (currentPlayer == 'O') {
                winner = `${player1.getName()} wins!`;
            } else {
                winner = `${player2.getName()} wins!`;
            }
        }
    }
    if(winner){
        console.log(`${winner} wins`)
        winnerText.textContent = winner;
        winningBanner.style.display = 'flex';
        return
    }
    if(!gameTiles.includes('')){
        winner = 'Draw!'
        winnerText.textContent = winner;
        winningBanner.style.display = 'flex';
    }
    
}

const createTile = (index) =>{
    const tileIndex = index;
    let clicked = {value: false}
    const div = document.createElement('div');
    div.style.border = "#cbd5e1 solid 1px";
    div.style.cursor = "pointer"
    div.addEventListener('click', (e) => clickHandler(e,div,clicked,tileIndex));
    return {div};
}

const createPlayers = () =>{
    const p1Name = document.getElementById('player1').value;
    const p2Name = document.getElementById('player2').value;
    player1 = playerFactory(p1Name,'X');
    player2 = playerFactory(p2Name,'O');
}

userForm.addEventListener("submit", function(event) {
    event.preventDefault();
    if(submitButton.textContent == "Start Game"){
        submitButton.textContent = "Restart"
        winner = null;
        console.log("registered")
        gameBoard.innerHTML = ''
        winningBanner.style.display = 'none'
    } else {
        submitButton.textContent = "Start Game"
        console.log("registered")
        winningBanner.style.display = 'none'
        gameBoard.innerHTML = ''
    }
    createBoard()
});

createBoard()
