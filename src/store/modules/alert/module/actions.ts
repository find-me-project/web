import { getNearbyAlerts } from '@/API/Alert';
import type { RootState } from '@/store';
import type { ActionContext, ActionTree } from 'vuex';
import type {
  AlertStateType, AlertType, AlertTypeEnum, LocationCoordinatesType
} from './state';

const actions: ActionTree<AlertStateType, RootState> = {
  getNearbyAlerts: async function (
    {commit, getters}: ActionContext<AlertStateType, RootState>,
  ): Promise<void> {
    const { filterAlertType, location } = getters;

    if (!location) {
      return;
    }

    const { data } = await getNearbyAlerts(
      location.longitude as number,
      location.latitude as number,
      filterAlertType as string | undefined
    );

    if (data.list) {
      commit('setList', data.list);
      commit('setSelectedItem', undefined);
    }
  },
  setSelectedItem: function (
    {commit, getters}: ActionContext<AlertStateType, RootState>,
    payload: { value?: AlertType, }
  ): void {
    const isSameItem = getters.selectedItem?._id === payload.value?._id;

    commit('setSelectedItem', isSameItem ? undefined : payload.value);
  },
  setFilterAlertType: async function (
    {commit, dispatch}: ActionContext<AlertStateType, RootState>,
    payload: { value?: AlertTypeEnum, }
  ): Promise<void> {
    commit('setFilterAlertType', payload.value);
    await dispatch('getNearbyAlerts');
  },
  setLocation: async function (
    {commit, dispatch}: ActionContext<AlertStateType, RootState>,
    value: LocationCoordinatesType
  ): Promise<void> {
    commit('setLocation', value);
    await dispatch('getNearbyAlerts');
  },
};

export default actions;
