import { Line, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Line,
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
      legend: {
        position: "top",
      },
      elements: {
        point: {
          pointStyle: "circle",
          pointRadius: 0
        }
      },
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: "month"
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
          left: 100,
          right: 100,
          top: 100,
          bottom: 100
        }
      }
    };
    this.renderChart(this.chartData, options);
  }
};
