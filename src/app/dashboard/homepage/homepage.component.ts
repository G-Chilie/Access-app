import { Product } from './../_model/products.data';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  products: Product;
  constructor(private boardServices: DashboardService) { }

  ngOnInit() {

      this.boardServices.getProducts().subscribe((result) => {
        console.log(result);
        this.products = result;
  });

  }




}
