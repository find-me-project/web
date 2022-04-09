export enum AlertTypeEnum {
  person = 'Person',
  pet = 'Pet'
}

export enum LocationTypeEnum {
  point = 'Point'
}

export interface LocationType {
  type?: LocationTypeEnum,
  coordinates: number[],
}

export enum AlertStatusEnum {
  active = 'Active',
}

export interface AlertType {
  _id?: string,
  type: AlertTypeEnum,
  data: {
    name: string,
    birthDate: Date,
    disappearDate: Date,
    isPcd?: boolean,
  },
  additionalInfo?: string,
  location: LocationType,
  account: string,
  status?: AlertStatusEnum,
  createdAt?: Date,
  updatedAt?: Date,
}

export interface LocationCoordinatesType {
  longitude: number,
  latitude: number,
}

export interface AlertStateType {
  location?: LocationCoordinatesType,
  list?: AlertType[],
  selectedItem?: AlertType,
  filterAlertType?: AlertTypeEnum,
}

const state = (): AlertStateType => ({
  location: undefined,
  list: undefined,
  selectedItem: undefined,
  filterAlertType: undefined,
});

export default state;
