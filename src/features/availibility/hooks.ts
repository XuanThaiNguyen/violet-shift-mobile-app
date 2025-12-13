import { AvailabilityTypeEnum, IAvailibility } from '@models/Availibility';
import { availibilityService } from '@services/availibility';
import { QueryArrayResponse } from '@services/type';
import { useQuery } from '@tanstack/react-query';
import useAuthStore from '@zustand/authStore';

export const useGetMyAvailibilities = ({
  from,
  to,
  type,
}: {
  from: Date | string | number;
  to: Date | string | number;
  type?: AvailabilityTypeEnum;
}) => {
  const { currentUser } = useAuthStore();

  const query = useQuery<QueryArrayResponse<IAvailibility>>({
    queryKey: ['myAvailibilities', currentUser?._id, from, to],
    queryFn: () =>
      availibilityService.getAvailibilities({
        staff: currentUser?._id || '',
        from,
        to,
        type,
      }),
    enabled: !!currentUser?._id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    retry: false,
  });

  return query;
};
