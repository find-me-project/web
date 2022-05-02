<template>
  <div>
    <v-file-input
      v-show='false'
      ref='inputFile'
      v-model='file'
      prepend-icon
      hide-input
      accept='image/png, image/jpeg'
    />

    <v-card
      v-if='!file'
      flat
      height='400'
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

    <cropper
      v-else
      ref='cropper'
      class='cropper'
      :src='fileUrl'
      :min-height='500'
      :min-width='500'
      :stencil-size='{
        width: 500,
        height: 500
      }'
      :stencil-props='{
        handlers: {},
        movable: false,
        resizable: false,
        aspectRatio: 1,
      }'
      :canvas='{
        maxHeight: 500,
        minWidth: 500,
      }'
      image-restriction='stencil'
    />

    <v-btn
      v-if='file'
      block
      outlined
      depressed
      tile
      color='error'
      @click='changeImage'
    >
      {{ $t('CHANGE_IMAGE') }}
    </v-btn>

    <v-btn
      block
      depressed
      color='primary'
      class='mt-5'
      @click='uploadImage'
    >
      {{ $t('SAVE') }}
    </v-btn>
  </div>
</template>

<script>
  import { Cropper } from 'vue-advanced-cropper';
  import 'vue-advanced-cropper/dist/style.css';

  export default {
    name: 'ImageUpload',
    components: {
      Cropper: Cropper,
    },
    data: function () {
      return {
        file: undefined,
      };
    },
    computed: {
      fileUrl: function () {
        if (this.file) {
          return URL.createObjectURL(this.file);
        }

        return undefined;
      },
    },
    methods: {
      selectImage: function () {
        this.$refs.inputFile.$refs.input.click();
      },
      changeImage: function () {
        this.file = undefined;
      },
      uploadImage: function () {
        const { canvas } = this.$refs.cropper.getResult();
        canvas.toBlob((blob) => {
          const file = new File([blob], 'image', { type: this.file.type });

          this.save(file);
        }, 'image/jpeg');
      },
      save: function (file) {
        this.$emit('save', file);
      },
    },
  };
</script>

<style lang="scss" scoped>
.cropper {
  height: 600px;
  width: 600px;
  background: #DDD;
}
</style>
