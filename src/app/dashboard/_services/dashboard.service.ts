import { Router } from '@angular/router';
import { Product } from '../../_model/products.data';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
   products = 'src/assets/data/products.json';
   baseUrl = environment.BASE_URL ;
   channel: 'Access Manager';
  requestID: any;
constructor(private http: HttpClient, private router: Router) { }

getProducts(): Observable<Product> {
 return this.http.get<Product>( this.products);
}
//  getStaffDetails(): Observable<UserInfo> {
//   return this.http.get<UserInfo>( this.staffDetailsUrl);
//  }
  getStaffDetails(data) {
    data.channel = environment.Channel;
    data.requestID = this.requestID;

    return this.http.post(`${this.baseUrl}/GetStaffWithPicture`, data);
  }
logout() {
 localStorage.removeItem('staffDetail');
 this.router.navigate(['/login']);
}

}
