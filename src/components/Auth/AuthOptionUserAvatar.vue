<template>
  <div>
    <v-menu
      v-model='menu'
      :close-on-content-click='false'
      :nudge-width='200'
      offset-y
      style='z-index: 99999'
    >
      <template #activator='{ on, attrs }'>
        <v-btn
          icon
          color='primary'
          v-bind='attrs'
          class='mr-1'
          v-on='on'
        >
          <v-icon>
            mdi-account
          </v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list dense>
          <v-list-item>
            <v-list-item-avatar>
              <v-icon>
                mdi-account
              </v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                <v-tooltip bottom>
                  <template #activator='{ on }'>
                    <span v-on='on'>
                      {{ account.person.name }}
                    </span>
                  </template>
                  <span>{{ account.person.name }}</span>
                </v-tooltip>
              </v-list-item-title>
              <v-list-item-subtitle>{{ account.email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list dense class='pa-0'>
          <v-list-item @click='navigateTo(route.profile)'>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('PROFILE') }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-icon>
                mdi-account-outline
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item @click='signOut'>
            <v-list-item-content>
              <v-list-item-title class='red--text'>
                {{ $t('SIGN_OUT') }}
              </v-list-item-title>
            </v-list-item-content>
            <v-list-item-avatar>
              <v-icon color='error'>
                mdi-logout
              </v-icon>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { route } from '@/router';

  export default {
    name: 'AuthOptionUserAvatar',
    data: function () {
      return {
        menu: false,
        route: route,
      };
    },
    computed: {
      ...mapGetters('auth', [
        'account',
      ]),
    },
    methods: {
      signOut: async function () {
        await this.$store.dispatch('auth/signOut');

        if (this.$router.currentRoute.name !== this.route.home) {
          this.$router.push({ name: this.route.home });
        }
      },
      navigateTo: function (name) {
        if (this.$router.currentRoute.name !== name) {
          this.$router.push({ name: name });
        }
      },
    },
  };
</script>
