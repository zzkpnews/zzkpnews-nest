export type UserLoginAuthAPIContent = {
  token: string;
  expiredAt: number;
};

export type UserRefreshTokenAPIContent = {
  token: string;
  expiredAt: number;
};
