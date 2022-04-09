<template>
  <v-container fluid fill-height class='pa-0'>
    <dashboard-details @item-selected='itemSelected' />
    <map-view :list='list' @update-center='getData' @marker-click='itemSelected' />
    <alert />
  </v-container>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'DashboardPage',
    components: {
      MapView: () => import('@/components/Map/MapView.vue'),
      Alert: () => import('@/components/Alert/Alert.vue'),
      DashboardDetails: () => import('./DashboardDetails.vue'),
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
        'setLocation',
        'setSelectedItem',
      ]),
      getData: async function (data) {
        if (data) {
          await this.setLocation({
            longitude: data.lng, latitude: data.lat,
          });
        }
      },
      itemSelected: function (item) {
        this.setSelectedItem({ value: item });
      },
    },
  };
</script>
