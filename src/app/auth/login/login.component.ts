import { HeaderComponent } from './../../shared/ui/header/header.component';
import { Auth } from '../../dashboard/_model/products.data';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/auth.service';
// import { NotificationsService } from 'angular2-notifications'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  // providers: [NotificationsService]
})
export class LoginComponent implements OnInit {
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
  ) { }

  ngOnInit() {
    this.createForm();
    //  this.boardServices.getInfo().subscribe((result) => {
    //    console.log(result);
    //    this.Auth = result;
    //   });
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  public signIn(form) {
    this.loading = true;
    this.loginError = null;
    this.authenticationService.login(form)
      .subscribe(data => {
        console.log('login res - ', JSON.stringify(data));
        // if (data.ResponseCode === '00') {
        //   localStorage.setItem('staffDetails', JSON.stringify(data.StaffDetails));
        //   this.router.navigate(['/home']);
        // } else {
          this.router.navigate(['/login']);
          this.loginError = ''; // data.ResponseDescription;
          // this.errorAlert(this.loginError);
          console.log(this.loginError);
        // }
        this.loading = false;


      },
        error => {
          this.error = error;
          this.loading = false;
        });
    return this.musername;
  }
  // errorAlert(message: any) {
  //   this.notifications.html(
  //     `<span class="f-12">${message}</span>`,
  //     'error',
  //     {
  //       id: 'LoginError',
  //       timeOut: 10000,
  //       showProgressBar: true,
  //       animate: 'scale'
  //     }
  //   );
  // }
  // saveuser() {
  //   const musername = data.StaffDetails.FullName
  // }
}

