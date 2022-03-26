import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import alert from './modules/alert';
import type { AlertStateType } from './modules/alert/module/state';
import auth from './modules/auth';
import type { AuthStateType } from './modules/auth/module/state';
import Loading from './modules/loading';
import type { LoadingStateType } from './modules/loading/module/state';

Vue.use(Vuex);

export interface RootState {
  loading: LoadingStateType,
  auth: AuthStateType,
  alert: AlertStateType,
}

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.sessionStorage,
  reducer: (state: RootState): any => ({ auth: state.auth }),
});

const store = new Vuex.Store<RootState>({
  modules: {
    loading: Loading,
    auth: auth,
    alert: alert,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
