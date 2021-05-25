<template>
  <div class="imdb">
    <div class="imdb-head">
      <input v-model="search" type="text" />
      <button class="search" @click="searchMovies">Search</button>
    </div>
    <div class="imdb-error" v-if="isError">Something went wrong</div>
    <div class="imdb-main" v-else>
      <div class="movie" v-for="movie in movies" :key="movie.imdbID">
        <img :src="movie.Poster" />
        <span>{{ movie.Title }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
button {
  background: #42b983;
  color: white;
  border: 1px solid #42b983;
  border-radius: 50px;
  padding: 7px;
  font-size: 18px;
  margin: 20px;
  cursor: pointer;
}
input {
  height: 30px;
  width: 30%;
  border-radius: 30px;
  border: 3px solid #42b983;
  font-size: 25px;
  padding: 0px 10px;
}
input:focus {
  outline: none;
}
span {
  font-weight: bold;
}
img {
  width: 200px;
}
.imdb-main {
  display: flex;
  flex-wrap: wrap;
}
.movie {
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: center;
  max-width: 200px;
}
</style>

<script>
import service from "../services/imdb-service";

export default {
  name: "imdb",
  data() {
    return {
      movies: [],
      search: "",
      isError: false,
    };
  },
  methods: {
    searchMovies() {
      return service
        .getMovies(this.search)
        .then((data) => {
          this.movies = data.Search;
          this.isError = false;
        })
        .catch(() => {
          this.movies = [];
          this.isError = true;
        });
    },
  },
};
</script>
