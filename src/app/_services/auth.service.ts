import { User } from '../_model/user';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { retry } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { Observable } from 'rxjs/observable';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

/* Global Variables */
currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
username: 'unwana.uforo';
RequestingUserID: 'unwana.uforo';
adminUser: User = new User();

postUrl =  environment.BASE_URL;
requestID = '480853048047';
headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) { }

// login(body) {
// this.adminUser.username = 'unwana.uforo';
// this.adminUser.RequestingUserID = 'unwana.uforo';
// this.adminUser.requestID = 23343434324;
// this.adminUser.Channel = 'AccessManager';

//     return this.http.post(`${this.postUrl}/Staff/GetStaffWithPicture`, this.adminUser)
//       .pipe(
//         retry(3),
//         catchError(this.errorHandler));
//   }

//     logout() {
//     localStorage.removeItem('staffDetail');
//     this.router.navigate(['/login']);
//     }

//     errorHandler(error: HttpErrorResponse) {
//       return Observable.throw(error);
//   }
}
