import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';
import { UtilityService } from 'src/app/utility.service';
import { FormValidators } from 'src/app/Validator/form-validator';
import swal from 'sweetalert';
import { ValidateUserWithToken, StaffDetails } from 'src/app/_model/user';


@Component({
  selector: 'app-token-validation',
  templateUrl: './token-validation.component.html',
  styleUrls: ['./token-validation.component.css']
})
export class TokenValidationComponent implements OnInit {
  validateTokenForm: FormGroup;
  password: FormControl;
  loading = false;
  passwordvalid = '([0-9]{6})';
  constructor(private router: Router, private userser: UserService, private formBuilder: FormBuilder,
    private userServ: UserService,
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

      localStorage.setItem('Token Value:', JSON.stringify(this.validateTokenForm.value));
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

    // this.userser.validate(recdata).subscribe((a: ValidateUserWithToken) => {
    //   this.loading = false;
    //   a ? this.getUserPic(logindetails) : this.getUserPic(logindetails);
    // });
    this.getUserPic(logindetails);
    // this.loading = false;
    // this.userser.validate(recdata).subscribe((a: ValidateUserWithToken) => {
    //   a ? this.getUserPic(logindetails) : swal('Oops! ', a.ResponseDescription, 'error');
    // });
    this.loading = false;
  }

  getUserPic(userDets) {
    this.userser.getUserWithPic(userDets).subscribe((a: StaffDetails) => {
      this.userser.setUserObject(a);
      a ? this.router.navigate(['home']) : console.log('Failed GetUserWithPic result: ' + a);

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
