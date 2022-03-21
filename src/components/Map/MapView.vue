<template>
  <l-map
    style='height: 100%'
    :zoom='zoom'
    :center='center'
  >
    <l-tile-layer :url='url' :attribution='attribution' />
    <l-marker :lat-lng='markerLatLng' :icon='icon' />
  </l-map>
</template>

<script>
  import { icon } from 'leaflet';
  import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';

  export default {
    name: 'MapView',
    components: {
      LMap: LMap,
      LTileLayer: LTileLayer,
      LMarker: LMarker,
    },
    data: function () {
      return {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>',
        zoom: 14,
        center: [-25.428958, -49.269665],
        markerLatLng: [-25.428958, -49.269665],
        icon: icon({
          iconUrl: 'https://this-person-does-not-exist.com/img/avatar-9ec76b1040212bbe19541499955664e2.jpg',
          iconSize: [48, 48],
          iconAnchor: [16, 16],
        }),
      };
    },
  };
</script>
