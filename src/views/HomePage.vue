<template>
  <dashboard />
</template>

<script>
  export default {
    name: 'HomePage',
    components: {
      Dashboard: () => import('@/views/Dashboard/Dashboard.vue'),
    },
  };
</script>
