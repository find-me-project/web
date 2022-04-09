<template>
  <l-marker
    :lat-lng='item.location.coordinates'
    @click='selectMarker'
  >
    <l-icon class-name='map-icon-custom-class'>
      <v-icon
        large
        :color='isSelected ? "primary" : itemColor'
      >
        mdi-map-marker
      </v-icon>
    </l-icon>
  </l-marker>
</template>

<script>
  import { AlertTypeEnum } from '@/store/modules/alert/module/state';
  import { mapGetters } from 'vuex';

  import {
    LMarker, LIcon,
  } from 'vue2-leaflet';

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
      selectMarker: function () {
        this.$emit('click');
      },
    },
  };
</script>
