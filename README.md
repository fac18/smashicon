# SMASHICON

The game where you evade your followers!

## Concept

Our game will work like so:

- You are your GitHub profile picture, starting in the middle a 5 lane superhighway
- The highway is blocked by your followers' identicons (cf. [samjam48's project](https://github.com/samjam48/elixir-identicon))
- With each 1s interval, you move forward one space
- You can move left and right (within the 5 lanes) as much as you like
- You can also shoot a laser once per 3 (?) steps, which removes the next block in your current lane
- You can see 10 steps ahead (birds eye view, not perspective)

### Stretches

- Add animation to make movements smooth
- Make the time interval tweakable i.e. can make game harder
- Once you get past an identicon, the related user's profile will appear in a 'Followers Smashed' area
- Add an additional score aspect by implementing GitHub stars to grab

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
