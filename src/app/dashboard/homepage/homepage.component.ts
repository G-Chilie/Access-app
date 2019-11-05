import { LoginComponent } from './../../auth/login/login.component';
import { Product } from '../../_model/products.data';
import { UserInfo } from '../../_model/userinfo.data';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';
import { User } from '../../_model/user';
import { ResetBasisPasswordComponent } from '../../reset-basis-password/reset-basis-password.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  UserInfo: any;
  content: any = 'Please enter your new password';
  closeResult: string;
  constructor(private boardServices: DashboardService, private logininfo: LoginComponent,
    private ResetBasis: ResetBasisPasswordComponent, private modalService: NgbModal) { }

  ngOnInit() {
    // this.ResetBasis.open(content);
    // this.getStaffDetails();

  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  getStaffDetails() {
    const user: User = JSON.parse(localStorage.getItem('staffDetail'));
    const data = {
      // username: user.username,
      requestinguserid: user.RequestingUserID
    };

    // this.boardServices.getStaffDetails(data).subscribe((result) => {
    //   console.log(result);
    //   this.UserInfo = result;
    // });
  }
}
