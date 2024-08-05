export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => {
        if(!response.ok) {
          throw new Error('could not fetch')
        }
        return response.json()
      })
}
export const postUrls = (url) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    headers: {
      'Content-Type':'application/json'
    },
    method: 'POST',
    body: JSON.stringify(url)
  })
  .then(response => {
    if(!response.ok) {
      throw new Error ('could not post')
    }
    return response.json()
  })
}