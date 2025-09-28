export interface User {
  user: {
    firstName: String;
    lastName: String;
    email: String;
    password: String;
    phoneNumber: String;
    description: String;
    fullName: String;
    companyName: String;
  };
  token: String;
}
