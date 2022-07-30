import './App.css';
import './Square.css';
import { useState } from 'react';
import Square from './components/Square';
import Settings from './components/Settings';
import TimerAndFlag from './components/TimerAndFlag';
import {create, addMines, addNumberOfBombsNearby, makeMatrixAnArray, arrayOfBombs} from './createTable';
import {isClickedMine, endGame, handleClick, checkIfWon, hasAndHandleFlag, countRemainingFlags} from './inGame';

function App() {
  const [matrixSquare, setMatrixSquare] = useState([]);
  const [matrixColumns,setMatrixColumns] = useState(0);
  const [matrixRows,setMatrixRows] = useState(0);
  const [matrixMines,setMatrixMines] = useState(0);
  const [flags,setFlags] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(0);

  const startTimer = () => {
    /* A function that start the timer */
    setTimer(0);
    const newIntervalId = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);
    setIntervalId(newIntervalId);
  }
  const stopTimer = () => {
    /* A function that stops the timer */
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
  }
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
    stopTimer();
    console.log("Created new table")
  }
  const assignBombsAndNumbers = (index) => {
    /* In this function we will add the values to out table,
    because the client did click a square, we will add the bombs and numbers.
    *Of course, they will be hidden from the client in the beginnig */
    //Add the bombs randomally *without incluiding the square pressed*.
    addMines(matrixSquare,matrixColumns,matrixMines,index)
    //then we update our flag variable
    setFlags(arrayOfBombs.length)
    //then we add the numbers nearby values.
    addNumberOfBombsNearby(matrixSquare, matrixColumns,matrixRows)
    //then we update the matrix view in the window.
    console.log(matrixSquare)
  }
  const handleLeftClick = (index) => {
    /* In This function we will handle the big picture of the game,
    if its started or over*/
    if (!gameStarted) {
      // We enter here whenever the client clicks for the first time, we will assign bombs and values to the table.
      assignBombsAndNumbers(index)
      setGameStarted(true);
      startTimer();
    }
    if (!gameOver) {
      //We enter here if the client clicks a square and the game isnt over (also in the first click).
      handleGame(index)
    }
  }
  const handleGame = (index) => {
    /* In this function we will handle the gameplay itself.
    (Knowing the game isnt over) */
    console.log("Pressed index: " + index)
    let boolClikedMine = isClickedMine(index, makeMatrixAnArray(matrixSquare))
    if(boolClikedMine) {
      //We call endGame from './inGame'
      endGame(matrixSquare, matrixColumns);
      setGameOver(true);
      stopTimer();
    }
    if (!boolClikedMine) {
      // Here we handle the left click. we call handleclick from './inGame'.
      let newMatrix = handleClick(index, matrixSquare, matrixColumns, matrixRows);
      //Here we update our number of flags available. calling countRemainingFlags from './inGame'.
      setFlags(arrayOfBombs.length - countRemainingFlags(newMatrix, matrixColumns))
      // Updating the matrix.
      setMatrixSquare(newMatrix);
    }
    //Here we check from checkIfWon in './inGame' if the user clicked all squares that doesnt have mines.
    if(checkIfWon(matrixSquare,matrixColumns)) {
      //If we won:
      setGameOver(true);
      setWon(true);
      stopTimer();
    }
  }
  const handleRightClick = (index) => {
    /* In this function we will handle the right click (in the user puts a flag or delete one)*/
    if (!gameOver) {
      //Here we check if the user put, deleted or clicked a revealed square (the function will return null).
      let response = hasAndHandleFlag(index,matrixSquare, matrixColumns)
      console.log(response);
      if (response === true) {
        setFlags(flags-1);
      }
      if (response === false) {
        setFlags(flags+1);
      }
    }
  }
  return (
    <div className="App background title ">
      <h1 className="title">Minesweeper</h1>

      <Settings sendParams={createDefaultTable}/>
      {gameStarted && <TimerAndFlag flags={flags} timer={timer}/>}
      {gameOver && (won === true ? (<div className="game-over"><h3>You won!</h3></div>) :
       (<div className="game-over"><h3>Game Over!</h3></div>))}
      <div className="big-square">
          {Array.from(matrixSquare).map((row,index) => 
          <div className= "rows" key={index}>{Array.from(row).map(((element,index) => 
            <Square onClick={(e) => e.preventDefault() || handleLeftClick(element.index)}
            onRightClick={(e) => e.preventDefault() || handleRightClick(element.index)} key={index} isRevealed={element.isRevealed}
             hasMine={element.hasMine} hasFlag= {element.hasFlag} bombsNearby={element.bombsNearby}
             index={element.index}/>))}</div>)}
      </div>

    </div>
  );
}

export default App;
