import './App.css';
import { useState, useEffect } from 'react';
import Square from './components/Square';
import {create, addMines, addNumberOfBombsNearby, checkWhosNearby} from './createTable';


function App() {
  const [matrixSquare, setMatrixSquare] = useState([]);
  const [columns, setColumns] = useState('');
  const [rows, setRows] = useState('');
  const [mines, setMines] = useState('');
  
  function createTable(e) {
    /*In this function we will create our table,
    First creating a default matrix without any true values, and then adding
    the bombs, and the number of bombs nearby ect... */
    e.preventDefault();
    //create first the table square with all the default values.
    let matrix = create(columns,rows)
    //then we add the bombs randomally.
    addMines(matrix,columns,mines)
    //then we add the numbers nearby values.
    addNumberOfBombsNearby(matrix, columns,rows)
    console.log("Created new table")
    setMatrixSquare(matrix)
  }

  return (
    <div className="App background ">

      <form onSubmit={createTable}>
      <div className="input">
      <input type="text" 
         placeholder="Enter Rows" value={rows} 
         onChange={(e) => setRows(Number(e.target.value))}/>
      </div>
      <div className="input">
      <input type="text" 
        placeholder="Enter Columns" value={columns} 
        onChange={(e) => setColumns(Number(e.target.value))}/>
      <input type="text" 
        placeholder="Enter Number of Mines" value={mines} 
        onChange={(e) => setMines(Number(e.target.value))}/>
      </div>
      <button>Press me</button>
      </form>

      <div className="big-square">
          {Array.from(matrixSquare).map((row,index) => 
          <div className= "rows" key={index}>{Array.from(row).map(((element,index) => 
            <Square key={index} hasBomb={element.hasBomb} bombsNearby={element.bombsNearby}
             index={element.index}/>))}</div>)}
      </div>

    </div>
  );
}

export default App;
