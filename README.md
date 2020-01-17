# SMASHICON

The game where you smash through your followers!

[![Netlify Status](https://api.netlify.com/api/v1/badges/b76ea68c-2b6a-4e91-9343-eb5f444db034/deploy-status)](https://app.netlify.com/sites/smashicon/deploys)

## Concept

Our game will work like so:

- [x] You are your GitHub profile picture, starting in the middle a 5 lane superhighway
- [x] The highway is blocked by your followers' identicons (cf. [samjam48's project](https://github.com/samjam48/elixir-identicon))
- [x] With each 1s interval, you move forward one space
- [x] You can move left and right (within the 5 lanes) as much as you like
- [ ] You can also shoot a laser once per 3 (?) steps, which removes the next block in your current lane - **abandoned**
- [x] You can see 10 steps ahead (birds eye view, not perspective)

### Stretches

- [ ] Add animation to make movements smooth
- [x] Make the time interval tweakable i.e. can make game harder
- [ ] Once you get past an identicon, the related user's profile will appear in a 'Followers Smashed' area
- [ ] Add an additional score aspect by implementing GitHub stars to grab

---

## Identicon construction

We decided to build the user's identicons from scratch (given their username), since for our purposes we needed them to be represented as an array anyway.

The algorithm GitHub uses is not public, which makes this job a bit more difficult.

For example, @svnmmrs's identicon looks like:

![](https://github.com/identicons/svnmmrs.png)

### The method

According to @samjam48's readme for his [elixir-identicon](https://github.com/samjam48/elixir-identicon) project, these are produced by:

- producing an MD5 hash of the username
- parsing this hash as an array of 16 numbers in base 16 (i.e. hexes)
- defining the colour by taking the first three of these numbers as arguments to RGB
- colouring in blocks for the first 3 columns according to resolving each hex to true or false against some test*, when they are associated with cells according to the pattern below
- mirroring the first two columns into the last two


*According to [Jussi Judin's article](https://barro.github.io/2018/02/avatars-identicons-and-hash-visualization/), the truth test used is **parity**, (i.e. is the number, in base 2, even or odd?)

#### Patterns

These describe the association of the first 15 numbers to cells in the identicon's grid.

##### Pattern 1 (according to samjam):

01 02 03 ## ##
04 05 06 ## ##
07 08 09 ## ##
10 11 12 ## ##
13 14 15 ## ##

NB. The 16th number is discarded

##### Pattern 2 (according to Jussi Judin):

01 06 11 ## ##
02 07 12 ## ##
03 08 13 ## ##
04 09 14 ## ##
05 10 15 ## ##

As yet, neither of these patterns are yielding proper GitHub identicons...

---

### GameBoard 
 
``` const zeroArray = (x,y) => {
  let a = []
  for (let i=0; i<x; i++) {
    a.push(new Array(y).fill(0))
  }
  return a
}

export default zeroArray;


```

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

The first problem with trying to implement this is how to test it! I can't run `npm start` on my phone??

To solve this we wrote some code to test, pushed it to GitHub as a branch, and used Netlify to [deploy that branch](https://docs.netlify.com/site-deploys/overview/#branch-deploy-controls) without altering the usual master deploy.

Here's what we came up with. It's not a perfect implementation by any stretch, but you can move!

```javascript
// set up event listeners for mobile (i.e. touch users)
let xDown;
const touchdown = e => {
  e.preventDefault() // ensures touch does not trigger mouse events
  // grab position of centre of finger at beginning of swipe
  xDown = e.touches[0].clientX // we don't care about y position
}
const swipe = e => {
  e.preventDefault()
  const xMove = e.touches[0].clientX;
  const xDiff = Math.abs(xDown - xMove)
  if (xDiff > 30) { // enable only for sufficient swipes
    if (xMove < xDown) { // swipe left
      movePlayerLeft()
    } else if (xMove > xDown) { // swipe right
      movePlayerRight()
    }
  }
}
document.addEventListener('touchstart', touchdown)
document.addEventListener('touchmove', swipe)
```

---

## Testing component unmounts

