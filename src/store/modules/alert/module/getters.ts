import type { RootState } from '@/store';
import type { GetterTree } from 'vuex';
import type { AlertStateType } from './state';

const getters: GetterTree<AlertStateType, RootState> = {
  list: (state: Readonly<AlertStateType>) => state.list,
  selectedItem: (state: Readonly<AlertStateType>) => state.selectedItem,
  filterAlertType: (state: Readonly<AlertStateType>) => state.filterAlertType,
  location: (state: Readonly<AlertStateType>) => state.location,
};

export default getters;
