import { LoginComponent } from './../../auth/login/login.component';
import { Product } from '../../_model/products.data';
import { UserInfo } from '../../_model/userinfo.data';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';
import { User } from '../../_model/user';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  UserInfo: any;
  constructor(private boardServices: DashboardService, private logininfo: LoginComponent) { }

  ngOnInit() {

    // this.getStaffDetails();

  }


  getStaffDetails() {
    const user: User = JSON.parse(localStorage.getItem('staffDetail'));
    const data = {
      // username: user.username,
      requestinguserid: user.RequestingUserID
    };

    this.boardServices.getStaffDetails(data).subscribe((result) => {
      console.log(result);
      this.UserInfo = result;
    });
  }
}
