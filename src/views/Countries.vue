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
import axios from 'axios';

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
    fetchData() {
      axios.get('https://restcountries.eu/rest/v2/all')
        .then((response) => {
          this.allCountries = response.data;
          this.manageFields();
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
