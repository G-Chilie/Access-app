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
import { HttpParams, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  UserInfo: any;
  content: any = 'Please enter your new password';
  userappandurl: any;
  userlogindet: any;
  closeResult: string;
  constructor(
    private modalService: NgbModal,
    private notifier: NotificationModalComponent,
    public QuickLinks: QuicklinksComponent,
    public activeModal: NgbActiveModal,
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    ) { }

  ngOnInit() {
    this.userappandurl = this.userService.UserApplications;
    this.userlogindet = localStorage.getItem('Form Details');
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

  goToUrl(appUrl, appid, userdetails) {
    const newuserdet = JSON.parse(userdetails);
    console.log(appUrl, appid, newuserdet.username, newuserdet.password);
//     const data = new HttpParams();
// data.append('Content-Disposition', 'form-data; name="Presentation"');
// data.append('Content-Type', 'text/html');
// data.append('text', page.content);

const headers = new Headers({ 'Content-Type': 'application/json' });
return this.http.post(appUrl + newuserdet.username + newuserdet.password + appid, {headers: headers});

  }
}


