import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import type { AuthStateType } from './modules/auth/module/state';
import Loading from './modules/loading';
import type {LoadingStateType} from './modules/Loading/module/state';

Vue.use(Vuex);

export interface RootState {
  loading: LoadingStateType,
  auth: AuthStateType,
}

const store = new Vuex.Store<RootState>({
  modules: {
    loading: Loading,
    auth: auth,
  }
});

export default store;
