import axios, { AxiosResponse } from 'axios';

export interface userGeoDataI {
  ip: string;
  countryName: string;
  lat: number;
  lng: number;
}

export const fetchGeo = async (): Promise<AxiosResponse> => {
  const response = await axios.get<AxiosResponse>('https://geolocation-db.com/json/');
  return response.data;
};
