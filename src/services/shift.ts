import http from '@utils/http';
import ApiKeys from './api';

export const getMyShiftSchedules = async ({
  userId,
  from,
  to,
}: {
  userId: string;
  from: Date | string | number;
  to: Date | string | number;
}) => {
  const response = await http.get(
    `${ApiKeys.GET_MY_SHIFT_SCHEDULES}/${userId}`,
    {
      params: {
        from,
        to,
      },
    },
  );
  return response.data;
};

export const getDetailShift = async ({ shiftId }: { shiftId: string }) => {
  const response = await http.get(`${ApiKeys.GET_MY_DETAIL_SHIFT}/${shiftId}`);
  return response.data;
};

export const getStaffSchedulesOfDetailShift = async ({
  shiftId,
}: {
  shiftId: string;
}) => {
  const response = await http.get(
    ApiKeys.GET_STAFF_SCHEDULES_BY_DETAIL_SHIFT.replace(':shiftId', shiftId),
  );
  return response.data;
};

export const getClientSchedulesOfDetailShift = async ({
  shiftId,
}: {
  shiftId: string;
}) => {
  const response = await http.get(
    ApiKeys.GET_CLIENT_SCHEDULES_BY_DETAIL_SHIFT.replace(':shiftId', shiftId),
  );
  return response.data;
};

export const getTasksByShiftId = async ({ shiftId }: { shiftId: string }) => {
  const response = await http.get(
    ApiKeys.GET_TASKS_BY_SHIFT_ID.replace(':shiftId', shiftId),
  );
  return response.data;
};

export const updateTaskByShiftId = async ({
  shiftId,
  isCompleted,
  taskId,
}: {
  shiftId: string;
  isCompleted: boolean;
  taskId: string;
}) => {
  const response = await http.put(
    ApiKeys.UPDATE_TASK_BY_SHIFT_ID.replace(':shiftId', shiftId).replace(
      ':taskId',
      taskId,
    ),
    {
      isCompleted,
    },
  );
  return response.data;
};

export const postClockInShiftByShiftId = async ({
  shiftId,
  scheduleId,
}: {
  shiftId: string;
  scheduleId: string;
}) => {
  const response = await http.post(
    ApiKeys.POST_CLOCK_IN_SHIFT.replace(':shiftId', shiftId).replace(
      ':scheduleId',
      scheduleId,
    ),
  );
  return response.data;
};

export const postClockOutShiftByShiftId = async ({
  shiftId,
  scheduleId,
}: {
  shiftId: string;
  scheduleId: string;
}) => {
  const response = await http.post(
    ApiKeys.POST_CLOCK_OUT_SHIFT.replace(':shiftId', shiftId).replace(
      ':scheduleId',
      scheduleId,
    ),
  );
  return response.data;
};

export const shiftService = {
  getMyShiftSchedules,
  getDetailShift,
  getStaffSchedulesOfDetailShift,
  getClientSchedulesOfDetailShift,
  getTasksByShiftId,
  updateTaskByShiftId,
  postClockInShiftByShiftId,
  postClockOutShiftByShiftId,
};
