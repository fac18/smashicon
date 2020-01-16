import React from 'react';
import './Game.css';
import zeroArray from '../../utils/zeroArray'
import buildIdenticon from '../../utils/buildIdenticon'
import Scoreboard from '../Scoreboard/Scoreboard'



const followers = ['svnmmrs','samhstn', 'nikkesan', 'hajimon54', 'albadylic', 'redahaq' , 'pat-cki' , 'bethanyios' , 'tonylomax' , 'crianonim']

const Game = props => {
    // hard code data that would be passed in
    const interval = 500; // time between steps in ms

    // set up states
    const [field, setField] = React.useState(() => {
        const username = 'Ayub3' // github username submitted at landing
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

    // set up timer and event listeners on mount
    React.useEffect(()=>{
        const tick = () => { setT(t => t + 1) }
        const timer = setInterval(tick, interval)

        return () => {
            clearInterval(timer)
        }
    },[])

    // run this code every time time ticks
    React.useEffect(() => {
        if (t % 10 === 0 && t !== 0) {
            setField(field => {
                return field.map((lane,i) => {
                    const block = lane.shift()
                    if (block && playerPosition === i ) {
                        setScore(score+1)// run code for player to gain a point
                    }
                    lane.push(nextIdenticon[i].shift())
                    return lane
                })
            })
            if (followers.length) {
                setNextIdenticon(buildIdenticon(followers.shift()))
            } else {
                // run code to finish the game ('YOU WIN!')
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
                    if (block) {
                        // run code for player killed ('GAME OVER!')
                    }
                    lane.push(nextIdenticon[i].shift())
                    return lane
                })
            })
        }
    }, [t])

    return (
           
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
    </div>)

  
}

export default Game
