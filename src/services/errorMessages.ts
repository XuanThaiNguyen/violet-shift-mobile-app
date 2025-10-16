import {
  AUTH_ERROR_CODE,
  LOGIN_ERROR_CODE,
  ME_ERROR_CODE,
  STAFF_ERROR_CODE,
} from './ApiStatus';

export const ErrorMessages: Record<number, string> = {
  // 🔹 Login Errors
  [LOGIN_ERROR_CODE.INVALID_REQUEST]:
    'Invalid request. User not found or invalid credentials.',
  [LOGIN_ERROR_CODE.USER_NOT_FOUND]: 'User not found.',
  [LOGIN_ERROR_CODE.INVALID_CURRENT_PASSWORD]:
    'The current password is incorrect.',
  [LOGIN_ERROR_CODE.EMAIL_CAN_BE_SENT]: 'Email can be sent.',
  [LOGIN_ERROR_CODE.INTERNAL_SERVER_ERROR]:
    'Something went wrong. Please try again later.',

  // 🔹 Me Errors
  [ME_ERROR_CODE.USER_NOT_FOUND]: 'User not found.',
  [ME_ERROR_CODE.INVALID_USER_UPDATE_PAYLOAD]: 'Invalid update payload.',
  [ME_ERROR_CODE.INTERNAL_SERVER_ERROR]: 'Internal server error.',

  // 🔹 Staff Errors
  [STAFF_ERROR_CODE.INVALID_REQUEST]: 'Invalid staff request.',
  [STAFF_ERROR_CODE.USER_JOINED_ALREADY]: 'User already joined.',
  [STAFF_ERROR_CODE.INVITATION_NOT_CREATED]: 'Invitation could not be created.',
  [STAFF_ERROR_CODE.INVALID_INVITATION_TOKEN]: 'Invalid invitation token.',
  [STAFF_ERROR_CODE.INVITATION_EXPIRED]: 'This invitation has expired.',
  [STAFF_ERROR_CODE.INTERNAL_SERVER_ERROR]: 'Staff internal server error.',

  // 🔹 Auth Errors
  [AUTH_ERROR_CODE.UNAUTHORIZED]: 'You are not authorized.',
  [AUTH_ERROR_CODE.UNAUTHENTICATED]: 'You need to log in again.',
};
