const gameBoard = document.querySelector('.game-container')
const gameTiles = ['','','','','','','','',''];

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

let currentPlayer = 'X';

const playerFactory = (name, shape) =>{
    const playerName = name || 'Player 1';
    const getName = () => playerName;
    const getShape = () => shape
    return {getName, getShape}
}

function createBoard(){
    gameBoard.style.gridTemplateColumns = 'repeat(3, 1fr)';
    gameBoard.style.gridTemplateRows = 'repeat(3, 1fr)';

    player1 = playerFactory('TEMP', 'X')
    player2 = playerFactory('TEMP2', 'O')

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
    if(!clicked.value){
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
            if (currentPlayer == 'X') {
                winner = player1.getName();
                console.log('Player1 wins')
            } else {
                winner = player2.getName();
                console.log('Player2 wins')
            }
        }
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


createBoard()