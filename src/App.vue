<template>
  <div id="app">
    <j-header></j-header>
    <div class="container" id="nav">
      <div class="row">
        <div class="col-lg-2"><button type="button" class="btn btn-outline-primary btn-lg"><router-link to="/">World</router-link></button></div>
        <div class="col-lg-2"><button type="button" class="btn btn-outline-primary btn-lg"><router-link to="/continent">Continents</router-link></button></div>
        <div class="col-lg-2"><button type="button" class="btn btn-outline-primary btn-lg"><router-link to="/country">Countries</router-link></button></div>
        <div class="col-lg-2"><button type="button" class="btn btn-outline-primary btn-lg"><router-link to="/region">Regions</router-link></button></div>
        <div class="col-lg-2"><button type="button" class="btn btn-outline-primary btn-lg"><router-link to="/analysis">Analysis</router-link></button></div>
        <div class="col-lg-2"><button type="button" class="btn btn-outline-primary btn-lg"><router-link to="/about">About</router-link></button></div>
      </div>
    </div>
    <router-view />
    <j-footer></j-footer>
  </div>
</template>

<script>
import JHeader from "@/components/Header";
import JFooter from "@/components/Footer";
import { mapActions } from "vuex";

export default {
  name: "app",
  components: { JHeader, JFooter },
  methods: mapActions(["fetchStats"]),
  created() {
    this.fetchStats();
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
