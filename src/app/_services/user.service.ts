import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, retry, map } from 'rxjs/operators';
import { UtilityService } from '../utility.service';
import * as JsEncryptModule from 'jsencrypt';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffDetails } from '../_model/user';
import swal from 'sweetalert';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient, private util: UtilityService, private router: Router) { }

  extEncrypt(data) {
    // console.log('encrypting: ' + data);
    const encrypt = new JsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(environment.PUB_AM_ENC_KEY);
    const hash = encrypt.encrypt(data);
    return hash;
  }
  public setUserObject(response) {
    localStorage.setItem('StaffDetailsWithPic', JSON.stringify(response));
    // return user;
  }

  public get User() {
    const user = localStorage.getItem('StaffDetailsWithPic');
    const userObj = JSON.parse(user);
    const parsedUser = userObj.StaffDetails.FullName;
    // const loggedinuser = localStorage.getItem('FullName') ;
    return (parsedUser);
  }

  public setResetBasisStatus(response) {
    localStorage.setItem('ResetBasisPasswordStatus', JSON.stringify(response));
  }

  public setKillMyId(response) {
    localStorage.setItem('ResetBasisPasswordStatus', JSON.stringify(response));
  }

  public setApplicationsObject(response) {
    localStorage.setItem('EoneDetails', JSON.stringify(response));
    // return user;
  }

  public get UserLastLoginDate() {
    const user = localStorage.getItem('EoneDetails');
    const userObj = JSON.parse(user);
    const parsedLoginDate = userObj.EoneLastLogin;
    // const loggedinuser = localStorage.getItem('FullName') ;
    return (parsedLoginDate);
    // return user;
  }

  public get UserApplications() {
    const user = localStorage.getItem('EoneDetails');
    const userObj = JSON.parse(user);
    const parsedApplicationGroup = userObj.Applications;
    // const parsedApplications = parsedApplicationGroup.ApplicationName;
    console.log(parsedApplicationGroup);
    // const parsedApplicationUrl = parsedApplicationGroup.ApplicationSsoUrl;
    // console.log(parsedApplicationUrl);
    // // const loggedinuser = localStorage.getItem('FullName') ;
    // const myData = { parsedApplications, parsedApplicationUrl};
    // return myData;
    return parsedApplicationGroup;
  }

  // url = ".....";

  // getData(): Observable<any> {
  //        return this.http.get(this.url).map(res => res.json());
  // }
  public get userPicture() {
    const user = localStorage.getItem('StaffDetailsWithPic');
    const userObj = JSON.parse(user);
    const parsedPicture = userObj.StaffDetails.Picture;
    // const loggedinuser = localStorage.getItem('FullName') ;
    return (parsedPicture);
  }

  public get userBranch() {
    const user = localStorage.getItem('StaffDetailsWithPic');
    const userObj = JSON.parse(user);
    const parsedBranch = userObj.StaffDetails.BranchLocation;
    // const loggedinuser = localStorage.getItem('FullName') ;
    return (parsedBranch);
  }

  public getUserApps(userDetails) {
    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.APPS_API}`;
    // let body: any = localStorage.getItem('Form Details');
    {
      // const userData: User = this.userService.getUserDetails();
      // console.log(userData);
      const body: any = {};
      const data = {
        ...userDetails,
        // ...this.util.addAuthParams(body),
        // tslint:disable-next-line: quotemark
        // tokenId : "",
        // UserName : this.encryptData.encrypt(userData.userInfor.userName),
      };

      // userDetails.password = userDetails.password,
      //   // tslint:disable-next-line: quotemark
      //   userDetails.IPAddress = "";

      console.log('Encrypted User Body For Apps:' + JSON.stringify(data));
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      // this.login.loginForm.value;
      // body = this.util.addAuthParams(body);
      // body.customerId = this.extEncrypt(this.merchantId);
      // delete body.customerNumber;
      return this.http.post<any>(PATH, userDetails).pipe(
        retry(2),
        catchError(this.util.handleError),

        map(res => {
          console.log(res);
          if (res.ResponseCode === '00') {
            this.setApplicationsObject(res);
            return res;
          } else {
          }
        })
      );
    }
  }

  public getUserWithPic(userDetails) {
    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.USERPIC}`;
    const body: any = {};
    // const res: any = Login;
    const data = {
      ...userDetails
      // ...this.util.addAuthParams(body),
      // tslint:disable-next-line: quotemark
      // tokenId : "",
    };
    // this.util.generateRequestId;
    userDetails.requestID = '12345678';
    userDetails.username = userDetails.username;
    userDetails.RequestingUserID = userDetails.username;
    userDetails.Channel = environment.Channel;
    delete (userDetails.password);

    console.log('Encrypted User Details:' + JSON.stringify(userDetails));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // body = this.util.addAuthParams(body);
    // body.customerId = this.extEncrypt(this.merchantId);
    // delete body.customerNumber;
    return this.http.post<any>(PATH, userDetails).pipe(
      retry(2),
      catchError(this.util.handleError),
      // tslint:disable-next-line: no-shadowed-variable
      map(res => {
        console.log(res);
        if (res.ResponseCode === '00') {
          this.setUserObject(res);
          this.router.navigate(['/']);
          return res;
        } else {
          this.router.navigate(['login']);
          return null;
        }
      })
    );
  }

  public resetBasisPassword(userDetails) {
    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.RESETBASISPASS}`;
    {
      const body: any = {};
      const user = localStorage.getItem('StaffDetailsWithPic');
      const user2 = localStorage.getItem('EoneDetails');
      const userObj = JSON.parse(user);
      const userObj2 = JSON.parse(user2);
      userDetails.TellerID = userObj2.AdminUser.BasisId;
      userDetails.TellerName = userObj.StaffDetails.UserName;
      userDetails.BranchCode = userObj2.AdminUser.Branch;
      const data = {
        ...userDetails,

      };
      if (userDetails == null) {
        swal('Oops!', 'Please supply matching passwords!', 'failure');
      }
      console.log('User Body For ResetPass::' + JSON.stringify(data));
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return this.http.post<any>(PATH, userDetails).pipe(
        retry(2),
        catchError(this.util.handleError),

        map(res => {
          console.log(res);
          if (res.ResponseCode === '00') {
            this.setResetBasisStatus(res);
            swal('Good job!', 'You have successfully changed your Basis password!', 'success');
            return res;
          } else {
            swal('Oops!', 'An error has occured. Please try again!', 'failure');
            return null;
          }
        })
      );
    }
  }

  public killMyID(userDetails) {
    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.KILLMYID}`;
    {
      const body: any = {};
      userDetails.Channel = 'Access Manager';
      userDetails.AppId = '1';
      const data = {
        ...userDetails,

      };
      console.log(userDetails);
      if (userDetails == null) {
        swal('Oops!', 'Please supply a correct username!', 'error');
      }
      console.log('User Body For killMyId::' + JSON.stringify(data.userdetails));
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return this.http.post<any>(PATH, userDetails).pipe(
        retry(2),
        catchError(this.util.handleError),

        map(res => {
          console.log(res);
          if (res.ResponseCode === '00') {
            this.setKillMyId(res);
            swal('Good job!', 'You ID has successfully been removed on BASIS!', 'success');
            return res;
          } else {
            swal('Oops!', 'An error has occured. Please try again!', 'error');
            return null;
          }
        })
      );
    }
  }

  private UpdateUserSecDet(userDetails) {
    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.UPDATEUSERSEC_API}`;
    const body: any = {};
    const data = {
      ...userDetails,
      ...this.util.addAuthParams(body),
      // tslint:disable-next-line: quotemark
      // tokenId : "",
      // UserName : this.encryptData.(userData.userInfor.userName),
    };
    data.UserName = userDetails.username,
      data.password = userDetails.password,
      data.requestID = this.util.generateRequestId;
    data.Channel = environment.Channel;
    data.WelcomeMessage = '';
    data.IPAddress = '';
    data.ImageName = '',
      data.ImageType = 1,
      data.ImageData = '',
      data.AUToken = '';
    console.log('Encrypted Sec Details:' + JSON.stringify(data));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(PATH, data, { headers }).pipe(
      retry(2),
      catchError(this.util.handleError),
      map((res) => {
        console.log(res);
        if (res.responseCode === '00') {
          return res.formDetails;
        } else {
          return null;
        }
      })
    );
  }
}
