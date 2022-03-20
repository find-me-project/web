export interface PersonType {
  _id: string,
  name: string,
  birthDate: Date,
  createdAt: Date,
  updatedAt: Date,
}

export interface AccountType {
  _id: string,
  nickName: string,
  email: string,
  role: string,
  status: string,
  person: PersonType,
  createdAt: Date,
  updatedAt: Date,
}

export interface AuthStateType {
  isAuthenticated: boolean,
  account?: AccountType,
  token?: string,
}

const state = (): AuthStateType => ({
  isAuthenticated: false,
  account: undefined,
  token: undefined,
});

export default state;
