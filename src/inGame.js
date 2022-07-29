import { checkWhosNearby , arrayOfBombs} from "./createTable";

export function isClickedMine(index, arrayOfMatrix) {
    /* In this function we will check if the client clicked a square that has a mine */
    if(arrayOfMatrix[index-1].hasMine === true) {
        return true;
    }
    return false;
}

export function endGame(matrix, columns) {
    /* If the client clicked a mine, this function will start,
    this function just updates the vales "isRevealed" to true for every square
    that has a bomb, to show them up in the screen. */
    for (let x = 0; x < matrix.length ; x++) {
        for (let y = 0; y < columns; y++) {
            if(matrix[x][y].hasMine === true) {
                matrix[x][y].isRevealed = true;
            }
        }
    }
}

export function handleClick(index, matrix, columns, rows) {
    /* In this fucntion we will handle the click if the square isnt a bomb.
    if the bombsNearby values is != 0 we just reveal them to the user,
    but if it is equal to 0, we will call a recursive function that will reveal all the 0-8 numbers
    in its area. */
    let newMatrix = copyMatrix(matrix);
    for (let x = 0; x < newMatrix.length ; x++) {
        for (let y = 0; y < columns; y++) {
            if(newMatrix[x][y].index === index && newMatrix[x][y].bombsNearby !== 0) {
                newMatrix[x][y].isRevealed = true;
            }
            if(newMatrix[x][y].index === index && newMatrix[x][y].bombsNearby === 0) {
                //recursive(index, newMatrix, columns, rows)
                newMatrix[x][y].isRevealed = true;
                recursive(revealedAndReturn(index,newMatrix, columns, rows),newMatrix, columns, rows);
            }
        }
    }  
    return newMatrix;
}

function recursive(array,newMatrix, columns, rows) {
    /* This function will be recursively called.
    it will get an array of squares and will call itself over and over as the array has items. 
    (items will be squares that have bombsNearby values equal to 0, so we will need to check the squares
        next to him in "revealedAndReturn" function) till we get a wall (!= 0)*/
    for (var i = 0; i < array.length; i++) {
        recursive(revealedAndReturn(array[i].index,newMatrix, columns, rows),newMatrix, columns, rows);
    }
}

function revealedAndReturn(index,newMatrix, columns, rows) {
    /* This fuction will get an index, and will reveal all the squares next to him,
    and will return an array of the squares next to him (for the recursive function). */
    let array = checkWhosNearby(index,columns,rows);
    let newArray = [];
    for (let x = 0; x < newMatrix.length ; x++) {
        for (let y = 0; y < columns; y++) {
            for (let z = 0; z < array.length; z++) {
                if(newMatrix[x][y].index === array[z] && newMatrix[x][y].bombsNearby === 0
                     && newMatrix[x][y].isRevealed === false){
                    newArray.push(newMatrix[x][y])
                    newMatrix[x][y].isRevealed = true;
                }
                if (newMatrix[x][y].index === array[z] && newMatrix[x][y].bombsNearby !== 0
                && newMatrix[x][y].isRevealed === false) {
                    newMatrix[x][y].isRevealed = true;
                }
            }
        }
    } 
    return newArray;
}

export function checkIfWon(matrix, columns){
    /* In this function we will check if the client won the game,
    in other words, if AllSquares - those who have mines === revealed squares */
    let numOfSquares = (columns * matrix.length) - arrayOfBombs.length;
    let countRevealed = 0;
    for (let x = 0; x < matrix.length ; x++) {
        for (let y = 0; y < columns; y++) {
            if (matrix[x][y].isRevealed === true && matrix[x][y].hasMine === false) {
                countRevealed++;
            }
        }
    }
    if (countRevealed === numOfSquares) {
        return true;
    }
    return false;
}

export function copyMatrix(matrix) {
    /* just a simple function that copy our matrix */
    let newMatrix = [];
    for (let i = 0; i < matrix.length; i++)
        newMatrix[i] = matrix[i].slice();
    return newMatrix;
}