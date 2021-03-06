<template>
  <ul id="containers">
    <li v-for="country in countries" :key="country">
      <div class="container">
        <h2>{{ country }} : {{ _formattedPeriod }}</h2>
        <div class="chart">
          <h3>Daily</h3>
          <line-chart v-if="loaded" :chart-data="dailyChartData[country]" :options="options"/>
        </div>
        <div class="chart">
          <h3>Cumulative</h3>
          <line-chart v-if="loaded" :chart-data="chartData[country]" :options="options"/>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import LineChart from "@/components/BarChart.js";

import { loadData } from "@/utils/dataLoader";
import { confirmed, deaths, groupByCountry, toDaily } from "@/utils/dataWrangler";
import { dateToDay, dateBeautify } from "@/utils/dateFormatter";

export default {
  name: "Container",
  components: { LineChart },
  props: {
    countries: {
      type: Array,
      default: null
    },
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    }
  },
  data: () => ({
    loaded: false,
    locations: [],
    dates: [],
    chartData: {},
    dailyChartData: {},
    options: {
      scales: {
        xAxes: [
          {
            display: false
          }
        ],
        yAxes: [
          {
            display: true
          }
        ]
      }
    }
  }),
  computed: {
    _to() {
      return this.endDate ? dateToDay(this.endDate) : dateToDay(new Date());
    },
    _from() {
      return this.startDate
        ? dateToDay(this.startDate)
        : dateToDay(new Date(2020, 0, 22));
    },
    _formattedPeriod() {
      return `${dateBeautify(this._from)} - ${dateBeautify(this._to)}`;
    }
  },
  async mounted() {
    this.loaded = false;
    try {
      const stats = await loadData(this.countries, this._from, this._to);
      this.locations = Object.keys(stats);
      this.dates = stats[this.locations[0]].map(entry => entry.date);
      this.countries.forEach(country => {
        this.byCountry = groupByCountry(stats);
        this.confirmed = confirmed(this.byCountry, country);
        this.deaths = deaths(this.byCountry, country);
        this.dailyConfirmed = toDaily(this.confirmed);
        this.dailyDeaths = toDaily(this.deaths);
        this.chartData[country] = {
          labels: this.dates,
          datasets: [
            {
              label: "confirmed",
              backgroundColor: "#f7bf05",
              borderColor: "#f7bf05",
              borderWidth: 1,
              data: this.confirmed
            },
            {
              label: "deaths",
              backgroundColor: "#fc0000",
              borderColor: "#fc0000",
              borderWidth: 1,
              data: this.deaths
            }
          ]
        };
        this.dailyChartData[country] = {
          labels: this.dates,
          datasets: [
            {
              label: "confirmed",
              backgroundColor: "#f7bf05",
              borderColor: "#f7bf05",
              borderWidth: 1,
              data: this.dailyConfirmed
            },
            {
              label: "deaths",
              backgroundColor: "#fc0000",
              borderColor: "#fc0000",
              borderWidth: 1,
              data: this.dailyDeaths
            }
          ]
        };
      });
      this.loaded = true;
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style>
.chart {
  float: left;
  width: 50%;
}

/* Clear floats after the columns */
.container:after {
  content: "";
  display: table;
  clear: both;
}
</style>
