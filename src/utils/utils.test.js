import zeroArray from './zeroArray'
// import buildIdenticon from './buildIdenticon'

describe('zeroArray returns array of zero-arrays', () => {
  test('zeroArray(5,10) has appropriate dimensions', () => {
    let fiveTen = zeroArray(5,10)
    expect(fiveTen.length).toBe(5)
    expect(fiveTen[0].length).toBe(10)
  })
  test('random entries in zeroArray(3,5) are 0', () => {
    let threeFive = zeroArray(3,5)
    let randomX = Math.floor(Math.random()*3)
    let randomY = Math.floor(Math.random()*5)
    expect(threeFive[randomX][randomY]).toBe(0)
  })
})
