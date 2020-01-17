import React from 'react';
import './FinalScreen.css'

const FinalScreen = ({ score }) => {
  const refreshPage = () => { window.location.reload(false) }

  return (<div className="final__container">
    <h2 className="final__title">GAME OVER</h2>
    <p className="final__score">
      Final score: {score}
    </p>
    <p className="final__text">
      You successfully smashed through all your followers' identicons!
    </p>
    <button className="final__button" onClick={refreshPage}>
      Play again?
    </button>
  </div>)
}

export default FinalScreen
