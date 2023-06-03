export const STATUS_CODE = {
  RequestOK: 20000,
  RequestPartialOK: 24000,

  UserUnauthorized: 34010,
  UserBlocked: 34030,
  UserPermissionDenied: 34031,
  UserAuthFailed: 34032,
  UserNotFound: 34040,
  UserAuthExpired: 34400,

  BadRequestParameter: 44000,
  ResourceBlocked: 44030,
  InvalidReferer: 44031,
  ResourceNotFound: 44040,

  ServerInternalError: 50000,
};
