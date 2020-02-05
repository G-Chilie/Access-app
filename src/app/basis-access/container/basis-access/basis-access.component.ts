import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { BasisAccessStatus } from 'src/app/_model/user';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { UtilityService } from 'src/app/utility.service';
import { FormValidators } from 'src/app/Validator/form-validator';
import swal from 'sweetalert';
import { Router } from '@angular/router';
import { PopUpModalComponent } from '../../../modal/pop-up-modal/pop-up-modal.component';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-basis-access',
  templateUrl: './basis-access.component.html',
  styleUrls: ['./basis-access.component.css']
})
export class BasisAccessComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  @ViewChild('tokenForm') basisValidateForm: NgForm;
  // tslint:disable-next-line: max-line-length
  // appUrl = 'http://10.0.6.78:8888/forms/frmservlet?config=ref&serveruserparams=NLS_LANG=AMERICAN_AMERICA.AR8MSWIN1256&otherparams=P_WST_LAN_IND=1';
  // tslint:disable-next-line: max-line-length
  appUrl = 'http://10.0.6.112:8888/forms/frmservlet?config=ref&serveruserparams=NLS_LANG=AMERICAN_AMERICA.AR8MSWIN1256&otherparams=P_WST_LAN_IND=1';
  // appUrl = 'http://10.0.4.61:9001/banks/';
  // appUrl = 'http://10.0.6.203/BASISAccess/CloseApp2.aspx';
  userName = localStorage.getItem('username');
  passWord = localStorage.getItem('password');
  ucode = localStorage.getItem('UserKey');
  _basisValidateForm: FormGroup;
  password: FormControl;
  loading = false;
  passwordvalid = '([0-9]{6})';
  constructor(private popup: PopUpModalComponent, private userService: UserService,
    private router: Router, private formBuilder: FormBuilder,
    private util: UtilityService, public dialog: MatDialog) { }

  ngOnInit() {
    this.createLoginForm();
  }

  public createLoginForm() {
    this._basisValidateForm = this.formBuilder.group({
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
      a ? this.redirectForm() : swal('Oops! ', a.ResponseDescription, 'error');
      this.loading = false;
    });
  }

  submitRequest(_basisValidateForm) {
    if (this._basisValidateForm.invalid) {
      FormValidators.validateAllFormFields(this._basisValidateForm);
      swal('Oops! ', 'Please enter a correct token', 'error');
      return;
    }
    this.loading = true;
    // this.loginError = null;
    const logidet = this._basisValidateForm.value;
    setTimeout(() => {
      this.loading = true;
      localStorage.setItem('Token Value:', JSON.stringify(this._basisValidateForm.value));
      console.log(logidet);
      // alert('Logging in....');
    }, 2000);

    this.util.encrypt(this._basisValidateForm.value.tokenString).subscribe(data => {
      data ? this.validate(data) : console.log('token data not encrypted');
    });

  }

  validate(recdata) {
    localStorage.setItem('TokenEncrypted', recdata);
    console.log('Encrypted Token:' + recdata);
    const logindetails = JSON.parse(localStorage.getItem('LoginFormDet'));

    // this.userService.validate(recdata).subscribe((a: BasisAccessStatus) => {
    //   a ? this.basisLogin() : swal('Oops! ', a.ResponseDescription, 'error');
    // });
    this.basisLogin();
  }

  // openURL() {
  //     const shell = new ActiveXObject('WScript.Shell');
  //     shell.run('Firefox http://www.google.com');
  // }

  redirectForm() {

    // tslint:disable-next-line: no-unused-expression
    // window.location.href = this.appUrl, '_blank';
    // window.open(this.appUrl, '_blank');
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = this.appUrl;
    form.target = '_blank';

    document.getElementById('form-section').appendChild(form);

    const userId = document.createElement('input');
    userId.id = 'uid';
    userId.name = 'uid';
    userId.type = 'text';
    userId.hidden = true;
    userId.value = localStorage.getItem('username');

    const userPass = document.createElement('input');
    userPass.id = 'upass';
    userPass.name = 'upass';
    userPass.type = 'text';
    userPass.hidden = true;
    userPass.value = localStorage.getItem('password');

    const userCode = document.createElement('input');
    userCode.id = 'ucode';
    userCode.name = 'ucode';
    userCode.type = 'text';
    userCode.hidden = true;
    userCode.value = localStorage.getItem('UserKey');

    form.appendChild(userId);
    form.appendChild(userPass);
    form.appendChild(userCode);

    form.submit();
    window.location.reload();
  }
  Back() {
    window.location.reload();
  }
}
