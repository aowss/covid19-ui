import { Bar, mixins } from "vue-chartjs";
import { previousDay, nextDay } from "@/utils/dateFormatter";
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
  computed: {
    paddedData() {
      var dates = this.chartData.labels;
      var from = this.chartData.labels[0];
      var to = this.chartData.labels[dates.length - 1];
      dates.unshift(previousDay(from));
      dates.push(nextDay(to));
      this.chartData.datasets.forEach(entry => {
        entry.data.unshift(0);
        entry.data.push(0);
      });
      return this.chartData;
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
          left: 50,
          right: 50,
          top: 50,
          bottom: 50
        }
      }
    };
    this.renderChart(this.paddedData, options);
  }
};
