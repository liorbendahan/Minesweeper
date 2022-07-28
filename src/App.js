import './App.css';
import './Square.css';
import { useState, useEffect } from 'react';
import Square from './components/Square';
import Settings from './components/Settings';
import {create, addMines, addNumberOfBombsNearby} from './createTable';


function App() {
  const [matrixSquare, setMatrixSquare] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const createTable = (columns,rows,mines) => {
    /*In this function we will create our table,
    First creating a default matrix without any true values, and then adding
    the bombs, and the number of bombs nearby ect... */
    //create first the table square with all the default values.
    let matrix = create(columns,rows)
    //then we add the bombs randomally.
    addMines(matrix,columns,mines)
    //then we add the numbers nearby values.
    addNumberOfBombsNearby(matrix, columns,rows)
    console.log("Created new table")
    setMatrixSquare(matrix)
    setGameStarted(true)
  }

  return (
    <div className="App background title ">
      <h1 className="title">Minesweeper</h1>

      <Settings sendParams={createTable}/>

      <div className="big-square">
          {Array.from(matrixSquare).map((row,index) => 
          <div className= "rows" key={index}>{Array.from(row).map(((element,index) => 
            <Square key={index} isRevealed={element.isRevealed}
             hasMine={element.hasMine} bombsNearby={element.bombsNearby}
             index={element.index}/>))}</div>)}
      </div>

    </div>
  );
}

export default App;
