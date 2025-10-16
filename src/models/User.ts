export interface IUser {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  phoneNumber: String;
  description: String;
  preferredName: String;
  companyName: String;
  _id: string;
}

export interface IAuth {
  user: IUser;
  token: String;
}
