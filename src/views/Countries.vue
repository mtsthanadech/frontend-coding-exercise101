<template>
  <div class='about'>
    <div class="container-fluid">
      <table-component
        :perPage="10"
        :data="allCountries"
        :fields="countryFields"
      ></table-component>
    </div>

  </div>
</template>

<script>
import tableComponent from '@/components/tableComponent.vue';
// eslint-disable-next-line no-unused-vars
import api from '@/services/api';

export default {
  name: 'About',
  components: {
    tableComponent,
  },
  data() {
    return {
      allCountries: [],
      countryFields: [],
    };
  },
  methods: {
    async fetchData() {
      await api.getCountries()
        .then((response) => {
          this.allCountries = response.data;
          this.manageFields();
        }).catch((err) => {
          console.log(err);
        });
    },
    manageFields() {
      const fields = ['numericCode', 'name', 'capital', 'region', 'subregion', 'timezones', 'nativeName', 'currencies', 'population', 'flag'];
      this.countryFields = fields;
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>
