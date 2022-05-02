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
        <v-img
          :src='url'
        >
          <template #placeholder>
            <v-icon :color='itemColor'>
              mdi-account
            </v-icon>
          </template>
        </v-img>
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
  import { AlertImageDimension, getImage } from '@/API/AlertImage';

  export default {
    name: 'DashboardDetailsCard',
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    data: function () {
      return {
        url: undefined,
      };
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
    mounted: function () {
      this.getItemImage();
    },
    methods: {
      selectItem: function (item) {
        this.$emit('click', item);
      },
      getItemImage: async function () {
        const { data } = await getImage(this.item._id, AlertImageDimension.small);

        this.url = data.url;
      },
    },
  };
</script>
