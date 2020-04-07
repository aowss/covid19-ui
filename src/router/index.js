import Vue from "vue";
import VueRouter from "vue-router";
import World from "../views/World.vue";
import Continents from "../views/Continents.vue";
import Countries from "../views/Countries.vue";
import Regions from "../views/Regions.vue";
import Analysis from "../views/Analysis.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "World",
    component: World
  },
  {
    path: "/continent",
    component: Continents
  },
  {
    path: "/continent/:continentName",
    name: "Continents",
    component: Continents
  },
  {
    path: "/country",
    component: Countries
  },
  {
    path: "/country/:countryName",
    name: "Countries",
    props: true,
    component: Countries
  },
  {
    path: "/region",
    component: Regions
  },
  {
    path: "/region/:countryName",
    name: "Regions",
    component: Regions
  },
  {
    path: "/analysis",
    name: "Analysis",
    component: Analysis
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
