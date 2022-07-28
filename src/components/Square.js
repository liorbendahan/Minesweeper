import React from 'react'

const Square = ({index,isRevealed, hasMine, bombsNearby}) => {
  return (
    <div className='square-container'>
      {isRevealed === true ? (<h2>{bombsNearby}</h2>) :
      (<h2>{bombsNearby}</h2>)}
    </div>
  )
}

export default Square;
