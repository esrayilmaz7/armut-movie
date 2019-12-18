<template>
  <div class="selected-movie">
    <movie-poster
      v-bind:sourceOfImage="src"
      v-bind:isPlusIcon="isPlusIcon"
      v-on:toggle="toggleButton()"
    ></movie-poster>
    <div class="selected-movie__description">
      <div class="selected-movie__upper-part">
        <span class="selected-movie__name">{{ movie.originalTitle }}</span>
        <div class="selected-movie__rating">
          <span class="selected-movie__rating--rate">{{
            movie.imdbRating
          }}</span>
        </div>
        <progress-bar
          class="selected-movie__progressbar"
          v-bind:amount="movie.imdbRating * 10"
        ></progress-bar>
      </div>
      <p class="selected-movie__info">{{ movie.info }}</p>
      <p class="selected-movie__content">{{ movie.storyline }}</p>
      <div class="selected-movie__lower-part container">
        <div class="selected-movie__lower-part--inner row no-gutters">
          <span class="selected-movie__lower-part--description col-3">{{
            directors
          }}</span>
          <span class="selected-movie__lower-part--explanation col-9">
            {{ directorsArr }}
            <span
              class="selected-movie__lower-part--extra"
              v-if="directorSeen"
              @click="directorsClick()"
            >
              {{ extraDirectors }}
            </span>
          </span>
        </div>
        <div class="selected-movie__lower-part--inner row no-gutters">
          <span class="selected-movie__lower-part--description col-3">{{
            writers
          }}</span>
          <span class="selected-movie__lower-part--explanation col-9">
            {{ writersArr }}
            <span
              class="selected-movie__lower-part--extra"
              v-if="writerSeen"
              @click="writersClick()"
              >{{ extraWriters }}</span
            >
          </span>
        </div>
        <div class="selected-movie__lower-part--inner row no-gutters">
          <span class="selected-movie__lower-part--description col-3">{{
            stars
          }}</span>
          <span class="selected-movie__lower-part--explanation col-9">
            {{ starsArr }}
            <span
              class="selected-movie__lower-part--extra"
              v-if="starSeen"
              @click="starsClick()"
              >{{ extraStars }}</span
            >
          </span>
        </div>
      </div>
    </div>
    <div class="selected-movie__toggle">
      <button
        ref="button"
        class="selected-movie__button"
        v-on:click="toggleButton()"
        v-bind:class="{ 'btn-remove': !isPlusIcon }"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>

<script>
import MoviePoster from "./MoviePoster";
import ProgressBar from "./ProgressBar";
import movie1 from "../data/0001.json";
import movie2 from "../data/0002.json";
import movie3 from "../data/0003.json";
import { mapState } from "vuex";

