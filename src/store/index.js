import Vuex from "vuex";
import Vue from "vue";
import stats from "@/store/modules/stats";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stats
  },
  strict: process.env.NODE_ENV !== 'production'
});
