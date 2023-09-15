const gameBoard = document.querySelector('.game-container')

const playerFactory = (name, playerNumber, shape) =>{
    //player setup
    //
    //name = name || 'Player 1'
    const getName = () => name;
    const getShape = () => shape
    return {name, getName, getShape}
}

// const boardTile = () => {

//     return {playerClicked}
// }

function createBoard(){

    gameBoard.style.gridTemplateColumns = 'repeat(3, 1fr)'
    gameBoard.style.gridTemplateRows = 'repeat(3, 1fr)'

    for(let i = 0; i < 9; i++){
        const div = document.createElement('div')
        div.style.border = "#cbd5e1 solid 1px"
        div.style.cursor = "pointer";
        div.addEventListener('mouseover', () => {
            //what happens on click
        })
        gameBoard.appendChild(div)
    }
}

//player setup
//
//name = player1.name || 'Player 1'


createBoard()