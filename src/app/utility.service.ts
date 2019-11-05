import { Injectable } from '@angular/core';
// import { UserService } from '../app/_services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { retry, catchError, map } from 'rxjs/operators';
import * as JsEncryptModule from 'jsencrypt';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  randomNumber: any;
  today: Date;
  res: any;
  username: any;
  // body: any = localStorage.getItem('FormDetails');
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

  extEncrypt(data) {
    // console.log('encrypting: ' + data);
    const encrypt = new JsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(environment.PUB_AM_ENC_KEY);
    const hash = encrypt.encrypt(data);
    return hash;
  }

  addAuthParams(body) {
    // this.user = this.userService.getByUserUsername();
    // console.log(this.user);
    //  const userdetails = this.extEncrypt(localStorage.getItem('FormDetails'));
     const userdetails = JSON.stringify(localStorage.getItem('userdet')) ;
     console.log('ewa deolu', userdetails);
      // body.username = this.extEncrypt(body.UserID);
      // body.username = userdetails.username;
      // body.password = userdetails.password;

    return body;
  }

   getUsername() {
    this.res = localStorage.getItem('Form Details');
    // this.res = this.userService.getUserWithPic();
    this.username = this.res.username;
    console.log(this.username);
    return this.username;
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

  generateNumber() {
    this.randomNumber = null;
    this.randomNumber =
      environment.Channel +
      this.today +
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
