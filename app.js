const gameBoard = document.querySelector('.game-container');
let gameTiles = ['','','','','','','','',''];
const userForm = document.getElementById("start-game");
const submitButton = document.getElementById("start-button");
const winningBanner = document.querySelector('.winning-banner')
const winnerText = document.querySelector('.winner-text')
let player1, player2;
let winner;
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

function createBoard(){
    gameBoard.style.gridTemplateColumns = 'repeat(3, 1fr)';
    gameBoard.style.gridTemplateRows = 'repeat(3, 1fr)';
    gameTiles = ['','','','','','','','',''];
    winningBanner.style.display = 'none';
    winner = null;
    createPlayers()
    for(let i = 0; i < 9; i++){
        newTile = createTile(i);
        gameBoard.appendChild(newTile.div);
    }
}

function togglePlayer(){
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function imageSelector(){
    source = currentPlayer === 'X' ? 'cross.png' : 'circle.png';
    const image = document.createElement('img');
    image.src = source;
    image.style.maxWidth = '100%';
    image.style.maxHeight = '100%';
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
                winner = player1.getName();
            } else {
                winner = player2.getName();
            }
        }
    }
    if(winner){
        console.log(`${winner} wins`)
        winnerText.textContent = `${winner} wins!`;
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
        console.log("registered")
        gameBoard.innerHTML = ''
    } else {
        submitButton.textContent = "Start Game"
        console.log("registered")
        gameBoard.innerHTML = ''
    }
    createBoard()
});

createBoard()
