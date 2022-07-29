export let arrayOfBombs = [];

export function create(columns,rows) {
    //Here we create a very beginning matrix of squares with defaults values.
    let matrix = []
    let index = 1;
    //Here we create the block os squares in a matrix.
    for (let x = 1; x < rows + 1; x++) {
        let secondArray = []
        for (let y = 1; y < columns + 1; y++) {
            secondArray.push({
                index: index,
                x: x,
                y: y,
                hasMine: false,
                hasFlag: false,
                bombsNearby: 0,
                isRevealed: false})
            index++;
        }
        matrix.push(secondArray);
    }
    return matrix;
}

function generateRandomInteger(max) {
    /* just a simple random fuction to get a random number between 0 and max */
    return Math.floor(Math.random() * max) + 1;
}

export function addMines(matrix,columns, number ,index) {  
    /* Here we will be adding the mines randomally to the matrix,
    without incluiding the index parameter who is the square clicked by the user in the first time */
    let numberOfSquares = matrix.length*columns;
    arrayOfBombs = [];
    //Here we create an array of numbers that the indexes of the matrix will have a bomb.
    while (arrayOfBombs.length < number) {
        let random = generateRandomInteger(numberOfSquares)
        if (arrayOfBombs.indexOf(random) === -1 && random !== index) {
            arrayOfBombs.push(random);
        }
        random = 0;
    }
    console.log("Array of bombs: " + arrayOfBombs)
    let squareIndex;
    //Here we are going to asign the bombs to the matrix.
    for (let i = 0; i < arrayOfBombs.length; i++) {
        squareIndex = arrayOfBombs[i]
        for (let x = 0; x < matrix.length ; x++) {
            for (let y = 0; y < columns; y++) {
                if (matrix[x][y].index === squareIndex) {
                    matrix[x][y].hasMine = true;
                    matrix[x][y].bombsNearby = -1;
                }
            }
        }
    }
}

export function addNumberOfBombsNearby(matrix,columns,rows) {
    /* here we are going to add the number of bombs nearby to every square
    in the matrix */
    let arrayNearby = [];
    let allMatrixInArray = makeMatrixAnArray(matrix);
    let currentSquare;
    /*First we run in our arrayOfBombs wich we have the indexes of the squares
    in the matrix that have bombs */
    for (var i = 0; i < arrayOfBombs.length; i++) {
        /*Then, we need to call a fucntion for each index that have a bomb to get 
        the indexes of the squares that are nearby */
        arrayNearby = checkWhosNearby(arrayOfBombs[i],columns,rows);
        //console.log(arrayNearby, arrayOfBombs[i])
        /*Then, we run in the new array and for each index in the matrix we 
        do a ++ in the bombsNearby value */
        for (var j = 0; j < arrayNearby.length; j++) {
            if (arrayNearby[j] !== 0 ) {
                currentSquare = allMatrixInArray.find(element => element.index === arrayNearby[j])
                if (matrix[currentSquare.x-1][currentSquare.y-1].hasMine === false) {
                    matrix[currentSquare.x-1][currentSquare.y-1].bombsNearby++;
                }
            }
        }
    }
}

export function checkWhosNearby(number,columns,rows) {
    /*Gets an index and returns an array of all the nearby
    aquares indexes in the matrix , if in the 8 squares possible there isnt a number nearby (wall),
    we will put 0 inside the array.*/
    let arrayNearby = [];
    let index1 = number -columns - 1;
    if ((index1 > 0) && (index1 % columns !== 0)) {
        arrayNearby.push(index1);
    }

    let index2 = number -columns;
    if (index2 > 0) {
        arrayNearby.push(index2);
    }
    
    let index3 = index2 +1;
    if ((index3 > 0) && (number % columns !== 0)) {
        arrayNearby.push(index3);
    }

    let index4 = number -1;
    if ((number-1) % columns !== 0) {
        arrayNearby.push(index4);
    }

    let index5 = number +1;
    if (number % columns !== 0) {
        arrayNearby.push(index5);
    }
    
    let index7 = number + columns;
    let index6 = index7-1;
    if (((number-1) % columns !== 0) && (index6 <= rows*columns)) {
       arrayNearby.push(index6);
    }

    if (index7 <= (columns*rows)) {
        arrayNearby.push(index7);
    }

    let index8 = number +columns + 1;
    if ((number % columns !== 0) && (index8 <= rows*columns)) {
        arrayNearby.push(index8);
    }

    return arrayNearby;
}

export function makeMatrixAnArray(matrix) {
    /*This function just gets the matrix and returns a single
    array that contains all the elements of the matrix*/
    let newArray = [];
    for (let i = 0; i < matrix.length; i++) {
        // get the size of the inner array
        var innerArrayLength = matrix[i].length;
        // loop the inner array
        for (let j = 0; j < innerArrayLength; j++) {
            newArray.push(matrix[i][j]);
        }
    }
    return newArray;
}
