import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_model/user';
import { environment } from 'src/environments/environment';
import { catchError, retry, map } from 'rxjs/operators';
import { UtilityService } from '../utility.service';
// import { LoginComponent } from '../../../src/app/auth/login/login.component';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient, private util: UtilityService) { }

    private getUserApps() {
      const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.APPS_API}`;
      let body: any = localStorage.getItem('Form Details');
      // this.login.loginForm.value;
      body = this.util.addAuthParams(body);
      // body.customerId = this.extEncrypt(this.merchantId);
      // delete body.customerNumber;
      return this.http.post<any>(PATH, body).pipe(
        retry(2),
        catchError(this.util.handleError),
        map((res) => {
          console.log(res);
          localStorage.setItem('UserApplications', res);
          localStorage.setItem('UserBranch', res.AdminUser.Branch);
          if (res.responseCode === '00') {
            return res;
          } else {
            return null;
          }
        })
      );
    }

    public getUserWithPic() {
      const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.USERPIC}`;
      let body: any = (localStorage.getItem('Form Details'));
      body = this.util.addAuthParams(body);
      // body.customerId = this.extEncrypt(this.merchantId);
      // delete body.customerNumber;
      return this.http.post<any>(PATH, body).pipe(
        retry(2),
        catchError(this.util.handleError),
        map((res) => {
          console.log(res);
          localStorage.setItem('StaffDetails', res);
          if (res.responseCode === '00') {
            return res.StaffDetails;
          } else {
            return null;
          }
        })
      );
    }

    private getUserSecDet() {
      const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.USERSEC_API}`;
      let body: any = localStorage.getItem('Form Details');
      body = this.util.addAuthParams(body);
      // body.customerId = this.extEncrypt(this.merchantId);
      // delete body.customerNumber;
      return this.http.post<any>(PATH, body).pipe(
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
