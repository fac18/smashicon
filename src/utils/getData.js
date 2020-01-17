const token = process.env.REACT_APP_GITHUB_TOKEN;

const handleResponse = response => {
  if (response.status !== 200) { // if response status not ok, let me know
    return console.log(`Error with the request. Status: ${response.status}`)
  }
  return response.json(); // returns promise with data as JSON
}

export const getData = url => {
  return fetch(`${url}?access_token=${token}`)
      .then(handleResponse)
      .catch(err => {
        throw new Error(`fetch getData failed: ${err}`)
      })
}

export default getData;
