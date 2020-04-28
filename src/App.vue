<template>
  <div id="app">
    <div>
      <b-navbar type="dark" variant="dark">
        <b-collapse is-nav>
          <b-navbar-brand to="/">COVID-19 Statistics</b-navbar-brand>
          <b-navbar-nav>
            <b-nav-item class="mr-sm-2" to="/">World</b-nav-item>
            <b-nav-item class="mr-sm-2" to="/continent">Continents</b-nav-item>
            <b-nav-item class="mr-sm-2" to="/country">Countries</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item class="mr-sm-2" to="/analysis">Analysis</b-nav-item>
            <b-nav-item class="mr-sm-2" to="/about">About</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <br />
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "app",
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
