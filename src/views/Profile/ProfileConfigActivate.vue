<template>
  <v-card width='100%' class='mt-5'>
    <v-card-title>
      {{ $t('ACTIVATE_ACCOUNT') }}
    </v-card-title>

    <v-card-text>
      <v-form ref='form' v-model='formIsValid'>
        <h5 class='mt-3'>
          {{ $t('CODE') }}
        </h5>
        <v-otp-input
          v-model='code'
          :rules='[rules.required]'
          length='8'
          type='number'
          dense
          outlined
          hide-details
        />
      </v-form>
    </v-card-text>

    <v-card-text>
      <v-btn
        block
        depressed
        color='primary'
        @click='activateAccount'
      >
        {{ $t('ACTIVATE') }}
      </v-btn>

      <v-btn
        block
        depressed
        outlined
        color='primary'
        class='mt-3'
        @click='requestNewActivationCode'
      >
        {{ $t('REQUEST_ACTIVATION_CODE') }}
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<script>
  import { activateAccount, requestActivationCode } from '@/API/Auth';

  export default {
    name: 'ProfileConfigActivate',
    data: function () {
      return {
        rules: {
          required: (value) => !!value || this.$t('REQUIRED'),
        },
        formIsValid: true,
        code: undefined,
      };
    },
    methods: {
      requestNewActivationCode: async function () {
        await requestActivationCode();
      },
      activateAccount: async function () {
        this.formIsValid = this.$refs.form.validate();
        if (!this.formIsValid) {
          return;
        }

        await activateAccount(this.code);

        this.$emit('close');
      },
    },
  };
</script>
