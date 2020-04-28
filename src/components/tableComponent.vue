<template>
  <div class="d-flex justify-content-center flex-column align-items-center">
    <div>
      Filter by: <input v-model="filter"
                        type="search"
                        id="filterInput"
                        class="form-control mt-3 mb-3"
                        placeholder="Type to Search"/>
    </div>
    <b-table
      :per-page="perPage"
      :current-page="currentPage"
      :items="data"
      :fields="fields"
      :filter="filter"
      :filterIncludedFields="fields"
      @filtered="onFiltered"
      sticky-header
      responsive
      striped
      hover small
      style="max-height: 70vh"
    >
      <template v-slot:cell(timezones)="row">
        <span
          :key="`row.item.timezones${timezoneId}`"
          v-for="(timezone, timezoneId) in row.item.timezones">
          {{timezone}}
          <template v-if="timezoneId !== row.item.timezones.length-1">
            ,<br>
          </template>
        </span>
      </template>
      <template v-slot:cell(currencies)="row">
        <ul>
          <li
            :key="`row.item.timezones${currencyId}`"
            v-for="(currency, currencyId) in row.item.currencies">
            {{currency.name}} ({{currency.symbol}})
          </li>
        </ul>
      </template>

    </b-table>
    <b-pagination
      v-if="data.length > perPage"
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import { BTable, BPagination } from 'bootstrap-vue';

export default {
  name: 'tableComponent',
  data() {
    return {
      currentPage: 1,
      totalRows: 1,
      filter: '',
    };
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    fields: Array,
    perPage: {
      type: Number,
      default: 10,
    },
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },
  created() {
    this.totalRows = this.data.length;
  },
  components: {
    BTable,
    BPagination,
  },
};
</script>
<style>
  th {
    min-width: 200px;
  }
</style>
