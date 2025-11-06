enum ApiKeys {
  //auth
  LOGIN = 'auth/login',
  LOGOUT = 'auth/logout',
  FORGOT_PASSWORD = 'auth/forgot-password',

  //schedules
  GET_MY_SHIFT_SCHEDULES = 'staff-schedules/staff',
  GET_MY_DETAIL_SHIFT = 'shifts',
  GET_STAFF_SCHEDULES_BY_DETAIL_SHIFT = 'shifts/:shiftId/staff-schedules',
  GET_A_STAFF_SCHEDULE_BY_SCHEDULE_ID = 'staff-schedules/:scheduleId',
  GET_CLIENT_SCHEDULES_BY_DETAIL_SHIFT = 'shifts/:shiftId/client-schedules',
  GET_TASKS_BY_SHIFT_ID = 'shifts/:shiftId/tasks',
  UPDATE_TASK_BY_SHIFT_ID = 'shifts/:shiftId/tasks/:taskId/complete',
  POST_CLOCK_IN_SHIFT = 'shifts/:shiftId/staff-schedules/:scheduleId/clock-in',
  POST_CLOCK_OUT_SHIFT = 'shifts/:shiftId/staff-schedules/:scheduleId/clock-out',
  GET_SHIFT_PROGRESSES = 'shifts/:shiftId/progresses',
  GET_SHIFT_PROGRESS_BY_ID = 'shifts/:shiftId/progresses/:shiftProgressId',
  POST_SHIFT_PROGRESSES = 'shifts/:shiftId/progresses',
  UPDATE_SHIFT_PROGRESSES = 'shifts/:shiftId/progresses/:shiftProgressId',
  GET_SHIFT_PROGRESS_EVENTS = 'shifts/:shiftId/progress-events',
  POST_SIGNATURE = 'shifts/:shiftId/staff-schedules/:scheduleId/signature',
}

export default ApiKeys;
