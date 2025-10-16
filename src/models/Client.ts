export type ClientStatus = 'active' | 'inactive' | 'prospect';

export interface IClient {
  salutation: string;
  firstName: string;
  lastName: string;
  middleName: string;
  preferredName: string;
  gender: string;
  email: string;
  birthdate: Date;
  address: string;
  apartmentNumber: string;
  mobileNumber: string;
  phoneNumber: string;
  religion: string;
  maritalStatus: string;
  nationality: string;
  languages: string[];
  status: ClientStatus;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
