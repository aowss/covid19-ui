<template>
  <div v-if="isLoaded" id="world">
    <overview :stats="allStats"/>
  </div>
</template>

<script>
import Overview from "../components/Overview";

import { mapGetters } from "vuex";

export default {
  name: "World",
  components: { Overview },
  computed: {
    ...mapGetters(["isLoaded", "allStats"])
  }
};
</script>
