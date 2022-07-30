import React from 'react'
import '../TimerAndFlag.css'
import { FaFlag, FaClock } from "react-icons/fa";

const TimerAndFlag = ({flags, timer}) => {
  return (
    <div className="timer-and-flag-container">
        <div className="flag">
            <h3 className="icon-size"><FaFlag /> :</h3>
            <h3>{flags}</h3>
        </div>
        <div className="timer">
            <h3 className="icon-size"><FaClock />:</h3>
            <h3>{timer}</h3>
        </div>
    </div>
  )
}

export default TimerAndFlag
