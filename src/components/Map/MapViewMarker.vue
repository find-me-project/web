<template>
  <l-marker
    :lat-lng='item.location.coordinates'
    @click='selectMarker'
  >
    <l-icon class-name='map-icon-custom-class'>
      <v-avatar>
        <v-img
          :src='url'
        >
          <template #placeholder>
            <v-icon large :color='isSelected ? "primary" : itemColor'>
              mdi-map-marker
            </v-icon>
          </template>
        </v-img>
      </v-avatar>
    </l-icon>
  </l-marker>
</template>

<script>
  import { AlertTypeEnum } from '@/store/modules/alert/module/state';
  import { mapGetters } from 'vuex';

  import {
    LMarker, LIcon,
  } from 'vue2-leaflet';
  import { AlertImageDimension, getImage } from '@/API/AlertImage';

  export default {
    name: 'MapViewMarker',
    components: {
      LMarker: LMarker,
      LIcon: LIcon,
    },
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
      selectMarker: function () {
        this.$emit('click');
      },
      getItemImage: async function () {
        const { data } = await getImage(this.item._id, AlertImageDimension.small);

        this.url = data.url;
      },
    },
  };
</script>
