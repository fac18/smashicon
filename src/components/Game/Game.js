import React from 'react';
import './Game.css';
import zeroArray from '../../utils/zeroArray'
import buildIdenticon from '../../utils/buildIdenticon'

const Game = props => {
    // hard code data that would be passed in
    const username = 'Ayub3' // github username submitted at landing
    const interval = 1000; // time between steps in ms
    const followers = ['svnmmrs','yeoyeo']

    // set up states
    const [nextIdenticon , setNextIdenticon] = React.useState(buildIdenticon(username))
    const initialField = zeroArray(5,5)
    initialField.forEach((lane,i) => { initialField[i] = lane.concat(nextIdenticon[i]) })
    const [field , setField] = React.useState(initialField) 
    const [t , setT] = React.useState(0);

    // set up time ticker
    const tick = () => { setT(t => t + 1) }
    setInterval(tick, interval)

    // run this code every time time ticks
    React.useEffect(() => {
        if (t % 10 === 0) {
            setField(field => {
                field.forEach((lane,i) => {
                    const block = lane.shift()
                    if (block) {
                        // run code for player killed ('GAME OVER!')
                    }
                    lane.push(nextIdenticon[i].shift())
                })
            })
            if (followers.length) {
                setNextIdenticon(buildIdenticon(followers.shift()))
            } else {
                // run code to finish the game ('YOU WIN!')
            }
        }
        else if(t % 10 < 6) {
            setField(field => {
                field.forEach((lane,i) => {
                    lane.shift()
                    lane.push(0)
                })
            })
        }
        else if(t % 10 < 10) {
            setField(field => {
                field.forEach((lane,i) => {
                    const block = lane.shift()
                    if (block) {
                        // run code for player killed ('GAME OVER!')
                    }
                    lane.push(nextIdenticon[i].shift())
                })
            })
        }
        
    }, [t])


}

export default Game
