<template>
  <v-card
    flat
    height='100%'
    min-height='700'
    color='grey lighten-4'
    @click='selectImage'
  >
    <v-container fluid fill-height>
      <v-row
        no-gutters
        align='center'
        justify='center'
        class='text-uppercase grey--text'
      >
        {{ $t('SELECT_IMAGE') }}
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  export default {
    name: 'ImageUpload',
    data: function () {
      return {
      };
    },
    methods: {
      selectImage: function () {
        // TODO
      },
    },
  };
</script>
