import {
  IClientScheduleOfDetailShift,
  IDetailShift,
  IShiftTask,
  IStaffSchedule,
  IStaffScheduleOfDetailShift,
} from '@models/Shift';
import { shiftService } from '@services/shift';
import { QueryArrayResponse, QueryObjectResponse } from '@services/type';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@zustand/authStore';

export const useGetMyShiftSchedules = ({
  from,
  to,
}: {
  from: Date | string | number;
  to: Date | string | number;
}) => {
  const { currentUser } = useAuthStore();

  const myShiftSchedules = useQuery<QueryArrayResponse<IStaffSchedule>>({
    queryKey: ['myShiftSchedules', currentUser?.user?._id, from, to],
    queryFn: () =>
      shiftService.getMyShiftSchedules({
        userId: currentUser?.user?._id || '',
        from,
        to,
      }),
    enabled: !!currentUser?.user?._id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return myShiftSchedules;
};

export const useGetDetailShift = ({ shiftId }: { shiftId: string }) => {
  const myDetailShift = useQuery<QueryObjectResponse<IDetailShift>>({
    queryKey: ['myShiftDetail', shiftId],
    queryFn: () =>
      shiftService.getDetailShift({
        shiftId,
      }),
    enabled: !!shiftId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return myDetailShift;
};

export const useGetStaffSchedulesOfDetailShift = ({
  shiftId,
}: {
  shiftId: string;
}) => {
  const myDetailShift = useQuery<
    QueryObjectResponse<IStaffScheduleOfDetailShift>
  >({
    queryKey: ['myStaffSchedulesOfDetailShift', shiftId],
    queryFn: () =>
      shiftService.getStaffSchedulesOfDetailShift({
        shiftId,
      }),
    enabled: !!shiftId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return myDetailShift;
};

export const useGetClientSchedulesOfDetailShift = ({
  shiftId,
}: {
  shiftId: string;
}) => {
  const myDetailShift = useQuery<
    QueryArrayResponse<IClientScheduleOfDetailShift>
  >({
    queryKey: ['myClientSchedulesOfDetailShift', shiftId],
    queryFn: () =>
      shiftService.getClientSchedulesOfDetailShift({
        shiftId,
      }),
    enabled: !!shiftId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return myDetailShift;
};

export const useGetTasksByShiftId = ({ shiftId }: { shiftId: string }) => {
  const myDetailShift = useQuery<QueryArrayResponse<IShiftTask>>({
    queryKey: ['myTasksByShiftId', shiftId],
    queryFn: () =>
      shiftService.getTasksByShiftId({
        shiftId,
      }),
    enabled: !!shiftId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return myDetailShift;
};
