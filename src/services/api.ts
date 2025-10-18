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
  GET_TASKS_BY_SHIFT_ID = 'shifts/:shiftId/tasks',
  UPDATE_TASK_BY_SHIFT_ID = 'shifts/:shiftId/tasks/:taskId',
  POST_CLOCK_IN_SHIFT = 'shifts/:shiftId/staff-schedules/:scheduleId/clock-in',
  POST_CLOCK_OUT_SHIFT = 'shifts/:shiftId/staff-schedules/:scheduleId/clock-out',
}

export default ApiKeys;
