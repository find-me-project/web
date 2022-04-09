import type { MutationTree } from 'vuex';
import type {
  AlertStateType, AlertType, AlertTypeEnum, LocationCoordinatesType
} from './state';

const mutations: MutationTree<AlertStateType> = {
  setList: function (state: AlertStateType, value?: AlertType[]): void {
    state.list = value;
  },
  setSelectedItem: function (state: AlertStateType, value?: AlertType): void {
    state.selectedItem = value;
  },
  setFilterAlertType: function (state: AlertStateType, value?: AlertTypeEnum) {
    state.filterAlertType = value;
  },
  setLocation: function (state: AlertStateType, value?: LocationCoordinatesType) {
    state.location = value;
  }
};

export default mutations;
