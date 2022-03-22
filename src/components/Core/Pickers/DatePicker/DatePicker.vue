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
        v-model='selectedDate'
        readonly
        dense
        outlined
        hide-details
        class='mt-3'
        v-bind='{...attrs, ...$attrs}'
        v-on='on'
      />
    </template>
    <v-date-picker
      v-model='selectedDate'
      :active-picker.sync='activePicker'
      :max='maxDate'
      min='1950-01-01'
      @change='setDate'
    />
  </v-menu>
</template>

<script>
  export default {
    name: 'DatePicker',
    props: {
      value: {
        type: Date,
        default: undefined,
      },
    },
    data: function () {
      return {
        menu: false,
        activePicker: null,
        maxDate: (
          new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)
        ).toISOString().substr(0, 10),
        selectedDate: undefined,
      };
    },
    watch: {
      menu: function () {
        setTimeout(() => {
          this.activePicker = 'YEAR';
        });
      },
      value: function () {
        this.$emit('input', this.value);
      },
    },
    mounted: function () {
      this.selectedDate = this.value;
    },
    methods: {
      setDate: function (date) {
        this.$refs.menu.save(date);
      },
    },
  };
</script>
