<template>
  <div class="movie">
    <movie-poster v-bind:sourceOfImage="src"></movie-poster>
    <div class="movie__description">
      <h1 class="movie__name">{{ name }}</h1>
      <p class="movie__info">{{ info }}</p>
      <div class="movie__rating">
        <h3 class="movie__rating--rate">{{ rate }}</h3>
        <h4 class="movie__rating--max-rate">/10</h4>
      </div>
      <progress-bar v-bind:amount="rate * 10"></progress-bar>
    </div>
    <div class="movie__details">
      <button class="movie__button" v-on:click="navigate()">
        MOVIE DETAILS
      </button>
    </div>
  </div>
</template>

<script>
import MoviePoster from "./MoviePoster";
import ProgressBar from "./ProgressBar";
import router from "../router/index";

export default {
  components: {
    MoviePoster,
    ProgressBar
  },
  props: ["src", "name", "info", "amount", "rate", "id"],
  name: "movie",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    navigate() {
      router.push({ name: "MovieDetails", params: { id: this.id } });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "src/scss/movie.scss";
</style>
