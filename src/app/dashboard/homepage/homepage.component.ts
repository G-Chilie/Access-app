import { LoginComponent } from './../../auth/login/login.component';
import { Product } from '../../_model/products.data';
import { UserInfo } from '../../_model/userinfo.data';
import { Component, OnInit } from '@angular/core';
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
import { TokenValidationComponent } from '../../token-validation/container/token-validation/token-validation.component';
import { PopUpModalComponent } from 'src/app/modal/pop-up-modal/pop-up-modal.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
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
    private tokenvalid: TokenValidationComponent,
    private popup: PopUpModalComponent,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userappandurl = this.userService.UserApplications;
    // for (const res of this.userappandurl) {

    //   // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: max-line-length
    //   res.ApplicationImage ? console.log(res.ApplicationImage) : res.ApplicationImage = 'data:image/png;base64,' + '../../../assets/images/single-sign-on2x.png';
    // }
    function getBase64(event) {
      const me = this;
      event = '../../../assets/images/single-sign-on2x.png';
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        // me.modelvalue = reader.result;
        console.log(reader.result);
      };
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
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
    // this.tokenvalid.submitRequest();
    // this.router.navigate(['/token-validation']);
    // this.popup.openDialog();
    // console.log(appid);
    // console.log(appUrl);
    // console.log(userdetails);
    // console.log(appImageUrl);
    const dialogRef = this.dialog.open(PopUpModalComponent, {
      width: '450px',
      data: { appUrl: appUrl, appid: appid, userdetails: userdetails, appImageUrl: appImageUrl}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });

  }
}

