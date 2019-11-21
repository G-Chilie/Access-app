import { LoginComponent } from './../../auth/login/login.component';
import { Product } from '../../_model/products.data';
import { UserInfo } from '../../_model/userinfo.data';
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';
import { User } from '../../_model/user';
import { ResetBasisPasswordComponent } from '../../reset-basis-password/reset-basis-password.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationModalComponent } from '../../notification-modal/notification-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../_services/user.service';
import { QuicklinksComponent } from '../../quick-links/quicklinks.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  UserInfo: any;
  content: any = 'Please enter your new password';
  userappandurl: any;
  closeResult: string;
  constructor(
    private modalService: NgbModal,
    private notifier: NotificationModalComponent,
    public QuickLinks: QuicklinksComponent,
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.userappandurl = this.userService.UserApplications;
    // console.log(this.userappandurl);
    // (response:Response)=>{
    //   const result = response;
    //   console.log(result);

  }

  public open() {
    const modalRef = this.modalService.open(this.notifier);
    modalRef.componentInstance.id = 10;
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  goToUrl() {
    console.log(`úrl`);
  }
}

  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  // getStaffDetails() {
  //   const user: User = JSON.parse(localStorage.getItem('staffDetail'));
  //   const data = {
  //     // username: user.username,
  //     requestinguserid: user.RequestingUserID
  //   };

    // this.boardServices.getStaffDetails(data).subscribe((result) => {
    //   console.log(result);
    //   this.UserInfo = result;
    // });


