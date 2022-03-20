import { signIn, signOut } from '@/API/Auth';
import type { RootState } from '@/store';
import type { ActionContext, ActionTree } from 'vuex';
import type { AuthStateType, PersonType } from './state';

const actions: ActionTree<AuthStateType, RootState> = {
  handlerAuthentication: function ({commit}: ActionContext<AuthStateType, RootState>, payload: Readonly<{ value: boolean, }>): void {
    commit('setAuthentication', payload.value);

    if (!payload.value) {
      commit('setToken', undefined);
      commit('setAccount', undefined);
    }
  },
  signIn: async function (
    {commit, dispatch}: ActionContext<AuthStateType, RootState>,
    payload: Readonly<{
      accessData: string,
      password: string,
      isNickname: boolean,
    }>
  ): Promise<void> {
    const {
      accessData,
      password,
      isNickname,
    } = payload;

    const { data } = await signIn(accessData, password, isNickname);

    if (data.account && data.token) {
      commit('setToken', data.token);
      commit('setAccount', data.account);

      await dispatch('handlerAuthentication', { value: true });
    }
  },
  signOut: async function ({dispatch}: ActionContext<AuthStateType, RootState>): Promise<void> {
    await signOut();

    await dispatch('handlerAuthentication', { value: false });
  },
  updatePerson: function ({commit}: ActionContext<AuthStateType, RootState>, payload: PersonType): void {
    commit('updatePerson', payload);
  }
};

export default actions;
