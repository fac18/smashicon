import React from "react";
import './Scoreboard.css';


const Scoreboard = ({score}) => {
  return (
    <div className="score-container">
      <span className="score">{score}</span>
    </div>
  )
}

export default Scoreboard;
