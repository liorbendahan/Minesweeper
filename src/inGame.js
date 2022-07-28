
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
    return matrix;
}