// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import VueMaterial from "vue-material";
import PortalVue from "portal-vue";
import BootstrapVue from "bootstrap-vue";
import "vue-material/dist/vue-material.min.css";
import "vue-material/dist/theme/default.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vuex from "vuex";
import { store } from "./store.js";

Vue.use(Vuex);

library.add(faPlus);
library.add(faMinus);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueMaterial);
Vue.use(PortalVue);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App),
  components: { App },
  template: "<App/>"
});
