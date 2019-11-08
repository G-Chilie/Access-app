

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
  AdminUser: {
    BasisId: string;
    UserName: string;
    Branch: string;
    Email: string;
    UserID: string;
    TokenId: string;
    LastLoginDate: string;
    RoleId: string;
    Status: string;
    EoneLastLogin: string;
    AdminUserSecurityDetails: AdminUserSecurityDetail,
    Applications: Application[],
    LoginInfo: number;
    ResponseCode: string;
    ResponseDescription: string;
  };
}

export interface Application {
  ApplicationID: string;
  ApplicationName: string;
  ApplicationCode: string;
  ApplicationDescription: string;
  ApplicationUrl: string;
  ApplicationSsoUrl: string;
  Active: string;
}

export interface AdminUserSecurityDetail {
      ImageName: string;
      ImageData: string;
      ImageType: string;
      WelcomeMessage: string;
}

export class ResetPasswordStatus {
  ResponseCode: string;
  ResponseDescription: string;
}

export class KillMyIDStatus {
  ResponseCode: string;
  ResponseDescription: string;
}

