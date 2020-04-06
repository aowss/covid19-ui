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
    </b-table>
  </div>
</template>

<script>
import { BTable } from "bootstrap-vue";
import { details } from "@/utils/tableMapper";
import { dateBeautify } from "@/utils/dateFormatter";

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
    items: this.items,
    fileds: this.fields
  }),
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
      dates.forEach(date => {
        fields.push({
          key: "confirmed." + date,
          label: dateBeautify(date),
          sortable: false,
          variant: "warning"
        });
      });
      fields.push({
        key: "deaths.total",
        label: "Total",
        sortable: true,
        variant: "danger",
        stickyColumn: true
      });
      dates.forEach(date => {
        fields.push({
          key: "deaths." + date,
          label: dateBeautify(date),
          sortable: false,
          variant: "danger"
        });
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
