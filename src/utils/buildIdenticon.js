import zeroArray from './zeroArray'

const md5 = require('md5')
// generate array representation of identicon of given username
// where result[x][y] gives the cell taking bottom left corner as [0,0]
const buildIdenticon = username => {
  const hash = md5(username) // get md5 hash of given username
  let hexes = hash.match(/.{2}/g) // split into 16 numbers (all hex, base 16)
  console.log({hexes})
  let identicon = zeroArray(5,5) // initialise identicon as empty 5x5 grid
  // fill in identicon grid with hex values tested for ???
  for (let j=4; j>=0; j--) {
    for (let i=0; i<3; i++) {
      console.log(`identicon position ${i},${j} takes hex ${hexes[i + (4-j)*3]} at index ${i + (4-j)*3}`)
      identicon[i][j] = parseInt(hexes[i + (4-j)*3],16) % 2 === 0 ? 1 : 0;
    }
  }
  // mirror first two columns into last two (i.e. reflect in the line y=2)
  for (let i=0; i<2; i++) {
    for (let j=0; j<5; j++) {
      identicon[4-i][j] = identicon[i][j]
    }
  }
  console.log({identicon})
  return identicon;
}

export default buildIdenticon
