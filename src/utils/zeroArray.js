// builds array with dimensions x,y where all entries are 0
// i.e. an array of x arrays with y zero entries in each
const zeroArray = (x,y) => {
  let a = []
  for (let i=0; i<x; i++) {
    a.push(new Array(y).fill(0))
  }
  return a
}

export default zeroArray;
