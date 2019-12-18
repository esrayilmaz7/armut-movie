import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    addedMovies: []
  },
  mutations: {
    ADD_MOVIE(state, movieId) {
      state.addedMovies.push(movieId);
    },
    REMOVE_MOVIE(state, movieId) {
      let index = state.addedMovies.indexOf(movieId);
      state.addedMovies.splice(index, 1);
    }
  },
  actions: {
    addMovie({ commit }, movieId) {
      commit("ADD_MOVIE", movieId);
    },
    removeMovie({ commit }, movieId) {
      commit("REMOVE_MOVIE", movieId);
    }
  },
  getters: {
    getAddedMovies: state => {
      return state.addedMovies;
    }
  }
});
