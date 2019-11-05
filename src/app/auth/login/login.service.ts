// import { environment } from '../../environments/environment';
import { Auth } from '../../_model/products.data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../_model/user';
// import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   // products = 'src/assets/data/products.json';
   BASE_URl = 'https://gtweb.gtbank.com/GTBAdminUserService/api/Staff/GetStaffWithPicture';
   // postUrl: string = environment.BASE_URL ;
constructor(private http: HttpClient,
  private user: User) { }

// public amLogin() {
//     return this.http.get<User[]>(this.BASE_URl + this.user.username).pipe();
// }

}


// getInfo(): Observable<Auth> {
//  return this.http.get<Auth>(this.BASE_URl);
// }
// }