export default {
  components: {
    MoviePoster,
    ProgressBar
  },
  computed: {
    ...mapState(["addedMovies"])
  },
  name: "MovieDetails",
  data() {
    return {
      id: "",
      movie: {},
      directors: "Director: ",
      writers: "Writer: ",
      stars: "Star: ",
      directorsArr: "",
      writersArr: "",
      starsArr: "",
      directorSeen: false,
      writerSeen: false,
      starSeen: false,
      extraDirectors: "",
      extraWriters: "",
      extraStars: "",
      isDirectorExtra: false,
      isWriterExtra: false,
      isStarExtra: false,
      src: "",
      buttonText: "",
      isPlusIcon: true
    };
  },
  created() {
    this.id = this.$route.params.id;
    if (this.id == "0001") {
      this.movie = movie1;
    } else if (this.id == "0002") {
      this.movie = movie2;
    } else {
      this.movie = movie3;
    }

    this.src = this.movie.posterurl;
    let info = "";
    info += this.movie.year + " · ";
    for (let i = 0; i < this.movie.genres.length; i++) {
      if (i != this.movie.genres.length - 1) info += this.movie.genres[i] + ",";
      else info += this.movie.genres[i] + " · ";
    }
    let time = this.movie.duration;
    time = time.substring(2, time.length - 1);
    let duration = parseInt(time);
    let hour = Math.floor(duration / 60);
    let minute = duration % 60;
    info += hour + "h " + minute + "m";
    this.movie.info = info;

    let numberOfDirectors = this.movie.directors.length;
    if (numberOfDirectors > 1) {
      this.directors = "Directors: ";
      this.directorsArr =
        this.movie.directors[0] + ", " + this.movie.directors[1];
      if (numberOfDirectors > 2) {
        this.directorSeen = true;
        if (numberOfDirectors == 3) {
          this.extraDirectors = " | " + 1 + " more credit >>";
        } else if (numberOfDirectors > 3) {
          let count = numberOfDirectors - 2;
          this.extraDirectors = " | " + count + " more credits >>";
        }
      }
    } else {
      this.directorsArr = this.movie.directors.toString();
    }

    let numberOfWriters = this.movie.writers.length;
    if (numberOfWriters > 1) {
      this.writers = "Writers: ";
      this.writersArr = this.movie.writers[0] + ", " + this.movie.writers[1];
      if (numberOfWriters > 2) {
        this.writerSeen = true;
        if (numberOfWriters == 3) {
          this.extraWriters = " | " + 1 + " more credit >>";
        } else if (numberOfWriters > 3) {
          this.writerSeen = true;
          let count = numberOfWriters - 2;
          this.extraWriters = " | " + count + " more credits >>";
        }
      }
    } else {
      this.writersArr = this.movie.writers.toString();
    }

    let numberOfStars = this.movie.actors.length;
    if (numberOfStars > 1) {
      this.stars = "Stars: ";
      this.starsArr =
        this.movie.actors[0] +
        ", " +
        this.movie.actors[1] +
        ", " +
        this.movie.actors[2];
      if (numberOfStars > 3) {
        this.starSeen = true;
        this.extraStars = " | See full cast & crew >>";
      }
    }

    this.isPlusIcon = !this.addedMovies.includes(this.movie.id);

    if (this.isPlusIcon) {
      this.buttonText = "+ ADD TO WATCH LIST";
    } else {
      this.buttonText = "- REMOVE FROM WATCHLIST";
    }
  },
  methods: {
    toggleButton() {
      if (this.isPlusIcon) {
        this.$store.dispatch("addMovie", this.movie.id);
        this.isPlusIcon = false;
        this.buttonText = "- REMOVE FROM WATCHLIST";
      } else {
        this.$store.dispatch("removeMovie", this.movie.id);
        this.isPlusIcon = true;
        this.buttonText = "+ ADD TO WATCHLIST";
      }
    },
    directorsClick() {
      if (this.isDirectorExtra == true) {
        this.isDirectorExtra = false;
        this.directorsArr =
          this.movie.directors[0] + ", " + this.movie.directors[1];
        let numberOfDirectors = this.movie.directors.length;
        if (numberOfDirectors > 2) {
          if (numberOfDirectors == 3) {
            this.extraDirectors = " | " + 1 + " more credit >>";
          } else if (numberOfDirectors > 3) {
            let count = numberOfDirectors - 2;
            this.extraDirectors = " | " + count + " more credits >>";
          }
        }
      } else {
        this.isDirectorExtra = true;
        this.directorsArr = this.movie.directors
          .toString()
          .split(",")
          .join(", ");
        this.extraDirectors = " | << less";
      }
    },
    writersClick() {
      if (this.isWriterExtra == true) {
        this.isWriterExtra = false;
        this.writersArr = this.movie.writers[0] + ", " + this.movie.writers[1];
        let numberOfWriters = this.movie.writers.length;
        if (numberOfWriters > 2) {
          if (numberOfWriters == 3) {
            this.extraWriters = " | " + 1 + " more credit >>";
          } else if (numberOfWriters > 3) {
            let count = numberOfWriters - 2;
            this.extraWriters = " | " + count + " more credits >>";
          }
        }
      } else {
        this.isWriterExtra = true;
        this.writersArr = this.movie.writers
          .toString()
          .split(",")
          .join(", ");
        this.extraWriters = " | << less";
      }
    },
    starsClick() {
      if (this.isStarExtra) {
        this.isStarExtra = false;
        let numberOfStars = this.movie.actors.length;
        if (numberOfStars > 1) {
          this.starsArr =
            this.movie.actors[0] +
            ", " +
            this.movie.actors[1] +
            ", " +
            this.movie.actors[2];
          if (numberOfStars > 3) {
            this.extraStars = " | See full cast & crew >>";
          }
        }
      } else {
        this.isStarExtra = true;
        this.starsArr = this.movie.actors
          .toString()
          .split(",")
          .join(", ");
        this.extraStars = " | << less";
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "src/scss/movie-details.scss";
</style>
