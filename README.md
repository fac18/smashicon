# SMASHICON

The game where you smash through your followers!

![](https://media.giphy.com/media/sXdRmzMpWWHcY/giphy.gif)

[![Netlify Status](https://api.netlify.com/api/v1/badges/b76ea68c-2b6a-4e91-9343-eb5f444db034/deploy-status)](https://app.netlify.com/sites/smashicon/deploys)

---

## Ideas

![](https://i.imgur.com/zxNyvY9.jpg)

---

## Concept and user journey

Our game will work like so:

- [x] You are your GitHub profile picture, starting in the middle a 5 lane superhighway
- [x] The highway is blocked by your followers' identicons (cf. [samjam48's project](https://github.com/samjam48/elixir-identicon))
- [x] With each 1s interval, you move forward one space

---

- [x] You can move left and right (within the 5 lanes) as much as you like
- [ ] You can also shoot a laser once per 3 (?) steps, which removes the next block in your current lane - **abandoned**
- [x] You can see 10 steps ahead (birds eye view, not perspective)

---

### Stretches

- [ ] Add animation to make movements smooth
- [x] Make the time interval tweakable i.e. can make game harder
- [ ] Once you get past an identicon, the related user's profile will appear in a 'Followers Smashed' area
- [ ] Add an additional score aspect by implementing GitHub stars to grab

---

## Utils

### zeroArray

```javascript
const zeroArray = (x, y) => {
  let a = []
  for (let i = 0; i < x; i++) {
    a.push(new Array(y).fill(0))
  }
  return a
}

export default zeroArray
```

---

### buildIdenticon

We decided to build the user's identicons from scratch (given their username), since for our purposes we needed them to be represented as an array anyway.

The algorithm GitHub uses is not public, which makes this job a bit more difficult.

---

For example, @edificex's identicon looks like:

![](https://github.com/identicons/edificex.png)

---

#### The method

According to @samjam48's readme for his [elixir-identicon](https://github.com/samjam48/elixir-identicon) project, these are produced by:

- producing an MD5 hash of the username
- parsing this hash as an array of 16 numbers in base 16 (i.e. hexes)
- defining the colour by taking the first three of these numbers as arguments to RGB
- colouring in blocks for the first 3 columns according to resolving each hex to true or false against some test\*, when they are associated with cells according to the pattern below
- mirroring the first two columns into the last two

\*According to [Jussi Judin's article](https://barro.github.io/2018/02/avatars-identicons-and-hash-visualization/), the truth test used is **parity**, (i.e. is the number, in base 2, even or odd?)

---

##### Patterns

These describe the association of the first 15 numbers to cells in the identicon's grid.

###### Pattern 1 (according to samjam):

01 02 03 ## ##
04 05 06 ## ##
07 08 09 ## ##
10 11 12 ## ##
13 14 15 ## ##

NB. The 16th number is discarded

---

###### Pattern 2 (according to Jussi Judin):

01 06 11 ## ##
02 07 12 ## ##
03 08 13 ## ##
04 09 14 ## ##
05 10 15 ## ##

As yet, neither of these patterns are yield proper GitHub identicons...

---

```javascript
const buildIdenticon = username => {
  const hash = md5(username) // get md5 hash of given username
  let hexes = hash.match(/.{2}/g) // split into 16 numbers (all hex, base 16)
  let identicon = zeroArray(5,5) // initialise identicon as empty 5x5 grid
  // pattern 1 (see readme)
  for (let j=4; j>=0;` j--) {
    for (let i=0; i<3; i++) {
      identicon[i][j] = parseInt(hexes[i + (4-j)*3],16) % 2 === 0 ? 1 : 0;
    }
  }
  return identicon
}
```

---

## The Game component

### Design

![](https://i.imgur.com/JAZpWPw.jpg)

---

![](https://i.imgur.com/sIOjFjN.jpg)

---

### State setup

```javascript
// set up states
const [field, setField] = React.useState(() => {
  const initialIdenticon = buildIdenticon(username)
  const initialField = zeroArray(5, 5)
  initialField.forEach((lane, i) => {
    initialField[i] = lane.concat(initialIdenticon[i])
  })
  return initialField
})
const [nextIdenticon, setNextIdenticon] = React.useState(() => {
  return buildIdenticon(followers.shift())
})
const [t, setT] = React.useState(0)
const [playerPosition, setPlayerPosition] = React.useState(2)
const [score, setScore] = React.useState(0)
const [gameOver, setGameOver] = React.useState(false)
```

---

### Setting the timer

```javascript
React.useEffect(() => {
  const tick = () => {
    setT(t => t + 1)
  }
  const timer = setInterval(tick, interval)
  return () => {
    clearInterval(timer)
  }
}, [interval]) // dependency array could also be empty, but lint dislikes
```

---

### Evolving the game per time

```javascript
React.useEffect(() => {
  if (t % 10 === 0 && t !== 0) {
    setField(field => {
      return field.map((lane, i) => {
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
  } else if (t % 10 < 6 && t !== 0) {
    setField(field => {
      return field.map((lane, i) => {
        lane.shift()
        lane.push(0)
        return lane
      })
    })
  } else if (t % 10 < 10 && t !== 0) {
    setField(field => {
      return field.map((lane, i) => {
        const block = lane.shift()
        if (block && playerPosition === i) {
          setScore(score => score + 1) // run code for player to gain a point
        }
        lane.push(nextIdenticon[i].shift())
        return lane
      })
    })
  }
}, [t])
```

---

### The React element

```javascript
if (!gameOver) {
  return (
    <div className='game'>
      <Scoreboard score={score} />
      <div className='game-grid'>
        {field.map((lane, i) => {
          return (
            <div key={i} className='game-grid__column'>
              {lane.map((block, j) => {
                let reversej = lane.length - 1 - j
                return lane[reversej] ? (
                  <div
                    key={i.toString() + reversej.toString()}
                    className='game-grid__square game-grid__square--active'
                  ></div>
                ) : (
                  <div
                    key={i.toString() + reversej.toString()}
                    className='game-grid__square'
                  ></div>
                )
              })}
            </div>
          )
        })}
      </div>
      <Player playerPosition={playerPosition} avatarUrl={avatarUrl} />
    </div>
  )
} else {
  return <FinalScreen score={score} />
}
```

---

## Demo

[Smashicon on Netlify](https://smashicon.netlify.com/)

[go-mobile branch on Netlify](https://go-mobile--smashicon.netlify.com/)

---

## No scrolling

```javascript
@media (max-height: 70vw) {
  .game-grid__column {
    grid-template-rows: repeat(10, 3vw);
  }
}
```

---

## Going mobile: swiping

We wanted the game to be playable on a phone (i.e. without access to a keyboard with left and right arrow keys).

This meant adding another event listener to handle touches.

On some investigation, we found the [touchmove](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/ontouchmove) event.

The first problem with trying to implement this is how to test it! I can't run npm start on my phone??

---

To solve this we wrote some code to test, pushed it to GitHub as a branch, and used Netlify to [deploy that branch](https://docs.netlify.com/site-deploys/overview/#branch-deploy-controls) without altering the usual master deploy.

Here's what we came up with. It's not a perfect implementation by any stretch, but you can move!

---

```javascript
// set up event listeners for mobile (i.e. touch users)
let xDown
const touchdown = e => {
  e.preventDefault() // ensures touch does not trigger mouse events
  // grab position of centre of finger at beginning of swipe
  xDown = e.touches[0].clientX // we don't care about y position
}
const swipe = e => {
  e.preventDefault()
  const xMove = e.touches[0].clientX
  const xDiff = Math.abs(xDown - xMove)
  if (xDiff > 30) {
    // enable only for sufficient swipes
    if (xMove < xDown) {
      // swipe left
      movePlayerLeft()
    } else if (xMove > xDown) {
      // swipe right
      movePlayerRight()
    }
  }
}
document.addEventListener('touchstart', touchdown)
document.addEventListener('touchmove', swipe)
```

---

## Testing component unmounts

We tried to fully test our Form component, which on submission makes two separate API calls before it unmounts itself and mounts the Game component instead, with the appropriate information.

This was difficult because we needed to implement two different mocks of the fetch being made.

We haven't got it working yet but our attempt is as follows:

---

```javascript
test('check if the form works', () => {
  const { getByLabelText, getByText, findByText, container, debug } = render(
    <Form />
  )
  const inputNode = getByLabelText('Enter your GitHub username')
  fireEvent.change(inputNode, { target: { value: 'ayub3' } })
  const slider = container.querySelector('.form__range')
  fireEvent.change(slider, { target: { value: 500 } })
  const button = getByText('Play!')
  // mock fetch for both API calls made by Form component on submission
  const mockUserResponse = {
    username: 'ayub3',
    followers_url: '',
    interval: 500,
    avatar_url: 'https://avatars3.githubusercontent.com/u/50529930?s=460&v=4',
  }
  const mockFollowersResponse = [{ login: 'svnmmrs' }, { login: 'redahaq' }]
  global.fetch = jest
    .fn()
    .mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockUserResponse),
      })
    )
    .mockImplementationOnce(() => {
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockFollowersResponse),
      })
    })
  fireEvent.click(button)
  return findByText('0') // look for score of 0 once Form unmounted and Game mounted
})
```
