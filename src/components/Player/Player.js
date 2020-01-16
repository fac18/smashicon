import React from 'react';

import './Player.css'

let positions = new Array(5).fill(0)

const Player = ({ playerPosition, profileSrc }) => {
  return (<div className="player__container">
    {
      positions.map((position,i) => {
        if (i === playerPosition) {
          return (<img key={i} src={profileSrc} alt="your player icon" className="player__icon" />)
        } else {
          return (<div key={i} className="player__space"></div>)
        }
      })
    }
  </div>)
}

export default Player

//
