<template>
  <v-container fluid fill-height class='pa-0'>
    <map-view :list='list' />
    <alert />
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'HomePage',
    components: {
      MapView: () => import('@/components/Map/MapView.vue'),
      Alert: () => import('@/components/Alert/Alert.vue'),
    },
    data: function () {
      return {
      };
    },
    computed: {
      ...mapGetters('alert', [
        'list',
      ]),
    },
    mounted: function () {
      this.getData();
    },
    methods: {
      ...mapActions('alert', [
        'getNearbyAlerts',
      ]),
      getData: async function () {
        this.$store.dispatch('loading/toggleLoading', { value: true });
        await this.getNearbyAlerts({ longitude: -25.428958, latitude: -49.269665 });
        this.$store.dispatch('loading/toggleLoading', { value: false });
      },
    },
  };
</script>
