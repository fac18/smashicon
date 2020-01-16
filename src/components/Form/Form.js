import React from 'react';
import './Form.css';
import Game from '../Game/Game'

const Form = () => {
  const [username,setUsername] = React.useState('')
  const [userData,setUserData] = React.useState(null)
  const [play, setPlay] = false;

  const changeUsername = e => { setUsername(e.target.value) }

  React.useEffect(() => {
    document.querySelector().addEventListener()
  }, [])

  if (!userData) {
    return (<form>
      <label htmlFor="username" className="form__label">
        Enter your GitHub username:
        <input type="text" value={username} onChange={changeUsername} />
      </label>


    </form>)
  } else {
    const { username, followers_url } = userData;
    return <Game />
  }
}

export default Form;
