<template>
  <v-card flat>
    <v-container
      fluid
      fill-height
    >
      <v-row class='mt-15'>
        <v-col
          cols='12'
          sm='12'
          md='6'
        >
          <image-upload />
        </v-col>

        <v-col
          cols='12'
          sm='12'
          md='6'
        >
          <v-row no-gutters justify='center'>
            <v-card flat width='100%'>
              <v-card-title>
                {{ $t("INFO") }}
              </v-card-title>

              <v-card-text class='pb-0'>
                <v-form ref='form' v-model='formIsValid'>
                  <v-text-field
                    v-model='alert.name'
                    :rules='[rules.required]'
                    outlined
                    hide-details
                    dense
                    :label='$t("NAME")'
                  />
                  <date-picker
                    v-model='alert.birthDate'
                    :rules='[rules.required]'
                    :label='$t("BIRTH_DATE")'
                  />

                  <v-row no-gutters justify='space-between'>
                    <v-col cols='12' sm='12' md='5'>
                      <date-picker
                        v-model='alert.dateDisappearance'
                        :rules='[rules.required]'
                        :label='$t("DATE_DISAPPEARANCE")'
                      />
                    </v-col>
                    <v-col cols='12' sm='12' md='5'>
                      <time-picker
                        v-model='alert.timeDisappearance'
                        :rules='[rules.required]'
                        :label='$t("TIME_DISAPPEARANCE")'
                      />
                    </v-col>
                  </v-row>

                  <v-checkbox
                    v-model='alert.isPcd'
                    hide-details
                    :label='$t("PCD_LABEL")'
                  />
                  <v-textarea
                    v-model='alert.additionalInfo'
                    dense
                    outlined
                    no-resize
                    rows='3'
                    maxlength='300'
                    :counter='300'
                    class='mt-3'
                    :label='$t("ADDITIONAL_INFO_OPTIONAL")'
                  />
                </v-form>
              </v-card-text>

              <v-card-title class='pt-0'>
                {{ $t('LOCATION_DISAPPEARANCE') }}
              </v-card-title>

              <v-card-subtitle>
                {{ $t('SELECT_LOCATION') }}
              </v-card-subtitle>

              <v-card-text class='pb-0'>
                <map-view :marker='marker' style='width: 100%; height: 300px' @click='setMarker' />
              </v-card-text>

              <v-card-text class='pb-0' @click='saveAlert'>
                <v-btn
                  block
                  depressed
                  color='primary'
                >
                  {{ $t('SAVE') }}
                </v-btn>
              </v-card-text>
            </v-card>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { AlertTypeEnum } from '@/store/modules/alert/module/state';
  import { createAlert } from '@/API/Alert';

  export default {
    name: 'AlertPerson',
    components: {
      ImageUpload: () => import('@/components/ImageUpload/ImageUpload.vue'),
      MapView: () => import('@/components/Map/MapView.vue'),
      DatePicker: () => import('@/components/Core/Pickers/DatePicker/DatePicker.vue'),
      TimePicker: () => import('@/components/Core/Pickers/TimePicker/TimePicker.vue'),
    },
    data: function () {
      return {
        formIsValid: true,
        rules: {
          required: (value) => !!value || this.$t('REQUIRED'),
        },
        alert: {
          name: undefined,
          birthDate: undefined,
          dateDisappearance: undefined,
          timeDisappearance: undefined,
          isPcd: false,
          additionalInfo: undefined,
        },
        marker: undefined,
      };
    },
    methods: {
      setMarker: function (event) {
        this.marker = [event.latlng.lat, event.latlng.lng];
      },
      saveAlert: async function () {
        this.formIsValid = this.$refs.form.validate();
        if (!this.formIsValid) {
          return;
        }

        await createAlert({
          type: AlertTypeEnum.person,
          name: this.alert.name,
          birthDate: this.alert.birthDate,
          disappearDate: `${this.alert.dateDisappearance} ${this.alert.timeDisappearance}`,
          isPcd: this.alert.isPcd,
          additionalInfo: this.alert.additionalInfo,
          longitude: this.marker[1],
          latitude: this.marker[0],
        });

        this.$emit('close');
      },
    },
  };
</script>
