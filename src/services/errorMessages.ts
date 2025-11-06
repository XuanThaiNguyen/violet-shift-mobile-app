import {
  AUTH_ERROR_CODE,
  CLIENT_ERROR_CODE,
  FUNDING_ERROR_CODE,
  LOGIN_ERROR_CODE,
  ME_ERROR_CODE,
  PRICE_BOOK_ERROR_CODE,
  SHIFT_ERROR_CODE,
  STAFF_ERROR_CODE,
} from './ApiStatus';

export const ErrorMessages: Record<number, string> = {
  // 🔹 LOGIN ERRORS
  [LOGIN_ERROR_CODE.INVALID_REQUEST]:
    'Invalid request. User not found or invalid credentials.',
  [LOGIN_ERROR_CODE.USER_NOT_FOUND]: 'User not found.',
  [LOGIN_ERROR_CODE.INVALID_CURRENT_PASSWORD]:
    'The current password is incorrect.',
  [LOGIN_ERROR_CODE.EMAIL_CAN_BE_SENT]: 'Email can be sent.',
  [LOGIN_ERROR_CODE.TOO_MANY_REQUESTS]:
    'Too many requests. Please wait a moment and try again.',
  [LOGIN_ERROR_CODE.INTERNAL_SERVER_ERROR]:
    'Login failed due to a server error. Please try again later.',

  // 🔹 ME ERRORS
  [ME_ERROR_CODE.USER_NOT_FOUND]: 'User not found.',
  [ME_ERROR_CODE.INVALID_USER_UPDATE_PAYLOAD]:
    'Invalid user update information provided.',
  [ME_ERROR_CODE.INTERNAL_SERVER_ERROR]: 'Unable to load profile data.',

  // 🔹 STAFF ERRORS
  [STAFF_ERROR_CODE.INVALID_REQUEST]: 'Invalid staff request.',
  [STAFF_ERROR_CODE.USER_NOT_FOUND]: 'Staff user not found.',
  [STAFF_ERROR_CODE.USER_JOINED_ALREADY]: 'This user has already joined.',
  [STAFF_ERROR_CODE.INVITATION_NOT_CREATED]:
    'Failed to create invitation. Please try again.',
  [STAFF_ERROR_CODE.INVALID_INVITATION_TOKEN]: 'Invalid invitation token.',
  [STAFF_ERROR_CODE.INVITATION_EXPIRED]: 'This invitation link has expired.',
  [STAFF_ERROR_CODE.INTERNAL_SERVER_ERROR]:
    'Staff service encountered an error.',

  // 🔹 CLIENT ERRORS
  [CLIENT_ERROR_CODE.INVALID_REQUEST]: 'Invalid client request.',
  [CLIENT_ERROR_CODE.CLIENT_NOT_FOUND]: 'Client not found.',
  [CLIENT_ERROR_CODE.CLIENT_IS_EXISTING]: 'Client already exists.',

  // 🔹 SHIFT ERRORS
  [SHIFT_ERROR_CODE.INVALID_REQUEST]: 'Invalid shift request.',
  [SHIFT_ERROR_CODE.SHIFT_NOT_FOUND]: 'Shift not found.',
  [SHIFT_ERROR_CODE.SHIFT_HAPPENED]:
    'The shift has already occurred and cannot be modified.',
  [SHIFT_ERROR_CODE.STAFF_SCHEDULE_NOT_FOUND]:
    'Staff schedule not found for this shift.',
  [SHIFT_ERROR_CODE.TASK_NOT_FOUND]: 'Shift task not found.',
  [SHIFT_ERROR_CODE.SHIFT_NOT_STARTED]:
    'Cannot clock in yet. The shift has not started.',
  [SHIFT_ERROR_CODE.SHIFT_ENDED]: 'This shift has already ended.',
  [SHIFT_ERROR_CODE.STAFF_SIGNATURE_REQUIRED]:
    'Staff signature is required before clock out.',
  [SHIFT_ERROR_CODE.CLIENT_SIGNATURE_REQUIRED]:
    'Client signature is required before clock out.',
  [SHIFT_ERROR_CODE.STAFF_ALREADY_CLOCKED_IN]:
    'You have already clocked in for this shift.',
  [SHIFT_ERROR_CODE.STAFF_ALREADY_CLOCKED_OUT]:
    'You have already clocked out for this shift.',
  [SHIFT_ERROR_CODE.STAFF_NOT_CLOCKED_IN]:
    'You must clock in before clocking out.',
  [SHIFT_ERROR_CODE.INTERNAL_SERVER_ERROR]:
    'An unexpected error occurred in shift service.',

  // 🔹 PRICE BOOK ERRORS
  [PRICE_BOOK_ERROR_CODE.INVALID_REQUEST]: 'Invalid price book request.',
  [PRICE_BOOK_ERROR_CODE.PRICE_BOOK_NOT_FOUND]: 'Price book not found.',
  [PRICE_BOOK_ERROR_CODE.PRICE_BOOK_IS_EXISTING]:
    'A price book with this name already exists.',
  [PRICE_BOOK_ERROR_CODE.CANNOT_ARCHIVE_LAST_ACTIVE]:
    'Cannot archive the last active price book.',
  [PRICE_BOOK_ERROR_CODE.PRICE_BOOK_RULES_OVERLAP]:
    'Some price book rules overlap. Please review them.',
  [PRICE_BOOK_ERROR_CODE.INTERNAL_SERVER_ERROR]:
    'Price book operation failed due to server error.',

  // 🔹 FUNDING ERRORS
  [FUNDING_ERROR_CODE.INVALID_REQUEST]: 'Invalid funding request.',
  [FUNDING_ERROR_CODE.FUNDING_NOT_FOUND]: 'Funding not found.',
  [FUNDING_ERROR_CODE.FUNDING_IS_EXISTING]: 'Funding record already exists.',
  [FUNDING_ERROR_CODE.INTERNAL_SERVER_ERROR]:
    'Funding service encountered an internal error.',

  // 🔹 AUTH ERRORS
  [AUTH_ERROR_CODE.UNAUTHORIZED]:
    'You are not authorized to perform this action.',
  [AUTH_ERROR_CODE.UNAUTHENTICATED]:
    'Your session is expired. Please log in again.',
  [AUTH_ERROR_CODE.INTERNAL_SERVER_ERROR]:
    'Authentication service error. Please try again later.',
};
