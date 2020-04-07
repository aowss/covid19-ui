<template>
  <div class="data-table">
    <b-table bordered small striped hover :items="items" :fields="fields">
      <template v-slot:thead-top="tableData">
        <b-tr>
          <b-th colspan="1"><span class="sr-only">Country</span></b-th>
          <b-th colspan="6">Confirmed Cases</b-th>
          <b-th colspan="6">Deaths</b-th>
        </b-tr>
      </template>
      <template v-slot:cell()="data">
        <span v-bind:style="style(data)">{{ data.value }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
import { BTable } from "bootstrap-vue";
import { details } from "@/utils/tableMapper";
import { dateBeautify } from "@/utils/dateFormatter";
import moment from "moment";

export default {
  name: "DataTable",
  components: { BTable },
  props: {
    stats: {
      type: Object,
      default: null
    }
  },
  methods: {
    style: data => {
      if (data.field.key.endsWith(".value")) {
        var [type, date] = data.field.key.split(".");
        const currentValue = data.item[type][date].value;
        const previousDate = moment(date).subtract(1, "days").format("YYYY-MM-DD");
        const previousValue = data.item[type][previousDate].value;
        return currentValue > previousValue ? "color:red" : "color:green";
      } else {
        return "color:black";
      }
    }
  },
  computed: {
    items() {
      return details(this.stats);
    },
    fields() {
      const fields = [
        {
          key: "location",
          label: "Country",
          sortable: true,
          stickyColumn: true
        },
        {
          key: "confirmed.total",
          label: "Total",
          sortable: true,
          variant: "warning",
          stickyColumn: true
        }
      ];
      const dates = Object.keys(this.items[0].confirmed).filter(
        property => property != "total"
      );
      dates.forEach((date, index) => {
        if (index <= 4) {
          fields.push({
            key: "confirmed." + date + ".value",
            label: dateBeautify(date),
            sortable: false
          });
        }
      });
      fields.push({
        key: "deaths.total",
        label: "Total",
        sortable: true,
        variant: "danger",
        stickyColumn: true
      });
      dates.forEach((date, index) => {
        if (index <= 4) {
          fields.push({
            key: "deaths." + date + ".value",
            label: dateBeautify(date),
            sortable: false
          });
        }
      });
      return fields;
    },
    tableData() {
      return {
        items: this.items,
        fileds: this.fields
      };
    }
  }
};
</script>
