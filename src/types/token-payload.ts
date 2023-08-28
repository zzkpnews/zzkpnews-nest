type AuthTokenPayload = {
  type: 'super' | 'creator';
};

export type CreatorAuthTokenPayload = {
  id: string;
} & AuthTokenPayload;

export type SuperAuthTokenPayload = {} & AuthTokenPayload;
