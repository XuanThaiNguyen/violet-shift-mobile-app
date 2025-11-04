import { IClient } from '@models/Client';
import { IUser } from '@models/User';

export const getFullName = (user: IUser | IClient | null) => {
  if (!!user?.preferredName) return user.preferredName;
  return [user?.firstName, user?.middleName, user?.lastName]
    .filter(Boolean)
    .join(' ');
};

export const capitalizeFirst = (str: string) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};
