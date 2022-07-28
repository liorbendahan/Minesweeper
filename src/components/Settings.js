import React from 'react'
import '../Settings.css'
import { useState, useEffect } from 'react';

const Settings = ({sendParams}) => {
  const [columns, setColumns] = useState('');
  const [rows, setRows] = useState('');
  const [mines, setMines] = useState('');
  const [error, setError] = useState(false);
  //A sleep fuction that will help us in the future.
  function sleep(ms){
    return new Promise( resolver => setTimeout(resolver, ms));
   };
  const onSubmit = async (e) => {
    e.preventDefault();
    let numberOfSquares = columns*rows;
    if (columns > 0 && rows > 0 && mines > 0) {
      if (mines < numberOfSquares/3) {
        sendParams(columns,rows,mines)
      }
      else {
        setError(true);
        await sleep(4000);
        setError(false);
      }
    }
  }
  const checkInputs = (number, type) => {
    //Check right inputs (only gets number inputs)
    if(Number(number)) {
        if(type === 1){
            setRows(Number(number))
        }
        if(type === 2){
            setColumns(Number(number))
        }
        if(type === 3){
            setMines(Number(number))
        }
    }
    if(number === "") {
      if(type === 1){
          setRows('')
      }
      if(type === 2){
          setColumns('')
      }
      if(type === 3){
          setMines('')
      }
  }
  }
  return (
    <div className="container-settings text">
      <form onSubmit={onSubmit}>
        <h2>Please fill the next settings to play:</h2>
      <div className="input">
        <input type="text" 
            placeholder="Enter Rows" value={rows} 
            onChange={(e) => checkInputs(e.target.value,1)}/>
      </div>
      <div className="input">
        <input type="text" 
            placeholder="Enter Columns" value={columns} 
            onChange={(e) => checkInputs(e.target.value,2)}/>
      </div>
      <div className="input">
        <input type="text" 
            placeholder="Enter Number of Mines" value={mines} 
            onChange={(e) => checkInputs(e.target.value,3)}/>
      </div>
      <div className="button-create">
        <input type='submit' value="Start Game"/>
      </div>
      <div className="error-message">
        {error && <p>Please enter a smaller number for the mines.</p>}
      </div>
      </form>
    </div>
  )
}

export default Settings
