import React from 'react'

const Square = ({index,isRevealed, hasMine, bombsNearby}) => {
  return (
    <div className='square-container status'>
      {isRevealed === true ? (<h1>{bombsNearby}</h1>) :
      (<h1>{bombsNearby}</h1>)}
    </div>
  )
}

export default Square;
