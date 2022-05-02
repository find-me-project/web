<template>
  <v-card flat>
    <v-container
      fluid
      fill-height
    >
      <v-row class='mt-15' justify='center'>
        <v-col
          cols='12'
          sm='12'
          md='6'
        >
          <v-stepper v-model='step' flat>
            <v-stepper-header style='box-shadow: none'>
              <v-stepper-step step='1' :complete='step > 1' editable>
                {{ $t('INFO') }}
              </v-stepper-step>

              <v-stepper-step step='2'>
                {{ $t('IMAGE') }}
              </v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-stepper-content step='1'>
                <v-row no-gutters justify='center'>
                  <v-card flat width='100%'>
                    <v-card-text class='pb-0'>
                      <v-form ref='form' v-model='formIsValid'>
                        <v-text-field
                          v-model='alert.name'
                          :rules='[rules.required]'
                          outlined
                          hide-details
                          dense
                          :label='$t("NAME")'
                          :disabled='hasId'
                        />
                        <date-picker
                          v-model='alert.birthDate'
                          :rules='[rules.required]'
                          :label='$t("BIRTH_DATE")'
                          :disabled='hasId'
                        />

                        <v-row no-gutters justify='space-between'>
                          <v-col cols='12' sm='12' md='5'>
                            <date-picker
                              v-model='alert.dateDisappearance'
                              :rules='[rules.required]'
                              :label='$t("DATE_DISAPPEARANCE")'
                              :disabled='hasId'
                            />
                          </v-col>
                          <v-col cols='12' sm='12' md='5'>
                            <time-picker
                              v-model='alert.timeDisappearance'
                              :rules='[rules.required]'
                              :label='$t("TIME_DISAPPEARANCE")'
                              :disabled='hasId'
                            />
                          </v-col>
                        </v-row>

                        <v-checkbox
                          v-model='alert.isPcd'
                          hide-details
                          :label='$t("PCD_LABEL")'
                          :disabled='hasId'
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
                          :disabled='hasId'
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
                      <map-view
                        :marker='marker'
                        style='width: 100%; height: 300px'
                        @click='setMarker'
                      />
                    </v-card-text>

                    <v-card-text class='pb-0' @click='saveAlert'>
                      <v-btn
                        block
                        depressed
                        color='primary'
                      >
                        {{ $t('NEXT_STEP') }}
                      </v-btn>
                    </v-card-text>
                  </v-card>
                </v-row>
              </v-stepper-content>

              <v-stepper-content step='2'>
                <image-upload @save='imageUploaded' />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
  import { AlertTypeEnum } from '@/store/modules/alert/module/state';
  import { createAlert } from '@/API/Alert';
  import { createImage } from '@/API/AlertImage';

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
        step: 1,
        formIsValid: true,
        rules: {
          required: (value) => !!value || this.$t('REQUIRED'),
        },
        alertId: undefined,
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
    computed: {
      hasId: function () {
        return !!this.alertId;
      },
    },
    methods: {
      setMarker: function (event) {
        if (this.hasId) {
          return;
        }
        this.marker = [event.latlng.lat, event.latlng.lng];
      },
      saveAlert: async function () {
        if (!this.hasId) {
          this.formIsValid = this.$refs.form.validate();
          if (!this.formIsValid) {
            return;
          }

          const { data } = await createAlert({
            type: AlertTypeEnum.person,
            name: this.alert.name,
            birthDate: this.alert.birthDate,
            disappearDate: `${this.alert.dateDisappearance} ${this.alert.timeDisappearance}`,
            isPcd: this.alert.isPcd,
            additionalInfo: this.alert.additionalInfo,
            longitude: this.marker[1],
            latitude: this.marker[0],
          });

          this.alertId = data.alert._id;
        }

        this.step = 2;
      },
      imageUploaded: async function (file) {
        await createImage(this.alertId, file);
      },
    },
  };
</script>
