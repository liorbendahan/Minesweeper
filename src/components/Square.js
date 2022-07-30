import React from 'react'
import { FaBomb, FaFlag } from "react-icons/fa";
const Square = ({index, isRevealed, hasMine, hasFlag, bombsNearby ,onClick, onRightClick}) => {
  return (
    <div onClick={onClick} onContextMenu={onRightClick}>
      {isRevealed === true ? (hasMine === true ? (<div className="square-container square-revealed mine"><FaBomb /></div>):
       (<div className="square-container square-revealed">{bombsNearby != 0 ? (<h2 className="not-zero">{bombsNearby}</h2>) : (<h2>{}</h2>)}</div>)) :
      (hasFlag === true ? (<div className="square-container square-not-revealed flags"><h2>{<FaFlag />}</h2></div>):
      (<div className="square-container square-not-revealed"><h2>{}</h2></div>))}
    </div>
  )
}

export default Square;