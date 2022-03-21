<template>
  <v-speed-dial
    v-model='fab'
    absolute
    bottom
    right
    direction='top'
    transition='scale'
    style='z-index: 9999'
  >
    <template #activator>
      <v-btn
        v-model='fab'
        color='primary'
        dark
        fab
      >
        <v-icon v-if='fab'>
          mdi-close
        </v-icon>
        <v-icon v-else>
          mdi-plus
        </v-icon>
      </v-btn>
    </template>

    <v-tooltip left>
      <template #activator='{ on }'>
        <v-btn
          fab
          dark
          small
          color='red'
          v-on='on'
        >
          <v-icon>mdi-account</v-icon>
        </v-btn>
      </template>
      {{ $t('PERSON') }}
    </v-tooltip>

    <v-tooltip left>
      <template #activator='{ on }'>
        <v-btn
          fab
          dark
          small
          color='indigo'
          v-on='on'
        >
          <v-icon>mdi-dog</v-icon>
        </v-btn>
      </template>
      {{ $t('PET') }}
    </v-tooltip>
  </v-speed-dial>
</template>

<script>
  export default {
    name: 'AlertFAB',
    data: function () {
      return {
        fab: false,
      };
    },
  };
</script>
