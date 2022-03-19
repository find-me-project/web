<template>
  <l-map style='height: 100%' :zoom='zoom' :center='center'>
    <l-tile-layer :url='url'></l-tile-layer>
  </l-map>
</template>

<script>
  // import L from 'leaflet';
  import { LMap, LTileLayer } from 'vue2-leaflet';

  export default {
    name: 'MapView',
    components: {
      LMap: LMap,
      LTileLayer: LTileLayer,
      // LMarker: LMarker,
    },
    data: function () {
      return {
        url: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
        zoom: 14,
        center: [-25.428958, -49.269665],
      };
    },
  };
</script>
