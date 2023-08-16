export interface ApiResponse {
  success: boolean;
  count: number;
  result: any;
}

export interface Token {
  username: string;
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}
