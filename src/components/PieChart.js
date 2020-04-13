import { Doughnut, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Doughnut,
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
        position: "left"
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