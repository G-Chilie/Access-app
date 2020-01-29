import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { UtilityService } from '../utility.service';
import * as JsEncryptModule from 'jsencrypt';
import { Router, ActivatedRoute } from '@angular/router';
import { StaffDetails, EncryptionDetails, ValidateUserWithToken, BasisAccessStatus } from '../_model/user';
import swal from 'sweetalert';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  // Info$: Subject<string> = new BehaviorSubject<string>(null);
  // Error$: Subject<string> = new BehaviorSubject<string>(null);
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

  // public setApplicationsObject(response) {
  //   localStorage.setItem('EoneDetails', JSON.stringify(response));
  //   // return user;
  // }

  public setEncryptedData(response) {
    localStorage.setItem('Encrypted String: ', JSON.stringify(response));
    // return user;
  }

  public get UserLastLoginDate() {
    const user = localStorage.getItem('AdminUserDetails');
    if (user) {
      const userObj = JSON.parse(user);
      const parsedLoginDate = userObj.EoneLastLogin;
      return (parsedLoginDate);
    }
    return [];

  }

  public get UserApplications() {
    const user = localStorage.getItem('AdminUserDetails');
    if (user) {
      const userObj = JSON.parse(user);
      const parsedApplicationGroup = userObj.Applications;
      return parsedApplicationGroup;
    }
    return [];
  }

  public get ApplicationImage() {
    const user = localStorage.getItem('AdminUserDetails');
    if (user) {
      const userObj = JSON.parse(user);
      const appImage = userObj.Applications.ApplicationImage;
      return appImage;
    }
    return [];
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

  public encryptData(dataToEncrypt) {
    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.ENC_API}`;
    console.log('New Data To Encrypt:' + JSON.stringify(dataToEncrypt));
    const data = {
      Data: dataToEncrypt.Data,
      Key: localStorage.getItem('UserKey'),
      EncryptDecrypt: 1,
      AppId: 1,
      Channel: 'AM'
    };
    console.log(data);
    return this.http.post<any>(PATH, data)
      .pipe(
        tap(() => console.log('Encryption method has been triggered')),
        retry(3),
        catchError(this.util.handleError),
        map(res => {
          console.log(res);
          if (res.ResponseCode === '00') {
            this.setEncryptedData(res);
            return res;
          } else {
            console.log(res.ResponseDescription);
            return null;
          }
        })
      );
  }

  public getUserApps(reqData) {
    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.APPS_API}`;
    if (reqData) {
      // reqData = this.util.getEncryptedDetails();
      reqData.Channel = 'AM';
      reqData.RequestID = '1122334455';
      reqData.Key = localStorage.getItem('UserKey');
      reqData.AppId = 1;
      console.log('userDet For Apps: ' + JSON.stringify(reqData));
      return this.http.post<any>(PATH, reqData).pipe(
        retry(3),
        catchError(this.util.handleError),
        map(res => {
          if (res.ResponseCode === '00') {
            this.util.Info$.next(res.ResponseDescription);
            console.log(res.AdminUser.Applications);
            return res;
          } else {
            console.log('An error Occured: ' + res.ResponseDescription);
            swal('Oops', res.ResponseDescription + '. Please reload the page and try again', 'error');
            this.util.Error$.next(res.ResponseDescription);
            return null;
          }
        })
      );
    } else {
      return null;
    }
  }


  public getUserWithPic(userDetails) {
    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.USERPIC}`;
    const body: any = {};
    // const res: any = Login;
    const data = {
      ...userDetails

    };
    // this.util.generateRequestId;
    userDetails.requestID = '12345678';
    userDetails.username = userDetails.username;
    userDetails.RequestingUserID = userDetails.username;
    userDetails.Channel = environment.Channel;
    delete (userDetails.password);

    console.log('Encrypted User Details:' + JSON.stringify(userDetails));
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(PATH, userDetails).pipe(
      retry(2),
      catchError(this.util.handleError),
      // tslint:disable-next-line: no-shadowed-variable
      map(res => {
        if (res.ResponseCode === '00') {
          // this.router.navigate(['/']);
          return res;
        } else {
          // this.router.navigate(['login']);
          console.log('issue with staff details: ' + res.ResponseDescription);
          return null;
        }
      })
    );
  }

  public validateWithToken(token) {
    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.VAL_TOKEN}`;
    // const encryptedtoken = this.util.encrypt(token)
    // tslint:disable-next-line: no-shadowed-variable
    console.log('token to encrypt: ' + token);
    // tslint:disable-next-line: no-shadowed-variable

    this.util.encryptToken(token).subscribe(data => {
      data ? this.validate(data) : console.log('Token not encrypted');
    });

    // this.validate(data).subscribe((a: ValidateUserWithToken) => {
    //   a ? this.router.navigate(['/home']) : swal('Oops! ', 'An error occured. Contact support!', 'error');
    // });

  }

  public accessBasis() {

    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.BASISACCESE}`;

    const admindetstring = localStorage.getItem('AdminUserDetails');
    const admindetObj = JSON.parse(admindetstring);

    const reqObjBasis = {
      UserName: localStorage.getItem('username'),
      Password: localStorage.getItem('password'),
      // TokenValue: localStorage.getItem('EncryptedToken'),
      TokenValue: localStorage.getItem('TokenEncrypted'),
      Channel: 'AM',
      RequestID: '4',
      Key: localStorage.getItem('UserKey'),
      AppId: 1,
      BranchCode: admindetObj.AdminUser.Branch,
      BasisId: admindetObj.AdminUser.BasisId
    };

    return this.http.post<BasisAccessStatus>(PATH, reqObjBasis).pipe(
      retry(3),
      catchError(this.util.handleError),

      map(res => {
        console.log(res);
        if (res.ResponseCode === '00') {
          console.log('Successful basis setTeller attempt, response = ' + JSON.stringify(res));
          // this.setResetBasisStatus(res);
          // swal('Good job!', 'You have successfully changed your Basis password!', 'success');
          return res;
        } else {
          // swal('Oops!', res.ResponseDescription, 'error');
          console.log('Failed basis setTeller attempt, response = ' + JSON.stringify(res));
          return null;
        }
      })
    );
  }

  public validate(encryptedToken) {
    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.VAL_TOKEN}`;
    let reqObj2: any = '';
    // const data: any = '';
    // let encToken: any = '';
    const userID = localStorage.getItem('username');
    const key = localStorage.getItem('UserKey');
    console.log('Enc Token:' + encryptedToken);
    localStorage.setItem('EncryptedToken', encryptedToken);
    // const encTokenString = JSON.parse(encToken.Data);
    // encToken = JSON.parse(localStorage.getItem('Token Encrypted'));


    console.log('enctokenstring: ' + encryptedToken);
    reqObj2 = {
      UserName: userID,
      TokenValue: encryptedToken,
      Channel: 'AM',
      RequestID: this.util.generateRequestId,
      Key: key
    };
    console.log('ReqObj: ' + JSON.stringify(reqObj2));

    return this.http.post<any>(PATH, reqObj2).pipe(
      retry(3),
      catchError(this.util.handleError),

      map(res => {
        console.log(res);
        if (res.ResponseCode === '00') {
          // this.setResetBasisStatus(res);
          // swal('Good job!', 'You have successfully changed your Basis password!', 'success');
          return res;
        } else {
          swal('Oops!', res.ResponseDescription, 'error');
          return null;
        }
      })
    );
  }

  public resetBasisPassword(userDetails) {
    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.RESETBASISPASS}`;
    {
      console.log('Data1' + userDetails);
      const body: any = {};
      const user = localStorage.getItem('StaffDetailsWithPic');
      const user2 = localStorage.getItem('AdminUserDetails');
      const userObj = JSON.parse(user);
      const userObj2 = JSON.parse(user2);

      const reqObj2 = {
        NewPassword: userDetails,
        TellerID: userObj2.AdminUser.BasisId,
        TellerName: userObj.StaffDetails.UserName,
        BranchCode: userObj2.AdminUser.Branch,
      };

      console.log('Data2' + reqObj2);
      // const data = {
      //   ...userDetails,

      // };
      if (userDetails == null) {
        swal('Oops!', 'Please supply matching passwords!', 'failure');
      }
      console.log('User Body For ResetPass::' + JSON.stringify(reqObj2));
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      return this.http.post<any>(PATH, reqObj2).pipe(
        retry(2),
        catchError(this.util.handleError),

        map(res => {
          console.log(res);
          if (res.ResponseCode === '00') {
            this.setResetBasisStatus(res);
            swal('Oops', 'You can no longer reset your password from Access Manager. Kindly contact support', 'error');
            // swal('Good job!', 'You have successfully changed your Basis password!', 'success');
            return res;
          } else {
            swal('Oops', 'You can no longer reset your password from Access Manager. Kindly contact support', 'error');
            // swal('Oops!', res.ResponseDescription, 'error');
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
      if (!data) {
        swal('Oops!', 'Please supply a correct username!', 'error');
      }
      console.log('User Body For killMyId::' + JSON.stringify(data));

      return this.http.post<any>(PATH, data).pipe(
        retry(2),
        catchError(this.util.handleError),

        map(res => {
          console.log(res);
          if (res.ResponseCode === '00') {
            this.setKillMyId(res);
            swal('Good job!', 'You ID has successfully been removed on BASIS!', 'success');
            return res;
          } else {
            console.log(res);
            swal('Oops!', res.ResponseDescription, 'error');
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

  public redirectToPage(data: any) {

    const redirectParams = new HttpParams();
    redirectParams.set('uid', data.username);
    redirectParams.set('upass', data.password);
    redirectParams.set('ucode', data.ucode);

    return this.http.post<any>(data.appUrl, redirectParams)
    .subscribe(res => console.log(res));
  }

}
