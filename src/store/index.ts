import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import auth from './modules/auth';
import type { AuthStateType } from './modules/auth/module/state';
import Loading from './modules/loading';
import type {LoadingStateType} from './modules/Loading/module/state';

Vue.use(Vuex);

export interface RootState {
  loading: LoadingStateType,
  auth: AuthStateType,
}

const vuexLocal = new VuexPersistence<RootState>({
  storage: window.sessionStorage,
  reducer: (state: RootState): any => ({ auth: state.auth }),
});

const store = new Vuex.Store<RootState>({
  modules: {
    loading: Loading,
    auth: auth,
  },
  plugins: [vuexLocal.plugin],
});

export default store;
