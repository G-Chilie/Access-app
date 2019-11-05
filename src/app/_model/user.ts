export class User {
  requestID: string;
  userid: string;
  RequestingUserID: string;
  Channel: string;
}

export class Logins {
  StaffDetails: string;
}


export class LoginResponse {
  StaffDetails: StaffDetails;
  ResponseCode: number;
  ResponseDescription: string;
}

export class StaffDetails {
  UserID: number;
  UserName: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  FullName: string;
  Email: string;
  PhoneNumber: number;
  EmployeeID: number;
  Married: string;
  JobRole: string;
  DateOfBirth: string;
  HireDate: string;
  DateOfBirth_NoYear: string;
  JobTitle: string;
  Department: string;
  Group: string;
  Division: string;
  Sex: string;
  BranchLocation: string;
  Grade: number;
  BranchCode: number;
  TeamCode: number;
  YearsOfBankingExperience: number;
  Picture: string;
}

export class UserEoneDetails {
  UserID: number;
  UserName: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  FullName: string;
  Email: string;
  PhoneNumber: number;
  EmployeeID: number;
  Married: string;
  JobRole: string;
  DateOfBirth: string;
  HireDate: string;
  DateOfBirth_NoYear: string;
  JobTitle: string;
  Department: string;
  Group: string;
  Division: string;
  Sex: string;
  BranchLocation: string;
  Grade: number;
  BranchCode: number;
  TeamCode: number;
  YearsOfBankingExperience: number;
  Picture: string;
}

