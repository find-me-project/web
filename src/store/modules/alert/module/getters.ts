import type { RootState } from '@/store';
import type { GetterTree } from 'vuex';
import type { AlertStateType } from './state';

const getters: GetterTree<AlertStateType, RootState> = {
  list: (state: Readonly<AlertStateType>) => state.list,
};

export default getters;
