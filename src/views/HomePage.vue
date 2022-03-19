<template>
  <v-container fluid class='pa-0 mt-5'>
    <v-row no-gutters align='center' justify='center'>
      <v-col
        cols='12'
        xs='12'
        sm='12'
        md='10'
        lg='10'
        xl='10'
      >
        <v-btn color='primary'>
          PRIMARY
        </v-btn>
        <v-btn color='accent'>
          ACCENT
        </v-btn>
        <v-btn color='secondary'>
          SECONDARY
        </v-btn>
        <v-text-field outlined label='bla' />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'HomePage',
    components: {
    },
    data: function () {
      return {
      };
    },
    mounted: function () {
      this.getData();
    },
    methods: {
      getData: async function () {
        // this.$store.dispatch('loading/toggleLoading', { value: true });
        // this.$store.dispatch('loading/toggleLoading', { value: false });
      },
    },
  };
</script>
