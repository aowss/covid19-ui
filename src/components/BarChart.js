import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartData: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: ""
    }
  },
  mounted() {
    var options = {
      title: {
        display: true,
        text: this.title
      },
      scales: {
        xAxes: [
          {
            type: 'time',
            time: {
              unit: 'month'
            }
          }
        ],
        yAxes: [
          {
            display: true
          }
        ]
      },
      layout: {
        padding: {
          left: 50,
          right: 50,
          top: 50,
          bottom: 50
        }
      }
    };
    this.renderChart(this.chartData, options);
  }
};
