<template>
  <v-container fluid>
    <v-row no-gutters align='center' justify='center'>
      <v-col
        cols='12'
        xs='12'
        sm='12'
        md='12'
        lg='9'
        xl='9'
      >
        <v-row no-gutters>
          <profile-info />
          <profile-config-person />
          <profile-config-password />
          <profile-config-activate />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'ProfilePage',
    components: {
      ProfileInfo: () => import('./ProfileInfo.vue'),
      ProfileConfigPerson: () => import('./ProfileConfigPerson.vue'),
      ProfileConfigPassword: () => import('./ProfileConfigPassword.vue'),
      ProfileConfigActivate: () => import('./ProfileConfigActivate.vue'),
    },
  };
</script>
