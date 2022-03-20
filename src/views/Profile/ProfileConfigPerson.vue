<template>
  <v-card width='100%' class='mt-5'>
    <v-card-title>
      {{$t('UPDATE_PERSON_INFO')}}
    </v-card-title>

    <v-card-text>
      <v-form ref='form' v-model='formIsValid'>
        <v-text-field
          v-model='person.name'
          :rules='[rules.required]'
          dense
          outlined
          hide-details
          :label='$t("NAME")'
        />

        <v-menu
          ref='menu'
          v-model='menu'
          :close-on-content-click='false'
          transition='scale-transition'
          offset-y
          min-width='auto'
        >
          <template v-slot:activator='{ on, attrs }'>
            <v-text-field
              v-model='person.birthDate'
              :rules='[rules.required]'
              :label='$t("BIRTH_DATE")'
              readonly
              dense
              outlined
              hide-details
              class='mt-3'
              v-bind='attrs'
              v-on='on'
            ></v-text-field>
          </template>
          <v-date-picker
            v-model='person.birthDate'
            :active-picker.sync='activePicker'
            :max='maxDate'
            min='1950-01-01'
            @change='setBirthDate'
          ></v-date-picker>
        </v-menu>
      </v-form>
    </v-card-text>

    <v-card-text>
      <v-btn
        block
        depressed
        color='primary'
        @click='updatePerson'
      >
        {{$t('SAVE')}}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  import { updatePerson } from '@/API/Auth';
  import { mapGetters } from 'vuex';

  export default {
    name: 'ProfileConfigPerson',
    data: function () {
      return {
        rules: {
          required: (value) => !!value || this.$t('REQUIRED'),
        },
        formIsValid: true,
        menu: false,
        activePicker: null,
        maxDate: (
          new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)
        ).toISOString().substr(0, 10),
        person: {
          name: undefined,
          birthDate: undefined,
        },
      };
    },
    watch: {
      menu: function () {
        setTimeout(() => {
          this.activePicker = 'YEAR';
        });
      },
    },
    computed: {
      ...mapGetters('auth', [
        'account',
      ]),
    },
    mounted: function () {
      this.person.name = this.account.person.name;
      this.person.birthDate = this.account.person.birthDate.substr(0, 10);
    },
    methods: {
      setBirthDate: function (date) {
        this.$refs.menu.save(date);
      },
      updatePerson: async function () {
        this.formIsValid = this.$refs.form.validate();
        if (!this.formIsValid) {
          return;
        }

        const { data } = await updatePerson(this.person.name, this.person.birthDate);

        this.$store.dispatch('updatePerson', data.person);

        this.$emit('close');
      },
    },
  };
</script>
