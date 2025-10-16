export enum EmploymentTypeEnum {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
  CONTRACT = 'contract',
  CASUAL = 'casual',
  OTHER = 'other',
}

export interface IUser {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  password: string;
  phoneNumber: string;
  description: string;
  preferredName: string;
  address: string;
  companyName: string;
  birthdate: Date;
  employmentType: EmploymentTypeEnum;
  _id: string;
  gender: string;
}

export interface IAuth {
  user: IUser;
  token: string;
}
