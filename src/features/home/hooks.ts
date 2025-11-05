import {
  IClientScheduleOfDetailShift,
  IDetailShift,
  IShiftProgress,
  IShiftProgressEvent,
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

  const query = useQuery<QueryArrayResponse<IStaffSchedule>>({
    queryKey: ['myShiftSchedules', currentUser?._id, from, to],
    queryFn: () =>
      shiftService.getMyShiftSchedules({
        userId: currentUser?._id || '',
        from,
        to,
      }),
    enabled: !!currentUser?._id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return query;
};

export const useGetDetailShift = ({ shiftId }: { shiftId: string }) => {
  const query = useQuery<QueryObjectResponse<IDetailShift>>({
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

  return query;
};

export const useGetStaffSchedulesOfDetailShift = ({
  shiftId,
}: {
  shiftId: string;
}) => {
  const query = useQuery<QueryObjectResponse<IStaffScheduleOfDetailShift>>({
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

  return query;
};

export const useGetClientSchedulesOfDetailShift = ({
  shiftId,
}: {
  shiftId: string;
}) => {
  const query = useQuery<QueryArrayResponse<IClientScheduleOfDetailShift>>({
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

  return query;
};

export const useGetTasksByShiftId = ({ shiftId }: { shiftId: string }) => {
  const query = useQuery<QueryArrayResponse<IShiftTask>>({
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

  return query;
};

export const useGetMyShiftProgresses = ({ shiftId }: { shiftId: string }) => {
  const query = useQuery<QueryArrayResponse<IShiftProgress>>({
    queryKey: ['myShiftProgresses', shiftId],
    queryFn: () =>
      shiftService.getShiftProgresses({
        shiftId,
      }),
    enabled: !!shiftId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return query;
};

export const useGetMyShiftProgressById = ({
  shiftId,
  shiftProgressId,
}: {
  shiftId: string;
  shiftProgressId: string;
}) => {
  const query = useQuery<QueryObjectResponse<IShiftProgress>>({
    queryKey: ['myShiftProgress', shiftId, shiftProgressId],
    queryFn: () =>
      shiftService.getShiftProgressById({
        shiftId,
        shiftProgressId,
      }),
    enabled: !!shiftId && !!shiftProgressId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return query;
};

export const useGetMyShiftProgressEvents = ({
  shiftId,
}: {
  shiftId: string;
}) => {
  const query = useQuery<QueryArrayResponse<IShiftProgressEvent>>({
    queryKey: ['myShiftProgressEvents', shiftId],
    queryFn: () =>
      shiftService.getShiftProgressEvents({
        shiftId,
      }),
    enabled: !!shiftId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return query;
};
