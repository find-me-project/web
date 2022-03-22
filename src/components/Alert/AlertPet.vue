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
                <v-form>
                  <v-text-field
                    outlined
                    hide-details
                    dense
                    :label='$t("NAME")'
                  />
                  <date-picker
                    v-model='pet.birthDate'
                    :label='$t("BIRTH_DATE")'
                  />

                  <v-row no-gutters justify='space-between'>
                    <v-col cols='12' sm='12' md='5'>
                      <date-picker
                        v-model='pet.dateDisappearance'
                        :label='$t("DATE_DISAPPEARANCE")'
                      />
                    </v-col>
                    <v-col cols='12' sm='12' md='5'>
                      <time-picker
                        v-model='pet.timeDisappearance'
                        :label='$t("TIME_DISAPPEARANCE")'
                      />
                    </v-col>
                  </v-row>

                  <v-textarea
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
                <map-view style='width: 100%; height: 300px' />
              </v-card-text>

              <v-card-text class='pb-0'>
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
  export default {
    name: 'AlertPet',
    components: {
      ImageUpload: () => import('@/components/ImageUpload/ImageUpload.vue'),
      MapView: () => import('@/components/Map/MapView.vue'),
      DatePicker: () => import('@/components/Core/Pickers/DatePicker/DatePicker.vue'),
      TimePicker: () => import('@/components/Core/Pickers/TimePicker/TimePicker.vue'),
    },
    data: function () {
      return {
        pet: {
          birthDate: undefined,
          dateDisappearance: undefined,
          timeDisappearance: undefined,
        },
      };
    },
  };
</script>
