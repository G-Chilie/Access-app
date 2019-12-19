import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { BasisAccessStatus } from 'src/app/_model/user';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/utility.service';
import { FormValidators } from 'src/app/Validator/form-validator';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { PopUpModalComponent } from '../../../modal/pop-up-modal/pop-up-modal.component';

@Component({
  selector: 'app-basis-access',
  templateUrl: './basis-access.component.html',
  styleUrls: ['./basis-access.component.css']
})
export class BasisAccessComponent implements OnInit {
// tslint:disable-next-line: max-line-length
appUrl = 'http://10.0.6.78:8888/forms/frmservlet?config=ref&serveruserparams=NLS_LANG=AMERICAN_AMERICA.AR8MSWIN1256&otherparams=P_WST_LAN_IND=1';
userName = localStorage.getItem('username');
passWord = localStorage.getItem('password');
ucode = localStorage.getItem('UserKey');
  basisValidateForm: FormGroup;
  password: FormControl;
  loading = false;
  passwordvalid = '([0-9]{6})';
  constructor(private popup: PopUpModalComponent, private userService: UserService,
     private router: Router, private formBuilder: FormBuilder,
  private util: UtilityService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  public createLoginForm() {
    this.basisValidateForm = this.formBuilder.group({
      // tslint:disable-next-line: quotemark
      // tslint:disable-next-line: max-line-length
      tokenString: new FormControl('', [Validators.required,
      Validators.pattern(this.passwordvalid)
      ]),


    });
    // this.modals.pop();
  }

  basisLogin() {
    this.userService.accessBasis().subscribe((a: BasisAccessStatus) => {
      console.log('Basis Access Result: ' + a);
    });
  }

  submitRequest() {
    if (this.basisValidateForm.invalid) {
      FormValidators.validateAllFormFields(this.basisValidateForm);
      swal('Oops! ', 'Please enter a correct token', 'error');
      return;
    }
    this.loading = true;
    // this.loginError = null;
    const logidet = this.basisValidateForm.value;
    setTimeout(() => {
      this.loading = false;
      localStorage.setItem('Token Value:', JSON.stringify(this.basisValidateForm.value));
      console.log(logidet);
      // alert('Logging in....');
    }, 2000);

    this.util.encrypt(this.basisValidateForm.value.tokenString).subscribe(data => {
      data ? this.validate(data) : console.log('token data not encrypted');
    });

  }

  validate(recdata) {
    console.log('Encrypted Token:' + recdata);
    const logindetails = JSON.parse(localStorage.getItem('LoginFormDet'));

    this.userService.validate(recdata).subscribe((a: BasisAccessStatus) => {
      a ? console.log('') : swal('Oops! ', a.ResponseDescription, 'error');
    });

  }

  Back() {
    this.router.navigate(['/home']);
  }
}
