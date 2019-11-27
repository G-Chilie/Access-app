import { Injectable } from '@angular/core';
// import { UserService } from '../app/_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { retry, catchError, map, tap } from 'rxjs/operators';
import * as JsEncryptModule from 'jsencrypt';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  Info$: Subject<string> = new BehaviorSubject<string>(null);
  Error$: Subject<string> = new BehaviorSubject<string>(null);

  randomNumber: any;
  today: Date;
  res: any;
  username: any;

  constructor(private http: HttpClient,
    private router: Router) { }

  handleResponseError(res) {
    let message = res.responseDescription;
    switch (res.responseCode) {
      case '38':
        {
          setTimeout(() => {
            this.router.navigate(['/onboarding/logout']);
          }, 5000);
        }
        break;
      default:
        message = res.responseDescription;
        break;
    }
    return message;
  }

  handleError(error?: HttpErrorResponse) {
    // console.log(error);
    let errormessage;
    if (error.error instanceof ErrorEvent) {
      console.error('Network Error', error.error.message);
      errormessage = `Network Error ${error.error.message}`;
      console.log(errormessage);
    } else {
      console.error(`Backend returned code ${error.status},` + `body was: ${JSON.stringify(error.statusText)}`);
      if (error.statusText === 'Unknown Error') {
        errormessage = 'Opps! Something went wrong. Please check your network connection and try again.';
      } else {
        errormessage = `${error.statusText || errormessage}`;
        console.log(errormessage);
      }
    }
    console.log(errormessage);
    return throwError(`${errormessage}`);
  }

  encrypt(data) {
    const PATH = `${environment.BASE_URL}${environment.ADMIN_SERVICE}${environment.ENC_API}`;
    console.log('New Data To Encrypt:' + JSON.stringify(data));
    const reqObj = {
      Data: data,
      Key: localStorage.getItem('UserKey'),
      EncryptDecrypt: 1,
      AppId: 1,
      Channel: 'AM'
    };
    console.log(data);
    return this.http.post<any>(PATH, reqObj)
      .pipe(
        // tap(() => console.log('Encryption method has been triggered')),
        retry(3),
        catchError(this.handleError),
        map(res => {
          console.log(res);
          if (res.ResponseCode === '00') {
            // this.Info$.next(res.responseDescription);
            return res.Data;
          } else {
            console.log(res.ResponseDescription);
            // this.Error$.next(res.responseDescription);
            return null;
          }
        })
      );
  }

  addAuthParams(body) {
    const userdetails = JSON.stringify(localStorage.getItem('userdet'));
    console.log('ewa deolu', userdetails);
    return body;
  }

  getUsername() {
    this.res = localStorage.getItem('Form Details');
    // this.res = this.userService.getUserWithPic();
    this.username = this.res.username;
    console.log(this.username);
    return this.username;
  }

  getEncryptedDetails() {
    const encUsername = localStorage.getItem('username');
    const encPassword = localStorage.getItem('password');
    const data = {
      UserName: encUsername,
      Password: encPassword
    };
    if (encUsername && encPassword) {
      return data;
    } else {
      return null;
    }
  }

  generateRequestId() {
    let reqID = '';
    this.username = this.getUsername();
    if (this.username) {
      reqID = environment.Channel + this.today + this.username;
    } else {
      reqID = this.generateNumber();
    }
    console.log(`Request ID Checker: ${reqID}`);
    return reqID;
  }

  // generateNumber() {
  //   this.randomNumber = null;
  //   this.randomNumber =
  //     environment.RandomPrefix +
  //     this.today +
  //     Math.floor(Math.random() * (999999999 - 10000000 + 1) + 10000000);
  //     console.log(`RandomNumber Checker: ${this.randomNumber}`);
  //   return this.randomNumber;
  // }

  generateNumber() {
    this.randomNumber = null;
    this.randomNumber =
      environment.RandomPrefix +
      Math.floor(Math.random() * (999999999 - 10000000 + 1) + 10000000);
    console.log(`RandomNumber Checker: ${this.randomNumber}`);
    return this.randomNumber;
  }
  // products() {
  //   this.paymentService.paymentError$.next(null);
  //   this.paymentService.paymentInfo$.next('loading product list..');
  //   this.requestProducts().subscribe(
  //     (p: Product[]) => {
  //       this.paymentService.paymentInfo$.next(null);
  //       p ? this.products$.next(p) : this.paymentService.paymentError$.next('Unable to retrieve product list..');
  //     },
  //     (err: any) => {
  //       console.log(err);
  //       this.paymentService.paymentInfo$.next(null);
  //       this.paymentService.paymentError$.next('Unable to retrieve product list..');
  //     });
  // }
}
