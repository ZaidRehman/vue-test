const getMovies = (search) => {
  return fetch(`http://www.omdbapi.com/?apikey=428abbdc&s=${search}`)
    .then(res => res.json())
}

export default {
  getMovies
}