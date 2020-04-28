<template>
  <div class="d-flex justify-content-center flex-column align-items-center">
    <input v-model="filter"
           type="search"
           id="filterInput"
           class="mb-3"
           placeholder="Type to Search"/>
    <b-table
      :per-page="perPage"
      :current-page="currentPage"
      :items="data"
      :fields="fields"
      :filter="filter"
      :filterIncludedFields="filterOn"
      @filtered="onFiltered"
      sticky-header
      responsive
      striped
      hover small
    >

    </b-table>
    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
    <b-pagination
      v-if="data.length > perPage"
      v-model="currentPage"
      :total-rows="data.length"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>
  </div>
</template>

<script>
import { BTable, BPagination, BModal } from 'bootstrap-vue';

export default {
  name: 'tableComponent',
  data() {
    return {
      currentPage: 1,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      filter: '',
      filterOn: [],
    };
  },
  props: {
    fieldSlots: {
      type: Array,
    },
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
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit('bv::show::modal', this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = '';
      this.infoModal.content = '';
    },
  },
  mounted() {
    this.totalRows = this.items.length;
  },
  components: {
    BTable,
    BPagination,
    BModal,
  },
};
</script>
