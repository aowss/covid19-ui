import Vue from "vue";
import VueRouter from "vue-router";
import World from "@/views/World.vue";
import Continents from "@/views/Continents.vue";
import Countries from "@/views/Countries.vue";
import Regions from "@/views/Regions.vue";
import Analysis from "@/views/Analysis.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "World",
    component: World,
    meta: {
      title: 'Covid-19 World View',
      metaTags: [
        {
          name: 'description',
          content: 'The Covid-19 world statistics.'
        }
      ]
    }
  },
  {
    path: "/continent",
    component: Continents,
    meta: {
      title: 'Covid-19 Continents View',
      metaTags: [
        {
          name: 'description',
          content: 'The Covid-19 continents statistics.'
        }
      ]
    }
  },
  {
    path: "/continent/:continentName",
    name: "Continents",
    props: true,
    component: Continents,
    meta: {
      title: 'Covid-19 Continents View',
      metaTags: [
        {
          name: 'description',
          content: 'The Covid-19 continents statistics.'
        }
      ]
    }
  },
  {
    path: "/country",
    component: Countries,
    meta: {
      title: 'Covid-19 Countries View',
      metaTags: [
        {
          name: 'description',
          content: 'The Covid-19 countries statistics.'
        }
      ]
    }
  },
  {
    path: "/country/:countryName",
    name: "Countries",
    props: true,
    component: Countries,
    meta: {
      title: 'Covid-19 Countries View',
      metaTags: [
        {
          name: 'description',
          content: 'The Covid-19 countries statistics.'
        }
      ]
    }
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
    component: Analysis,
    meta: {
      title: 'Covid-19 Analysis',
      metaTags: [
        {
          name: 'description',
          content: 'The Covid-19 statistics analysis.'
        }
      ]
    }
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

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Covid-19 Statistics";
  next();
});

export default router;
