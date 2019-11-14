import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ResetPasswordStatus, UserEoneDetails } from '../_model/user';
// import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { catchError } from 'rxjs/operators';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-reset-basis-password',
  templateUrl: './reset-basis-password.component.html',
  styleUrls: ['./reset-basis-password.component.css']
})
export class ResetBasisPasswordComponent implements OnInit {
  closeResult: string;
  myForm: FormGroup;
  password: FormControl;
  // password: FormControl;
  // password: any;
  loading = false;
  constructor(private modalService: NgbModal, private userser: UserService, private formBuilder: FormBuilder,
    private userServ: UserService,
    private util: UtilityService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  public createLoginForm() {
    this.myForm = this.formBuilder.group({
      Password1: ['', Validators.required],
      Password2: ['', Validators.required]
    });
    // this.modals.pop();
  }

  submitRequest() {
    this.loading = true;
    // this.loginError = null;
    const logidet = this.myForm.value;
    setTimeout(() => {
      this.loading = false;
      localStorage.setItem('New Password Details:', JSON.stringify(this.myForm.value));
      console.log(logidet);
      // alert('Logging in....');
    }, 2000);
    const userDetails: any = {
      password1: logidet.Password1,
      password2: logidet.Password2
      // NewPassword: this.password.value
    };
    console.log('New Password Details:' + JSON.stringify(userDetails.password2));
    this.userser.resetBasisPassword(userDetails.password2).subscribe((a: ResetPasswordStatus) => {
      console.log(a);
    });
    // userDetails.password1 = logidet.Password1;
    // userDetails.password2 = logidet.Password2;

    // this.userser.getUserApps(userDetails).subscribe((a: UserEoneDetails) => {
    //   console.log(a);
    // });
    // this.userServ.resetBasisPassword(this.password);
    // if (passwords.password1 = passwords.password2) {
    //   const password = passwords.password1;
    //   console.log(password);
    // } else {
    //   catchError(this.util.handleError);
    // }
    // setTimeout(() => {
    //   this.loading = false;
    // }, 3000);
    // const userDetails: any = {
    //   password: this.password
    //   // NewPassword: this.password.value
    // };
    // console.log('USERDET' + JSON.stringify(userDetails));
    // this.userServ.resetBasisPassword(userDetails).subscribe((a: ResetPasswordStatus) => {
    //   console.log(a);
    // });
  }

}
