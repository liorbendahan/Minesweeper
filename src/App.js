import './App.css';
import './Square.css';
import { useState, useEffect } from 'react';
import Square from './components/Square';
import Settings from './components/Settings';
import {create, addMines, addNumberOfBombsNearby, makeMatrixAnArray} from './createTable';
import {isClickedMine, endGame, handleClick, checkIfWon} from './inGame';

function App() {
  const [matrixSquare, setMatrixSquare] = useState([]);
  const [matrixColumns,setMatrixColumns] = useState(0);
  const [matrixRows,setMatrixRows] = useState(0);
  const [matrixMines,setMatrixMines] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const createDefaultTable = (columns,rows,mines) => {
    /*In this function we will create our Default table without
    any values, *the values will be aplied after the client clicks a square*/
    let matrix = create(columns,rows)
    //Update some variables we will need in the future.
    setMatrixColumns(columns)
    setMatrixRows(rows)
    setMatrixMines(mines)
    //Updating the principle matrix variable, to show up in the screen (without values thought).
    setMatrixSquare(matrix)
    setGameOver(false);
    setWon(false);
    setGameStarted(false);
    console.log("Created new table")
  }
  const assignBombsAndNumbers = (index) => {
    /* In this function we will add the values to out table,
    because the client did click a square, we will add the bombs and numbers.
    *Of course, they will be hidden from the client in the beginnig */
    //Add the bombs randomally *without incluiding the square pressed*.
    addMines(matrixSquare,matrixColumns,matrixMines,index)
    //then we add the numbers nearby values.
    addNumberOfBombsNearby(matrixSquare, matrixColumns,matrixRows)
    //then we update the matrix view in the window.
    console.log(matrixSquare)
  }
  const clikedSquare = (index) => {
    /* In This function we will handle the big picture of the game,
    if its over or not.*/
    if (!gameStarted) {
      assignBombsAndNumbers(index)
      setGameStarted(true);
    }
    if (!gameOver) {
      handleGame(index)
    }
  }
  const handleGame = (index) => {
    /* In this function we will handle the gameplay itself.
    (Knowing the game isnt over) */
    console.log("Pressed index: " + index)
    let response = isClickedMine(index, makeMatrixAnArray(matrixSquare))
    if(response) {
      endGame(matrixSquare, matrixColumns);
      setGameOver(true);
    }
    if (!response) {
      let newMatrix = handleClick(index, matrixSquare, matrixColumns, matrixRows);
      setMatrixSquare(newMatrix);
    }
    if(checkIfWon(matrixSquare,matrixColumns)) {
      setGameOver(true);
      setWon(true);
    }
  }
  return (
    <div className="App background title ">
      <h1 className="title">Minesweeper</h1>

      <Settings sendParams={createDefaultTable}/>
      {gameOver && (won === true ? (<div className="game-over"><h3>You won!</h3></div>) :
       (<div className="game-over"><h3>Game Over!</h3></div>))}
      <div className="big-square">
          {Array.from(matrixSquare).map((row,index) => 
          <div className= "rows" key={index}>{Array.from(row).map(((element,index) => 
            <Square onClick={(e) => e.preventDefault() || clikedSquare(element.index)} key={index} isRevealed={element.isRevealed}
             hasMine={element.hasMine} bombsNearby={element.bombsNearby}
             index={element.index}/>))}</div>)}
      </div>

    </div>
  );
}

export default App;
