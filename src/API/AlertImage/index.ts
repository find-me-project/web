import type { AxiosPromise } from 'axios';
import axios from 'axios';

export enum AlertImageDimension {
  large = '500x500',
  medium = '250x250',
  small = '100x100',
}

export enum AlertResolution {
  lowResolution = 'lowResolution',
  normalResolution = 'normalResolution',
  highResolution = 'highResolution',
}

export async function createImage (alertId: string, file: File): Promise<AxiosPromise> {
  const formData = new FormData();
  formData.append('file', file);

  return axios({
    url: `alert-image/${alertId}`,
    method: 'POST',
    withCredentials: true,
    data: formData,
  });
}

export async function getImage (alertId: string, dimension?: AlertImageDimension, resolution?: AlertResolution): Promise<AxiosPromise> {
  return axios({
    url: `alert-image/${alertId}/${dimension ?? AlertImageDimension.large}/${resolution ?? AlertResolution.normalResolution}`,
    method: 'GET',
  });
}
