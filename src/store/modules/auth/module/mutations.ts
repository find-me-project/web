import type { MutationTree } from 'vuex';
import type { AccountType, AuthStateType, PersonType } from './state';

const mutations: MutationTree<AuthStateType> = {
  setAuthentication: function (state: AuthStateType, value: boolean): void {
    state.isAuthenticated = value;
  },
  setToken: function (state: AuthStateType, value?: string): void {
    state.token = value;
  },
  setAccount: function (state: AuthStateType, value?: AccountType): void {
    state.account = value;
  },
  updatePerson: function (state: AuthStateType, value: PersonType): void {
    if (state.account?.person) {
      state.account.person = value;
    }
  }
};

export default mutations;
