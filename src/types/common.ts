export interface FetchApiResponse {
  success: boolean;
  count: number;
  result: any;
}

export interface BaseApiResponse {
  success: boolean;
  msg: any;
}

export interface Token {
  username: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}
