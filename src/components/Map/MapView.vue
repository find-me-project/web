<template>
  <l-map
    style='height: 100%'
    :zoom='zoom'
    :max-zoom='maxZoom'
    :min-zoom='minZoom'
    :center='center'
    @click='onClick'
  >
    <l-tile-layer :url='url' :attribution='attribution' />
    <l-marker v-if='marker' :lat-lng='marker' />
    <!-- <l-marker :lat-lng='markerLatLng' :icon='icon' /> -->
    <div v-if='list'>
      <l-marker v-for='item in list' :key='item._id' :lat-lng='item.location.coordinates' />
    </div>
  </l-map>
</template>

<script>
  /* eslint-disable global-require */

  import { Icon } from 'leaflet';
  import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

  // eslint-disable-next-line no-underscore-dangle
  delete Icon.Default.prototype._getIconUrl;
  Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });

  export default {
    name: 'MapView',
    components: {
      LMap: LMap,
      LTileLayer: LTileLayer,
      LMarker: LMarker,
    },
    props: {
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
        minZoom: 12,
        // markerLatLng: [-25.428958, -49.269665],
        // icon: icon({
        //   iconUrl: 'https://this-person-does-not-exist.com/img/avatar-9ec76b1040212bbe19541499955664e2.jpg',
        //   iconSize: [48, 48],
        //   iconAnchor: [16, 16],
        // }),
      };
    },
    methods: {
      onClick: function (event) {
        this.$emit('click', event);
      },
    },
  };
</script>
