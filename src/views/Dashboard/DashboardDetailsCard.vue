<template>
  <v-list-item
    :input-value='isSelected'
    @click='selectItem'
  >
    <v-list-item-avatar tile size='75'>
      <v-avatar
        v-if='item.type === alertType.person'
        :color='isSelected ? `${itemColor} lighten-4` : ""'
      >
        <v-icon :color='itemColor'>
          mdi-account
        </v-icon>
      </v-avatar>

      <v-avatar
        v-else
        :color='isSelected ? `${itemColor} lighten-4` : ""'
      >
        <v-icon :color='itemColor'>
          mdi-dog
        </v-icon>
      </v-avatar>
    </v-list-item-avatar>

    <v-list-item-content>
      <v-list-item-title>
        {{ item.data.name }}
      </v-list-item-title>

      <v-list-item-subtitle>
        {{ item.data.name }}
      </v-list-item-subtitle>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
  import { AlertTypeEnum } from '@/store/modules/alert/module/state';
  import { mapGetters } from 'vuex';

  export default {
    name: 'DashboardDetailsCard',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    computed: {
      ...mapGetters('alert', [
        'selectedItem',
      ]),
      alertType: function () {
        return AlertTypeEnum;
      },
      isSelected: function () {
        return this.selectedItem && this.selectedItem._id === this.item._id;
      },
      itemColor: function () {
        return this.item.type === this.alertType.person ? 'red' : 'indigo';
      },
    },
    methods: {
      selectItem: function (item) {
        this.$emit('click', item);
      },
    },
  };
</script>
