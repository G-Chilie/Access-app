import { HeaderComponent } from './../../shared/ui/header/header.component';
import { Auth } from '../../_model/products.data';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { first } from 'rxjs/operators';
import { UtilityService } from '../../utility.service';
import { catchError, retry, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { StaffDetails, AdminUserDetails } from 'src/app/_model/user';
import swal from 'sweetalert';
import { FormValidators } from 'src/app/Validator/form-validator';
import { PopUpModalComponent } from '../../modal/pop-up-modal/pop-up-modal.component';
import { TokenValidationComponent } from 'src/app/token-validation/container/token-validation/token-validation.component';
// import { NotificationsService } from 'angular2-notifications'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  // providers: [NotificationsService]
})
export class LoginComponent implements OnInit {
  loginResultSubscription: Subscription;
  loginForm: FormGroup;
  loginError: string;
  loading = false;
  submitted = false;
  returnUrl: string;
  musername: string;
  userid: FormControl;
  password: FormControl;
  error = 'An error occured';

  Auth: Auth;
  constructor(
    // private notifications: NotificationsService,
    private popup: PopUpModalComponent,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private util: UtilityService,
    private userService: UserService,
    private tokencomp: TokenValidationComponent
  ) { }

  ngOnInit() {
    this.createLoginForm();
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // get username() { return this.loginForm.controls['username']; }

  public login() {
    if (this.loginForm.invalid) {
      FormValidators.validateAllFormFields(this.loginForm);
      swal('Oops! ', 'Please enter a correct username and password', 'error');
      return;
    }
    localStorage.clear();
    const userKey = this.util.generateNumber();
    localStorage.setItem('UserKey', userKey);
    this.loading = true;
    this.loginError = null;
    // console.log('USER' + JSON.stringify(this.loginForm.value));
    const encLogdet = this.util.encrypt(this.loginForm.value);
    localStorage.setItem('LoginFormDet', JSON.stringify(this.loginForm.value));

    // if (a) {
    this.util.encrypt(this.loginForm.value.username).subscribe(data => {
      data ? localStorage.setItem('username', data) : console.log('An error occured: data not encrypted');
    });


    this.util.encrypt(this.loginForm.value.password).subscribe(data => {
      localStorage.setItem('password', data);
      data ? this.getEncDetails(data) : console.log('An error occured: data not encrypted');
    });


    // } else {
    //   this.router.navigate(['/login']);
    //   swal('An error occured while logging you in. Please contact support', 'error');
    // }

    // Encrypt user details
    // end of encryprion.. encrypted user details stored in localstorage

  }

  getEncDetails(data) {
    setTimeout(() => {
      // console.warn('fetch apps');
      const userData = this.util.getEncryptedDetails();
      // console.log('Encrypted User ' + userData);
      if (!userData) {
        this.util.getEncryptedDetails();
      }
      userData ? this.getAdminUserDetails(userData) : console.log('No user data to encrypt');
    }, 4000);
  }

  getAdminUserDetails(data) {

    this.userService.getUserApps(data).subscribe((a) => {
      this.loading = false;
      // console.log(a);

      if (a) {

        const finUserStatus = a.FinancialUser;
        console.log('Financial user? Answer: ' + finUserStatus);
        if (finUserStatus === true) {
          localStorage.setItem('AdminUserDetails', JSON.stringify(a));
          // this.popup.openDialog();
          this.router.navigate(['/token-validation']);
          // this.tokencomp.getUserPic(this.loginForm.value);
        } else if (finUserStatus === false) {
          localStorage.setItem('AdminUserDetails', JSON.stringify(a));
          // tslint:disable-next-line: no-shadowed-variable
          this.userService.getUserWithPic(this.loginForm.value).subscribe((a: StaffDetails) => {
            this.loading = false;
            // a ? this.router.navigate(['home']) : console.log('Failed GetUserWithPic result: ' + a);
            a ? this.router.navigate(['home']) : this.router.navigate(['home']);
            localStorage.setItem('LoginStatus', 'Yes');
            this.userService.setUserObject(a);
          });


          // tslint:disable-next-line: no-shadowed-variable
        } else {
          // console.log('No admin user data');
        }
        // a ? localStorage.setItem('AdminUserDetails', JSON.stringify(a)) : console.log('No admin user data');
        //  this.router.navigate(['/home']);
      }
    });

  }

  public logout() {
    localStorage.removeItem('Form Details');
    localStorage.removeItem('LoginStatus');
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}



