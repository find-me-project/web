import type { MutationTree } from 'vuex';
import type { AccountType, AuthStateType } from './state';

const mutations: MutationTree<AuthStateType> = {
  setAuthentication: function (state: AuthStateType, value: boolean): void {
    state.isAuthenticated = value;
  },
  setToken: function (state: AuthStateType, value?: string): void {
    state.token = value;
  },
  setAccount: function (state: AuthStateType, value?: AccountType): void {
    state.account = value;
  }
};

export default mutations;
