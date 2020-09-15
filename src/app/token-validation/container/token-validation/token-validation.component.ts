import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { UtilityService } from 'src/app/utility.service';
import { FormValidators } from 'src/app/Validator/form-validator';
import swal from 'sweetalert';
import { ValidateUserWithToken, StaffDetails } from 'src/app/_model/user';
import { Token } from '@angular/compiler';
import { PopUpModalComponent } from 'src/app/modal/pop-up-modal/pop-up-modal.component';
import { HomepageComponent } from 'src/app/dashboard/homepage/homepage.component';


@Component({
  selector: 'app-token-validation',
  templateUrl: './token-validation.component.html',
  styleUrls: ['./token-validation.component.css']
})
export class TokenValidationComponent implements OnInit {
  validateTokenForm: FormGroup;
  ngAddUrl = '';
  password: FormControl;
  loading = false;
  tokenId: any;
  passwordvalid = '([0-9]{6})';
  constructor(private router: Router, private userser: UserService, private formBuilder: FormBuilder,
    private userServ: UserService, private popup: PopUpModalComponent, private home: HomepageComponent,
    private util: UtilityService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  public createLoginForm() {
    this.validateTokenForm = this.formBuilder.group({
      // tslint:disable-next-line: quotemark
      // tslint:disable-next-line: max-line-length
      tokenString: new FormControl('', [Validators.required,
      Validators.pattern(this.passwordvalid)
      ]),


    });
    // this.modals.pop();
  }

  get tokenValue() {
    return this.validateTokenForm.get('tokenString');
  }

  submitRequest() {
    if (this.validateTokenForm.invalid) {
      FormValidators.validateAllFormFields(this.validateTokenForm);
      swal('Oops! ', 'Please enter a correct token', 'error');
      return;
    }
    this.loading = true;
    // this.loginError = null;
    const logidet = this.validateTokenForm.value;
    setTimeout(() => {

      // localStorage.setItem('Token Value:', JSON.stringify(this.validateTokenForm.value));
      // console.log(logidet);
      // alert('Logging in....');
    }, 2000);

    this.util.encrypt(this.validateTokenForm.value.tokenString).subscribe(data => {
      data ? this.validate(data) : console.log('token data not encrypted');
    });

  }

  validate(recdata) {
    // console.log('Encrypted Token:' + recdata);
    const logindetails = JSON.parse(localStorage.getItem('LoginFormDet'));
    // logindetails = this.util.decrypt(logindetails);
    this.userser.validate(recdata).subscribe((a: ValidateUserWithToken) => {
      const LoginStatus = localStorage.getItem('LoginStatus');
      console.log('LoginStatus: ' + LoginStatus);
      if (localStorage.getItem('LoginStatus') === null) {
        // a ? this.getUserPic(logindetails) : console.log('An error occured while validating Token Details');
        // a ? this.getUserPic(logindetails) : this.getUserPic(logindetails);
        a ? this.getUserPic(logindetails) : swal('Oops! ', 'An error ocured while validating Token', 'error');
        // this.getUserPic(logindetails);
        this.loading = false;
      } else {
        const appUrl = localStorage.getItem('ClickedUrl');
        const appid = localStorage.getItem('ClickedApp');
        const userdetails = localStorage.getItem('useDet');
        const appImageUrl = localStorage.getItem('applicationImage');
        // this

        const applicationName = localStorage.getItem('applicationName');
        console.log(appUrl);
        const ngappCheck = appUrl.endsWith('/login');
        if (ngappCheck) {
          this.goToAngularApp(applicationName, appUrl);
          this.router.navigate(['/home']);
        } else {
          this.home.goToUrl2(appUrl, appid, userdetails, appImageUrl);
          this.router.navigate(['/home']);
        }

              // this.redirectForm();
      // this.dialogRef.close();
      }

    });
    // this.getUserPic(logindetails);
    // this.loading = false;
    // this.userser.validate(recdata).subscribe((a: ValidateUserWithToken) => {
    //   a ? this.getUserPic(logindetails) : swal('Oops! ', a.ResponseDescription, 'error');
    // });
  }

  getUserPic(userDets) {
    this.userser.getUserWithPic(userDets).subscribe((a: StaffDetails) => {
      console.log('About to get userpic');
      this.userser.setUserObject(a);
      this.loading = false;
      // a ? this.router.navigate(['home']) : swal('Oops! ', 'An error occured wile fetching information from SAP', 'error');
      a ? this.router.navigate(['home']) : this.router.navigate(['home']);
      localStorage.setItem('LoginStatus', 'Yes');
    });
  }


  goToAngularApp(applicationName, appUrl) {
    const body: any = {
       Username: localStorage.getItem('username'),
       Password: localStorage.getItem('password'),
       Application: applicationName,
       ApplicationId: localStorage.getItem('ClickedApp'),
       Channel: applicationName,
       Key: localStorage.getItem('UserKey'),
       RequestID: 'GP1579617017672655934545'
     };
   console.log(JSON.stringify(body));
   this.userser.postAngularApps(body).subscribe(res => {
    // tslint:disable-next-line: triple-equals
    if (res.ResponseCode == '00') {
       // this.isToken = !this.isToken
        this.tokenId = res.TokenKey;
        this.ngAddUrl = appUrl + '/' + this.tokenId;
        // window.open('https://www.google.com/' + this.tokenId);
        window.open(this.ngAddUrl);
    }
    console.log(this.ngAddUrl);
    console.log('angular response' + res);
   });


 }

  Back() {
    const backCheck = localStorage.getItem('StaffDetailsWithPic');
    if (backCheck === '' || backCheck === null) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['home']);
    }
  }
}
