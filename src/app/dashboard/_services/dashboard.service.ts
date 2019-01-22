import { Product } from './../_model/products.data';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
   products = 'src/assets/data/products.json';
constructor(private http: HttpClient) { }

getProducts(): Observable<Product> {
 return this.http.get<Product>( this.products);
}
}

