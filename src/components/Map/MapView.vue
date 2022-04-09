<template>
  <l-map
    ref='map'
    style='height: 100%'
    :zoom='zoom'
    :max-zoom='maxZoom'
    :min-zoom='minZoom'
    :center='center'
    @click='onClick'
    @ready='mapIsReady'
    @update:center='updateMapCenter'
  >
    <l-tile-layer :url='url' :attribution='attribution' />

    <l-marker
      v-if='marker'
      :lat-lng='marker'
    >
      <l-icon class-name='map-icon-custom-class'>
        <v-icon large :color='markerColor'>
          mdi-map-marker
        </v-icon>
      </l-icon>
    </l-marker>

    <!-- <l-marker
      :lat-lng='markerLatLng'
    >
      <l-icon
        :icon-anchor='icon.iconAnchor'
        class-name='map-icon-image-class'
      >
        <img alt='test' src='https://this-person-does-not-exist.com/img/avatar-d6d15e37d832c85b6b456818c5acabf4.jpg'>
      </l-icon>
    </l-marker> -->

    <div v-if='list'>
      <map-view-marker
        v-for='item in list'
        :key='item._id'
        :item='item'
        @click='selectMarker(item)'
      />
    </div>
  </l-map>
</template>

<script>
  import { Icon } from 'leaflet';
  import {
    LMap, LTileLayer, LMarker, LIcon,
  } from 'vue2-leaflet';
  import { debounce } from 'lodash';

  export default {
    name: 'MapView',
    components: {
      LMap: LMap,
      LTileLayer: LTileLayer,
      LMarker: LMarker,
      LIcon: LIcon,
      MapViewMarker: () => import('./MapViewMarker.vue'),
    },
    props: {
      markerColor: {
        type: String,
        default: 'red',
      },
      marker: {
        type: Array,
        default: undefined,
      },
      center: {
        type: Array,
        default: () => [-25.428958, -49.269665],
      },
      list: {
        type: Array,
        default: undefined,
      },
    },
    data: function () {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
        zoom: 14,
        maxZoom: 18,
        minZoom: 13,
        markerLatLng: [-25.428958, -49.269665],
        // icon: {
        //   iconUrl: 'https://this-person-does-not-exist.com/img/avatar-d6d15e37d832c85b6b456818c5acabf4.jpg',
        //   iconSize: [48, 48],
        //   iconAnchor: [16, 16],
        // },
      };
    },
    mounted: function () {
      delete Icon.Default.prototype._getIconUrl;
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      },
      updateMapCenter: debounce(function (data) {
        this.$emit('update-center', data);
      }, 700),
      mapIsReady: function (data) {
        this.updateMapCenter({
          lng: data.options.center[1],
          lat: data.options.center[0],
        });
      },
      selectMarker: function (item) {
        this.$emit('marker-click', item);
      },
    },
  };
</script>

<style lang="scss">
  .map-icon-custom-class {
    margin-top: -33px !important;
    margin-left: -17px !important;
  }
</style>
