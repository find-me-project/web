import type { AxiosPromise } from 'axios';
import axios from 'axios';

export async function signUp (name: string, nickname: string, email: string, password: string, birthDate: Date): Promise<AxiosPromise> {
  return axios({
    url: 'account',
    method: 'POST',
    data: {
      name: name,
      nickname: nickname,
      email: email,
      password: password,
      birthDate: birthDate
    }
  });
}

export async function signIn (data: string, password: string, isNickname?: boolean): Promise<AxiosPromise> {
  return axios({
    url: 'account/sign-in',
    method: 'POST',
    data: {
      accessData: data,
      password: password,
      isNickname: isNickname,
    }
  });
}

export async function signOut (): Promise<AxiosPromise> {
  return axios({
    url: 'account/sign-out',
    method: 'POST',
    withCredentials: true,
  });
}

export async function requestRecoverPassword (email: string): Promise<AxiosPromise> {
  return axios({
    url: 'account/recover-password',
    method: 'PATCH',
    data: {
      email: email,
    }
  });
}

export async function recoverPassword (email: string, code: string, password: string): Promise<AxiosPromise> {
  return axios({
    url: 'account/recover-password',
    method: 'POST',
    data: {
      email: email,
      code: code,
      password: password,
    }
  });
}

export async function updatePerson (name: string, birthDate: Date): Promise<AxiosPromise> {
  return axios({
    url: 'person',
    method: 'PUT',
    withCredentials: true,
    data: {
      name: name,
      birthDate: birthDate,
    }
  });
}

export async function updatePassword (currentPassword: string, newPassword: string): Promise<AxiosPromise> {
  return axios({
    url: 'account/password',
    method: 'PATCH',
    withCredentials: true,
    data: {
      currentPassword: currentPassword,
      newPassword: newPassword,
    }
  });
}

export async function requestActivationCode (): Promise<AxiosPromise> {
  return axios({
    url: 'account/activate',
    method: 'PATCH',
    withCredentials: true,
  });
}

export async function activateAccount (code: string): Promise<AxiosPromise> {
  return axios({
    url: 'account/activate',
    method: 'POST',
    withCredentials: true,
    data: {
      code: code,
    }
  });
}
