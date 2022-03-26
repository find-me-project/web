import type { AxiosPromise } from 'axios';
import axios from 'axios';

export async function createAlert (alert: {
  type: string,
  name: string,
  birthDate: Date,
  disappearDate: Date,
  longitude: number,
  latitude: number,
  isPcd?: boolean,
  additionalInfo?: string,
}): Promise<AxiosPromise> {
  return axios({
    url: 'alert',
    method: 'POST',
    withCredentials: true,
    data: {
      type: alert.type,
      name: alert.name,
      birthDate: alert.birthDate,
      disappearDate: alert.disappearDate,
      isPcd: alert.isPcd,
      additionalInfo: alert.additionalInfo,
      longitude: alert.longitude,
      latitude: alert.latitude,
    }
  });
}

export async function getNearbyAlerts (longitude: number, latitude: number): Promise<AxiosPromise> {
  return axios({
    url: 'alerts',
    method: 'GET',
    params: {
      longitude: longitude,
      latitude: latitude,
    }
  });
}
