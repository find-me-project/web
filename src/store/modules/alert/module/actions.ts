import { getNearbyAlerts } from '@/API/Alert';
import type { RootState } from '@/store';
import type { ActionContext, ActionTree } from 'vuex';
import type { AlertStateType } from './state';

const actions: ActionTree<AlertStateType, RootState> = {
  getNearbyAlerts: async function (
    {commit}: ActionContext<AlertStateType, RootState>,
    payload: Readonly<{
      longitude: number,
      latitude: number,
    }>
  ): Promise<void> {
    const { data } = await getNearbyAlerts(payload.longitude, payload.latitude);

    if (data.list) {
      commit('setList', data.list);
    }
  }
};

export default actions;
