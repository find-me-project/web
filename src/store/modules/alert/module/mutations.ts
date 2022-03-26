import type { MutationTree } from 'vuex';
import type { AlertStateType, AlertType } from './state';

const mutations: MutationTree<AlertStateType> = {
  setList: function (state: AlertStateType, value?: AlertType[]): void {
    state.list = value;
  },
};

export default mutations;
