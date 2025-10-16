enum ApiKeys {
  //auth
  LOGIN = 'auth/login',
  LOGOUT = 'auth/logout',
  FORGOT_PASSWORD = 'auth/forgot-password',

  //schedules
  GET_MY_SHIFT_SCHEDULES = 'staff-schedules/staff',
  GET_MY_DETAIL_SHIFT = 'shifts',
  GET_STAFF_SCHEDULES_BY_DETAIL_SHIFT = 'shifts/:shiftId/staff-schedules',
  GET_CLIENT_SCHEDULES_BY_DETAIL_SHIFT = 'shifts/:shiftId/client-schedules',
}

export default ApiKeys;
