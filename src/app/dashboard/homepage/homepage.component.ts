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
  userName = localStorage.getItem('EncUid');
  passWord = localStorage.getItem('EncPass');
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
    // const userName = newuserdet.username;
    // const passWord = newuserdet.password;

    // const urlnew = 'http://gtweb.gtbank.com/Adeolu/JennyBPS/ssologin.aspx';

    // const data: any = {
    //   userName, passWord, ucode
    //   // ...this.util.addAuthParams(body),
    //   // tslint:disable-next-line: quotemark
    //   // tokenId : "",
    //   // UserName : this.encryptData.encrypt(userData.userInfor.userName),
    // };

    // return this.http.post<any>(urlnew, data).pipe(
    // );
//     const data = new HttpParams();
// data.append('Content-Disposition', 'form-data; name="Presentation"');
// data.append('Content-Type', 'text/html');
// data.append('text', page.content);

// const headers = new Headers({ 'Content-Type': 'application/json' });
// return this.http.post(appUrl + newuserdet.username + newuserdet.password + appid, {headers: headers});
  }
}

