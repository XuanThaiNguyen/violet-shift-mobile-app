import http from '@utils/http';
import ApiKeys from './api';
import { AvailabilityTypeEnum, CreateAvailability } from '@models/Availibility';

export const addAvailibity = async ({
  params,
}: {
  params: CreateAvailability;
}) => {
  const respose = await http.post(ApiKeys.CREATE_AVAILIBILITY, params);
  return respose.data;
};

export const getAvailibilities = async (params: {
  from: Date | string | number;
  to: Date | string | number;
  staff: string;
  type?: AvailabilityTypeEnum;
}) => {
  const respose = await http.get(
    `${ApiKeys.GET_AVAILIBILITIES}/${params.staff}`,
    {
      params,
    },
  );
  return respose.data;
};

export const removeLeave = async (id: string) => {
  const respose = await http.delete(`${ApiKeys.DELETE_AVAILIBILITY}/${id}`);
  return respose.data;
};

export const availibilityService = {
  addAvailibity,
  getAvailibilities,
  removeLeave,
};
