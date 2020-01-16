import React from 'react';
import './Form.css';
import Game from '../Game/Game'
import getData from '../../utils/getData'

const Form = () => {
  const [username,setUsername] = React.useState('')
  const [userData,setUserData] = React.useState(null)
  const [play, setPlay] = false;

  const changeUsername = e => { setUsername(e.target.value) }
  const playGame = e => {
    e.preventDefault()
    getData(username)
      .then(data => setUserData(data))
  }

  React.useEffect(() => {
    document.querySelector().addEventListener()
  }, [])

  if (!userData) {
    return (<form>
      <label htmlFor="username" className="form__label">
        Enter your GitHub username:
        <input type="text" value={username} onchange={changeUsername} />
      </label>
      <input type="submit" onclick={playGame} />


    </form>)
  } else {
    const { username, followers_url } = userData;
    return <Game />
  }
}

export default Form;
