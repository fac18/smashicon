import React from 'react';
import './Form.css';
import Game from '../Game/Game'
import getData from '../../utils/getData'

const Form = () => {
  const [username,setUsername] = React.useState('')
  const [userData,setUserData] = React.useState(null)
  const [play, setPlay] = React.useState(false);

  const changeUsername = e => { setUsername(e.target.value) }
  const playGame = e => {
    e.preventDefault()
    getData(`https://api.github.com/users/${username}`)
      .then(data => setUserData(data))
  }

  React.useEffect(() => {
    document.querySelector('.form__submit').addEventListener('click', playGame)
  }, [])

  if (!userData) {
    return (<form>
      <label htmlFor="username" className="form__label">
        Enter your GitHub username:
        <input type="text" className="form__input" value={username} onChange={changeUsername} />
      </label>
      <input type="submit" className="form__submit" onClick={playGame} />
    </form>)
  }

  const { followers_url } = userData;
  return <Game username={username} followersUrl={followers_url} />
}

export default Form;
