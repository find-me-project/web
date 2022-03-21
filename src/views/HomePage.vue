<template>
  <v-container fluid fill-height class='pa-0'>
    <map-view />
    <alert />
  </v-container>
</template>

<script>
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
