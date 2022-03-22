<template>
  <div>
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
            @click='openAlertPerson'
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
            @click='openAlertPet'
          >
            <v-icon>mdi-dog</v-icon>
          </v-btn>
        </template>
        {{ $t('PET') }}
      </v-tooltip>
    </v-speed-dial>

    <v-dialog
      v-model='alertDialogIsVisible'
      persistent
      fullscreen
      style='z-index: 9999'
    >
      <v-app-bar
        absolute
        elevation='0'
      >
        <v-tooltip right>
          <template #activator='{ on }'>
            <v-btn
              icon
              color='primary'
              v-on='on'
              @click.native='closeDialog'
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
          <span>{{ $t('CLOSE') }}</span>
        </v-tooltip>

        <v-app-bar-title>
          {{ $t(alertPersonDialogIsVisible ? 'ALERT_PERSON_TITLE' : 'ALERT_PET_TITLE' ) }}
        </v-app-bar-title>
      </v-app-bar>

      <alert-person v-if='alertPersonDialogIsVisible' @close='closeDialog' />
      <alert-pet v-else-if='alertPetDialogIsVisible' @close='closeDialog' />
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'AlertFAB',
    components: {
      AlertPerson: () => import('./AlertPerson.vue'),
      AlertPet: () => import('./AlertPet.vue'),
    },
    data: function () {
      return {
        fab: false,
        alertDialogIsVisible: false,
        alertPersonDialogIsVisible: false,
        alertPetDialogIsVisible: false,
      };
    },
    methods: {
      closeDialog: function () {
        this.alertDialogIsVisible = false;
        this.alertPersonDialogIsVisible = false;
        this.alertPetDialogIsVisible = false;
      },
      openAlertPerson: function () {
        this.alertDialogIsVisible = true;
        this.alertPersonDialogIsVisible = true;
      },
      openAlertPet: function () {
        this.alertDialogIsVisible = true;
        this.alertPetDialogIsVisible = true;
      },
    },
  };
</script>
