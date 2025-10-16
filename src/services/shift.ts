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

export const shiftService = {
  getMyShiftSchedules,
  getDetailShift,
  getStaffSchedulesOfDetailShift,
  getClientSchedulesOfDetailShift,
};
