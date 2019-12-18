<template>
  <div
    class="movie-poster"
    v-bind:class="{ 'movie-poster--details': isDetailPage }"
  >
    <img
      class="movie-poster__image"
      v-bind:src="this.sourceOfImage"
      alt="moviePoster"
    />
    <div
      class="movie-poster__toggle-button"
      v-on:click="$emit('toggle', isPlusIcon)"
      v-bind:class="{
        'no-show': !isDetailPage,
        'movie-poster__toggle-button--red': !isPlusIcon
      }"
    >
      <font-awesome-icon icon="plus" v-if="this.isPlusIcon" />
      <font-awesome-icon icon="minus" v-if="!this.isPlusIcon" />
    </div>
  </div>
</template>

<script>
export default {
  name: "movie-poster",
  props: ["sourceOfImage", "isPlusIcon"],
  event: "toggle",
  data() {
    return {
      isDetailPage: false
    };
  },
  created() {
    let path = this.$route.name;
    if (path == "MovieDetails") {
      this.isDetailPage = true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/scss/movie-poster.scss";
</style>
