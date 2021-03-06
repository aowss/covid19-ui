<template>
  <div class="data-table">

    <b-col lg="6" class="my-1">
      <b-form-group label="Filter" label-cols-sm="1" label-align-sm="right" label-size="sm" label-for="filterInput" class="mb-0">
        <b-input-group size="sm">
          <b-form-input v-model="filter" type="search" id="filterInput" placeholder="Country Name"></b-form-input>
          <b-input-group-append>
            <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
    </b-col>

    <br />

    <table width="100%">
      <tr>
        <td><span style="background-color:white; color:black">Color Key</span></td>
        <td class="table-dark"><span style="color:white">no deaths / cases on that day</span></td>
        <td class="table-dark"><span style="color:skyblue">same as the previous day</span></td>
        <td class="table-dark"><span style="color:green">lower than the previous day</span></td>
        <td class="table-dark"><span style="color:orange">slightly higher than the previous day</span></td>
        <td class="table-dark"><span style="color:red">significantly higher than the previous day</span></td>
      </tr>
    </table>

    <br />

    <b-table dark bordered small striped hover
             :items="items" :fields="fields"
             :filter="filter" :filterIncludedFields="filterOn"
             :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="firstDirectioon" :no-sort-reset="blockSortReset">

      <template v-slot:thead-top="tableData">
        <b-tr>
          <b-th colspan="1"><span class="sr-only">Country</span></b-th>
          <b-th colspan="6">Confirmed Cases</b-th>
          <b-th colspan="6">Deaths</b-th>
        </b-tr>
      </template>

      <!-- adding the continent as a first column ( a.k.a virtual column ) -->
      <template v-slot:cell(continent)="data">
        <a :href="`#/continent/${targetContinent(data.item.location)}`">{{ targetContinent(data.item.location) }}</a>
      </template>

      <!-- location formatting : add a URL -->
      <template v-slot:cell(location)="data">
        <a :href="`#/country/${data.value}`">{{ data.value }}</a>
      </template>

      <!-- other columns formatting : add colors to daily values -->
      <template v-slot:cell()="data">
        <span v-bind:style="style(data)">{{ data.value }}</span>
      </template>

    </b-table>

  </div>
</template>

<script>
import { BTable } from "bootstrap-vue";
import { deltas } from "@/utils/tableMapper";
import { region } from "@/utils/countries";
import { dateBeautify, previousDay } from "@/utils/dateFormatter";

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
    firstDirectioon: "desc",
    filter: null,
    filterOn: ['location']
  }),
  methods: {
    targetContinent: country => region(country),
    style: data => {
      if (data.field.key.endsWith(".value")) {
        var [type, date] = data.field.key.split(".");
        const currentValue = data.item[type][date].value;
        const previousDate = previousDay(date);
        const previousValue = data.item[type][previousDate].value;
        if (currentValue === 0) return "color:white";
        if (currentValue === previousValue) return "color:skyblue";
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
      return deltas(this.stats);
    },
    fields() {
      const fields = [
        {
          key: "continent",
          label: "Continent",
          class: "text-left"
        },
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
