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
    delete userDetails.RequestingUserID;
    delete userDetails.requestID;
    delete userDetails.Channel;
    delete userDetails.username;
    userDetails.password = logidet.password;
    userDetails.username = logidet.username;

    this.userService.getUserApps(userDetails).subscribe((a: UserEoneDetails) => {
      console.log(a);
    });
  }
  public logout() {
    localStorage.removeItem('Form Details');
    this.router.navigate(['/login']);
  }


}



