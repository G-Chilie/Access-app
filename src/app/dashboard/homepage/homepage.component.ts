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
import { DomSanitizer } from '@angular/platform-browser';

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
  picture: any;
  userName = localStorage.getItem('username');
  passWord = localStorage.getItem('password');
  ucode = localStorage.getItem('UserKey');
  finalUrl: string;
  UserInfo: any;
  content: any = 'Please enter your new password';
  userappandurl: any;
  userlogindet: any;
  closeResult: string;

  constructor(
    public sanitizer: DomSanitizer,
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
    for (const res of this.userappandurl) {
res.ApplicationImage = this.sanitizer.bypassSecurityTrustResourceUrl(this.updateImage(res.ApplicationImage));
    }
    // this.finalUrl = this.userService.UserApplications.ApplicationImage;
    // const pic = this.userService.ApplicationImage;
    // this.picture = ('data:image/svg;base64,' + this.userService.ApplicationImage);
    // console.log('Image is: ' + this.picture);
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

  public updateImage(appUrl) {
    const applicationUrl = 'data:image/svg;base64,' + appUrl;
    return applicationUrl;
  }

  goToUrl(appUrl, appid, userdetails, appImageUrl) {
    localStorage.setItem('ClickedApp', appid);
    localStorage.setItem('ClickedUrl', appUrl);
    localStorage.setItem('applicationImage', appImageUrl);
    const newuserdet = JSON.parse(userdetails);
    console.log(appUrl, appid, newuserdet.username, newuserdet.password);
    localStorage.setItem('uid', newuserdet.username);
    localStorage.setItem('upass', newuserdet.password);
    localStorage.setItem('ucode', appid);


 }
}

