import React from 'react'

const Square = ({index, status, hasBomb, bombsNearby}) => {
  return (
    <div className='square-container status'>
      {hasBomb === true ? (<h1>{hasBomb}</h1>) :
      (<h1>{bombsNearby}</h1>)}
    </div>
  )
}

export default Square
