import React from 'react'
import './Form.css'
import Game from '../Game/Game'
import getData from '../../utils/getData'

const Form = () => {
  const [username, setUsername] = React.useState('')
  const [interval, setInterval] = React.useState(300)
  const [userData, setUserData] = React.useState(null)
  const [followers, setFollowers] = React.useState(null)

  // write functions for controlling form events
  const changeUsername = e => {
    setUsername(e.target.value)
  }
  const changeInterval = e => {
    setInterval(e.target.value)
  }
  const getUser = e => {
    e.preventDefault()
    getData(`https://api.github.com/users/${username}`).then(data =>
      setUserData(data)
    )
  }

  // make effect to make 2nd API call for followers once userData available
  React.useEffect(() => {
    if (userData) {
      getData(userData.followers_url)
        .then(data => data.map(follower => follower.login))
        .then(followers => setFollowers(followers))
    }
  }, [userData])

  // until username is entered and user AND follower data retrieved, display form
  if (!followers) {
    return (
      <form className='form'>
        <label htmlFor='username' className='form__label'>
          Enter your GitHub username
        </label>
        <input
          type='text'
          className='form__input'
          id='username'
          value={username}
          onChange={changeUsername}
        />
        <label htmlFor='difficulty' className='form__label'>
          Choose your difficulty
        </label>
        <div className='form__range-container'>
          <span>hard</span>
          <input
            type='range'
            min='100'
            max='1000'
            step='100'
            id='difficulty'
            value={interval}
            onChange={changeInterval}
            className='form__range'
          />
          <span>easy</span>
        </div>
        <button type='submit' className='form__submit' onClick={getUser}>
          Play!
        </button>
      </form>
    )
  }

  const { avatar_url } = userData
  return (
    <Game
      username={username}
      interval={interval}
      followers={followers}
      avatarUrl={avatar_url}
    />
  )
}

export default Form
