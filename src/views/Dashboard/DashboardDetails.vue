<template>
  <v-navigation-drawer
    app
    clipped
    width='450'
  >
    <v-btn-toggle v-model='selectedItem' class='wd-100'>
      <v-btn
        depressed
        text
        color='red'
        class='wd-40 ma-5 b-none'
      >
        <v-icon color='red'>
          mdi-account
        </v-icon>
      </v-btn>

      <v-btn
        depressed
        text
        color='indigo'
        class='wd-40 ma-5 b-none'
      >
        <v-icon color='indigo'>
          mdi-dog
        </v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-list v-if='list'>
      <template v-for='item in list'>
        <dashboard-details-card
          :key='item._id'
          :item='item'
          @click='itemSelected(item)'
        />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  import { AlertTypeEnum } from '@/store/modules/alert/module/state';
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'DashboardDetails',
    components: {
      DashboardDetailsCard: () => import('./DashboardDetailsCard.vue'),
    },
    data: function () {
      return {
        selectedItem: undefined,
      };
    },
    computed: {
      ...mapGetters('alert', [
        'list',
      ]),
    },
    watch: {
      selectedItem: function () {
        const type = {
          0: AlertTypeEnum.person,
          1: AlertTypeEnum.pet,
        };

        this.setFilterAlertType({
          value: type[this.selectedItem],
        });
      },
    },
    methods: {
      ...mapActions('alert', [
        'setFilterAlertType',
      ]),
      itemSelected: function (item) {
        this.$emit('item-selected', item);
      },
    },
  };
</script>
