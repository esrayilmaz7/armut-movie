<template>
  <div class="movieList">
    <movie
      v-for="movie in movieListData"
      v-bind:key="movie.id"
      v-bind:src="movie.posterurl"
      v-bind:name="movie.originalTitle"
      v-bind:info="movie.info"
      v-bind:rate="movie.imdbRating"
      v-bind:id="movie.id"
    ></movie>
  </div>
</template>

<script>
import Movie from "./Movie";
import movieList from "../data/movielist.json";

export default {
  components: {
    Movie
  },
  name: "MovieList",
  data() {
    return {
      movieListData: movieList
    };
  },
  created() {
    this.movieListData.forEach(element => {
      let info = "";
      info += element.year + " · ";
      for (let i = 0; i < element.genres.length; i++) {
        if (i != element.genres.length - 1) info += element.genres[i] + ",";
        else info += element.genres[i] + " · ";
      }
      let time = element.duration;
      time = time.substring(2, time.length - 1);
      let duration = parseInt(time);
      let hour = Math.floor(duration / 60);
      let minute = duration % 60;
      info += hour + "h " + minute + "m";
      element.info = info;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
