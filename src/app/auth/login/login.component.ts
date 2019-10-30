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

// import { NotificationsService } from 'angular2-notifications'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  // providers: [NotificationsService]
})
export class LoginComponent implements OnInit {
  loginResult: any;
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

  get username() { return this.loginForm.controls['username']; }

  public login() {
    this.loading = true;
    this.loginError = null;
    this.loginResult = null;
    setTimeout(() => {
      this.loading = false;
      localStorage.setItem('Form Details', JSON.stringify(this.loginForm.value));
      console.log(this.loginForm.value);
      // alert('Logging in....');
    }, 10000);
    this.loginResult = this.userService.getUserWithPic();
    if (this.loginResult = null) {
      catchError(this.util.handleError);
      //       localStorage.setItem('staffDetails', JSON.stringify(data.StaffDetails));
      //       this.router.navigate(['/home']);
      //     } else {
      //       this.router.navigate(['/login']);
      //       this.loginError = ''; // data.ResponseDescription;
      //       // this.errorAlert(this.loginError);
      //       console.log(this.loginError);
      //     // }
    } else {
      this.router.navigate(['/']);

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

  // private getUserDetails() {
  //   this.userService.getByUserUsername().pipe(first()).subscribe(users => {
  //       this.username.value = users;
  //   });
}

}

