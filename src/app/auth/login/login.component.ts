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
import { StaffDetails } from 'src/app/_model/user';
import { UserEoneDetails } from 'src/app/_model/user';

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
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private util: UtilityService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.createLoginForm();
    //  this.boardServices.getInfo().subscribe((result) => {
    //    console.log(result);
    //    this.Auth = result;
    //   });
  }

  private createLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // get username() { return this.loginForm.controls['username']; }

  public login() {
    this.loading = true;
    this.loginError = null;
    const logidet = this.loginForm.value;
    setTimeout(() => {
      this.loading = false;
      localStorage.setItem('Form Details', JSON.stringify(this.loginForm.value));
      console.log(logidet);
      // alert('Logging in....');
    }, 1000);
    const userDetails: any = {
      username: logidet.username,
      password: logidet.password
      // NewPassword: this.password.value
    };
    console.log('USERDET' + JSON.stringify(userDetails));
    this.userService.getUserWithPic(userDetails).subscribe((a: StaffDetails) => {
      console.log(a);
    });
    this.userService.getUserApps(userDetails).subscribe((a: UserEoneDetails) => {
      console.log(a);
    });
    // if (this.loginResultSubscription != null) {
    //   this.router.navigate(['/']);
    //   console.log(this.loginResultSubscription);
    // } else {
    //   this.router.navigate(['/login']);
    // }
    // localStorage.setItem('StaffDetailsWithPic', this.loginResult);
      // this.router.navigate(['/']);

      //       localStorage.setItem('staffDetails', JSON.stringify(data.StaffDetails));
      //       this.router.navigate(['/home']);
      //     } else {
      //       this.router.navigate(['/login']);
      //       this.loginError = ''; // data.ResponseDescription;
      //       // this.errorAlert(this.loginError);
      //       console.log(this.loginError);
      //     // }

    // this.authenticationService.login()
    //   .subscribe(data => {
    //     console.log('login res - ', JSON.stringify(data));
    //     if (data.ResponseCode === '00') {
    //       localStorage.setItem('staffDetails', JSON.stringify(data.StaffDetails));
    //       this.router.navigate(['/home']);
    //     } else {
    //       this.router.navigate(['/login']);
    //       this.loginError = ''; // data.ResponseDescription;
    //       // this.errorAlert(this.loginError);
    //       console.log(this.loginError);
    //     // }
    //     this.loading = false;


    //   });
    // return this.musername;
  }
  public logout() {
    localStorage.removeItem('Form Details');
    this.router.navigate(['/login']);
  }

  // private getUserDetails() {
  //   this.userService.getByUserUsername().pipe(first()).subscribe(users => {
  //       this.username.value = users;
  //   });
}



