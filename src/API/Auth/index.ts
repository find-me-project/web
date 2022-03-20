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
