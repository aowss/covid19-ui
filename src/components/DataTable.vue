<template>
  <div class="data-table">
    <b-table dark bordered small striped hover :items="items" :fields="fields"
             :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="firstDirectioon" :no-sort-reset="blockSortReset">
      <template v-slot:thead-top="tableData">
        <b-tr>
          <b-th colspan="1"><span class="sr-only">Country</span></b-th>
          <b-th colspan="6">Confirmed Cases</b-th>
          <b-th colspan="6">Deaths</b-th>
        </b-tr>
      </template>
      <template v-slot:cell(location)="data">
        <a :href="`#/country/${data.value}`">{{ data.value }}</a>
      </template>
      <template v-slot:cell()="data">
        <span v-bind:style="style(data)">{{ data.value }}</span>
      </template>
      <template v-slot:table-caption>
        <ul>
          <li><font color="blue">no deaths / confirmed cases on that day</font></li>
          <li><font color="black">number  of deaths / confirmed cases is similar to the previous day</font></li>
          <li><font color="green">number  of deaths / confirmed cases is lower than the previous day</font></li>
          <li><font color="orange">number  of deaths / confirmed cases is slightly higher ( less than 10 % ) than the previous day</font></li>
          <li><font color="red">number  of deaths / confirmed cases is significantly higher ( more than 10 % ) than to the previous day</font></li>
        </ul>
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
  data: () => ({
    sortBy: 'confirmed.total',
    sortDesc: true,
    blockSortReset: true,
    firstDirectioon: "desc"
  }),
  methods: {
    style: data => {
      if (data.field.key.endsWith(".value")) {
        var [type, date] = data.field.key.split(".");
        const currentValue = data.item[type][date].value;
        const previousDate = moment(date).subtract(1, "days").format("YYYY-MM-DD");
        const previousValue = data.item[type][previousDate].value;
        if (currentValue === 0) return "color:blue";
        if (currentValue === previousValue) return "color:black";
        if (currentValue < previousValue) return "color:green";
        if (currentValue >= previousValue * 1.1) return "color:red";
        return "color:orange";
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
          stickyColumn: true,
          class: "text-left"
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
      for (let i = 4; i >= 0; i--) {
        let date = dates[i];
        fields.push({
          key: "confirmed." + date + ".value",
          label: dateBeautify(date),
          sortable: false
        });
      }
      fields.push({
        key: "deaths.total",
        label: "Total",
        sortable: true,
        variant: "danger",
        stickyColumn: true
      });
      for (let i = 4; i >= 0; i--) {
        let date = dates[i];
        fields.push({
          key: "deaths." + date + ".value",
          label: dateBeautify(date),
          sortable: false
        });
      }
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
