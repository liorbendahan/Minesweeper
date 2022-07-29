import React from 'react'

const Square = ({index,isRevealed, hasMine, bombsNearby ,onClick}) => {
  return (
    <div onClick={onClick}>
      {isRevealed === true ? (<div className="square-container square-revealed"><h2>{bombsNearby}</h2></div>) :
      (<div className="square-container square-not-revealed"><h2>{}</h2></div>)}
    </div>
  )
}

export default Square;
