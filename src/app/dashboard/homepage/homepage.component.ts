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
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  userName = localStorage.getItem('username');
  passWord = localStorage.getItem('password');
  ucode = localStorage.getItem('UserKey');
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
    localStorage.setItem('ClickedApp', appid);
    localStorage.setItem('ClickedUrl', appUrl);
    const newuserdet = JSON.parse(userdetails);
    console.log(appUrl, appid, newuserdet.username, newuserdet.password);
    localStorage.setItem('uid', newuserdet.username);
    localStorage.setItem('upass', newuserdet.password);
    localStorage.setItem('ucode', appid);
 }
}

