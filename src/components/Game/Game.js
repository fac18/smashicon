import React from 'react';
import './Game.css';

import Player from '../Player/Player'
import Scoreboard from '../Scoreboard/Scoreboard'
import FinalScreen from '../FinalScreen/FinalScreen'

import zeroArray from '../../utils/zeroArray'
import buildIdenticon from '../../utils/buildIdenticon'

const Game = ({ username, interval, followers, avatarUrl }) => {
    // set up states
    const [field, setField] = React.useState(() => {
        const initialIdenticon = buildIdenticon(username)
        const initialField = zeroArray(5,5)
        initialField.forEach((lane,i) => { initialField[i] = lane.concat(initialIdenticon[i]) })
        return initialField
    })
    const [nextIdenticon, setNextIdenticon] = React.useState(() => {
        return buildIdenticon(followers.shift())
    })
    const [t, setT] = React.useState(0);
    const [playerPosition, setPlayerPosition] = React.useState(2)
    const [score, setScore] = React.useState(0)
    const [gameOver, setGameOver] = React.useState(false)

    // set up timer and event listeners on mount
    React.useEffect(()=>{
        const tick = () => { setT(t => t + 1) }
        const timer = setInterval(tick, interval)

        const movePlayerLeft = () => {
          setPlayerPosition(position => position - 1 < 0 ? 0 : position - 1)
        }
        const movePlayerRight = () => {
          setPlayerPosition(position => position + 1 > 4 ? 4 : position + 1)
        }

        // set up event listener for desktop (i.e. keyboard users)
        const arrowKeys = e => {
          if (e.keyCode === 37) { // left arrow press
            movePlayerLeft()
          } else if (e.keyCode === 39) { // right arrow press
            movePlayerRight()
          }
        }
        document.addEventListener('keydown', arrowKeys)

        // set up event listener for mobile (i.e. touch users)
        const swipe = e => {
          e.preventDefault() // ensures touch does not trigger mouse events
          let touchList = e.changedTouches
          console.log('touchList: ', touchList)
          console.log('first touchList entry (a touch event?): ', touchList[0])
          if (touchList[0].clientX < touchList[1].clientX) {
            movePlayerLeft()
          } else if (touchList[0].clientX > touchList[1].clientX) {
            movePlayerRight()
          }
        }
        document.addEventListener('touchmove', swipe)

        // and clear them on unmounting
        return () => {
            clearInterval(timer)
            document.removeEventListener('keydown', arrowKeys)
            document.removeEventListener('touchmove',swipe)
        }
    }, [interval]) // dependency array could also be empty, but lint dislikes

    // run this code every on every tick of the clock
    React.useEffect(() => {
        if (t % 10 === 0 && t !== 0) {
            setField(field => {
                return field.map((lane,i) => {
                    const block = lane.shift()
                    if (block && playerPosition === i) {
                        setScore(score => score + 1)
                    }
                    lane.push(nextIdenticon[i].shift())
                    return lane
                })
            })
            if (followers.length) {
                setNextIdenticon(buildIdenticon(followers.shift()))
            } else {
                setGameOver(true)
                console.log(`Game finished. Your score was ${score}!`)
            }
        }
        else if(t % 10 < 6 && t !== 0) {
            setField(field => {
                return field.map((lane,i) => {
                    lane.shift()
                    lane.push(0)
                    return lane
                })
            })
        }
        else if(t % 10 < 10 && t !== 0) {
            setField(field => {
                return field.map((lane,i) => {
                    const block = lane.shift()
                    if (block && playerPosition === i) {
                        setScore(score => score + 1)// run code for player to gain a point
                    }
                    lane.push(nextIdenticon[i].shift())
                    return lane
                })
            })
        }
    }, [t])

    if (!gameOver) {
      return (<div className="game">
        <Scoreboard score={score} />
        <div className="game-grid">
          {
              field.map((lane,i) => {
                  return <div key={i} className="game-grid__column">
                  {lane.map((block,j) => {
                      let reversej = (lane.length-1)-j;
                      return lane[reversej] ? <div key={i.toString() + reversej.toString()} className="game-grid__square game-grid__square--active"></div>
                          : <div key={i.toString() + reversej.toString()} className="game-grid__square"></div>
                  })}
                  </div>
              })
          }
        </div>
        <Player playerPosition={playerPosition} avatarUrl={avatarUrl} />
      </div>)
    } else {
      return <FinalScreen score={score} />
    }
}

export default Game
