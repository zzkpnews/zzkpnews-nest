/**
 * API_STATUS_CODE defines a list of status codes used in the API.
 */
export const API_STATUS_CODE = {
  RequestOK: 20000, // The request was successful.

  UserUnauthorized: 34010, // The user is not authorized to access the requested resource.
  UserBlocked: 34030, // The user is blocked and cannot access the requested resource.
  UserPermissionDenied: 34031, // The user does not have permission to perform the requested operation.
  UserAuthFailed: 34032, // Authentication failed for the user.
  UserNotFound: 34040, // The requested user was not found.
  UserAuthExpired: 34400, // The user's authentication has expired.

  BadRequestParameter: 44000, // The request contains invalid or missing parameters.
  ResourceBlocked: 44030, // The requested resource is blocked and cannot be accessed.
  InvalidReferer: 44031, // The referer header in the request is invalid.
  ResourceNotFound: 44040, // The requested resource was not found.

  ServerInternalError: 50000, // An internal server error occurred.
};
