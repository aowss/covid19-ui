<template>
  <ul id="containers">
    <li v-for="country in countries" :key="country">
      <div class="container">
        <h2>{{ country }} : {{ _formattedPeriod }}</h2>
        <div class="chart">
        <h3>Daily</h3>
        <line-chart
          v-if="loaded"
          :chartdata="dailyChartData[country]"
          :options="options"/>
        </div>
        <div class="chart">
        <h3>Cumulative</h3>
        <line-chart
          v-if="loaded"
          :chartdata="chartData[country]"
          :options="options"/>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import LineChart from './Chart.js'

import { dateToDay, dateBeautify} from '../utils/dateFormatter'

export default {
  name: 'Container',
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
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: true
        }]
      }
    }
  }),
  computed: {
    _to () {
      console.log('end date: ' + this.endDate)
      var effectiveEndDate = this.endDate
      if (!this.endDate) {
        effectiveEndDate = new Date()
        effectiveEndDate.setDate(effectiveEndDate.getDate() - 1);
      }
      return dateToDay(effectiveEndDate)
    },
    _from () {
      console.log('start date: ' + this.startDate)
      return this.startDate ? dateToDay(this.startDate) : dateToDay(new Date(2020, 0, 22))
    },
    _formattedPeriod () {
      return `${dateBeautify(this._from)} - ${dateBeautify(this._to)}`
    }
  },
  async mounted () {
    this.loaded = false
    try {
        console.log('countries: ' + JSON.stringify(this.countries))
        var url = 'http://localhost:9000/covid19/stats?'
            + ( this.countries !== null && this.countries.lenght === 1 ? 'location=' + this.countries[0] + '&' : '&' ) 
            + ( this._from !== null ? 'from=' + this._from + '&' : '&' ) 
            + ( this._to !== null ? 'to=' + this._to + '' : '' ) 
        //console.log('url: ' + url)
        const stats = await fetch(url).then(response => response.json())
        //console.log('daily stats: ' + JSON.stringify(stats))
        this.locations = Object.keys(stats)
        //var firstLocation = locations[0]
        //console.log('locations: ' + JSON.stringify(this.locations))
        this.dates = stats[this.locations[0]].map(entry => entry.date)
        //console.log('dates: ' + JSON.stringify(this.dates))
        this.countries.forEach(country => {
          console.log('processing country: ' + country)
          this.confirmed = stats[country].map(entry => entry.value.confirmedCases)
          this.dailyConfirmed = this.confirmed.map( (item, index, array) => index == 0 ? item : item - array[index - 1])
          this.deaths = stats[country].map(entry => entry.value.deaths)
          this.dailyDeaths = this.deaths.map( (item, index, array) => index == 0 ? item : item - array[index - 1])
          //this.recovered = stats[this.locations[0]].map(entry => entry.value.recoveries)
          //this.chartData = new Object()
          this.chartData[country] = {
            labels: this.dates,
            datasets: [
              {
                label: "confirmed",
                backgroundColor: '#f7bf05',
                borderColor: '#f7bf05',
                borderWidth: 1,
                data: this.confirmed
              },
              {
                label: "deaths",
                backgroundColor: '#fc0000',
                borderColor: '#fc0000',
                borderWidth: 1,
                data: this.deaths
              }
            ]
          }
          //this.dailyChartData = new Object()
          this.dailyChartData[country] = {
            labels: this.dates,
            datasets: [
              {
                label: "confirmed",
                backgroundColor: '#f7bf05',
                borderColor: '#f7bf05',
                borderWidth: 1,
                data: this.dailyConfirmed
              },
              {
                label: "deaths",
                backgroundColor: '#fc0000',
                borderColor: '#fc0000',
                borderWidth: 1,
                data: this.dailyDeaths
              }
            ]
          }
        })
        console.log('chart data: ' + JSON.stringify(this.dailyChartData))
        this.loaded = true
    } catch (e) {
      console.error(e)
    }
  }
}
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