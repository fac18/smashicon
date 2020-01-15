# SMASHICON

## Concept

Our game will work like so:

- You are your GitHub icon, arranged at the beginning a 5 lane superhighway
- The highway is blocked by your followers' identicons (cf. [samjam48's project](https://github.com/samjam48/elixir-identicon))
- With each 1s interval, you move forward one space
- You can move left and right (within the 5 lanes) as much as you like
- You can also shoot a laser once per 3 (?) steps, which removes the next block in your current lane
- You can see 10 steps ahead

### Stretches

- Add animation to make movements smooth
- Make the time interval tweakable i.e. can make game harder
- Once you get past an identicon, the related user's profile will appear in a 'Followers Smashed' area
- Add an additional score aspect by implementing GitHub stars to grab
