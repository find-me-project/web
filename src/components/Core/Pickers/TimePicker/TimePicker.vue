<template>
  <v-menu
    ref='menu'
    v-model='menu'
    :close-on-content-click='false'
    transition='scale-transition'
    offset-y
    min-width='auto'
  >
    <template #activator='{ on, attrs }'>
      <v-text-field
        v-model='selectedTime'
        readonly
        dense
        outlined
        hide-details
        class='mt-3'
        v-bind='{...attrs, ...$attrs}'
        v-on='on'
      />
    </template>
    <v-time-picker
      v-model='selectedTime'
      format='24hr'
      :active-picker.sync='activePicker'
      @click:minute='setTime'
    />
  </v-menu>
</template>

<script>
  export default {
    name: 'TimePicker',
    props: {
      value: {
        type: String,
        default: undefined,
      },
    },
    data: function () {
      return {
        menu: false,
        activePicker: null,
        selectedTime: undefined,
      };
    },
    watch: {
      value: function () {
        this.$emit('input', this.value);
      },
    },
    mounted: function () {
      this.selectedTime = this.value;
    },
    methods: {
      setTime: function (value) {
        this.$refs.menu.save(value);
      },
    },
  };
</script>
