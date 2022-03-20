import { signIn } from '@/API/Auth';
import type { RootState } from '@/store';
import type { ActionContext, ActionTree } from 'vuex';
import type { AuthStateType } from './state';

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
};

export default actions;
