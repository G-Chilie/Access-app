import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/_services/user.service';
import { ValidateUserWithToken } from 'src/app/_model/user';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilityService } from 'src/app/utility.service';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-pop-up-modal',
  templateUrl: './pop-up-modal.component.html',
  styleUrls: ['./pop-up-modal.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class PopUpModalComponent implements OnInit {
  @ViewChild('tokenForm') tokenForm: NgForm;
  userName = localStorage.getItem('username');
  passWord = localStorage.getItem('password');
  ucode = localStorage.getItem('UserKey');
  loading = false;
  _tokenForm: FormGroup;
  // tslint:disable-next-line: max-line-length
  appUrl = 'http://10.0.6.78:8888/forms/frmservlet?config=ref&serveruserparams=NLS_LANG=AMERICAN_AMERICA.AR8MSWIN1256&otherparams=P_WST_LAN_IND=1';

  constructor(
    public util: UtilityService,
    public router: Router,
    public userserv: UserService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PopUpModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this.createTokenForm();
    // const newuserdet = JSON.parse(this.data.userdetails);
    console.log(this.data.userdetails);
  }

  createTokenForm() {
    this._tokenForm = this.fb.group({
      tokenValue: ['', Validators.required]
    });
  }

  onSubmit(_tokenForm) {
    this.setDataInLocalStorage();
    console.log(this.tokenForm.form.value);

    const passSaved = localStorage.getItem('LoginFormDet');
    const parsedpassSaved = JSON.parse(passSaved);
    const unencPass = parsedpassSaved.password;
    console.log('Unecrypted Pass: ' + unencPass);
    const keySaved = localStorage.getItem('UserKey');

    if (unencPass === this.tokenForm.value.tokenValue) {
      localStorage.setItem('Password is the same. ', 'Yass!');
      this.redirectForm();
      this.dialogRef.close();
    } else {
      localStorage.setItem('Password Not the same ', 'No!');
      swal('Oops', 'Wrong Password. Please enter password you provided at login', 'error');
      // this.redirectForm();
      this.dialogRef.close();
    }
    // const encryptPass = this.userserv.encryptData(this.tokenForm.form.value);
    // this.util.encrypt(this.tokenForm.value.tokenValue).subscribe(resp => {
    //   if (passSaved.toString() === resp) {
    //     localStorage.setItem('Password is the same. ', 'Yass!');
    //     this.redirectForm();
    //   } else {
    //     localStorage.setItem('Password Not the same ', 'No!');
    //     this.redirectForm();
    //     this.dialogRef.close();
    //   }
    // });
  }

  redirectForm() {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = this.data.appUrl;
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

  }

  setDataInLocalStorage() {
    localStorage.setItem('ClickedApp', this.data.appid);
    localStorage.setItem('ClickedUrl', this.data.appUrl);
    localStorage.setItem('applicationImage', this.data.appImageUrl);
    // const newuserdet = JSON.parse(this.data.userdetails);
    // console.log(this.data.appUrl, this.data.appid, newuserdet.username, newuserdet.password);
    // localStorage.setItem('uid', newuserdet.username);
    // localStorage.setItem('upass', newuserdet.password);
    // localStorage.setItem('ucode', this.data.appid);

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  // openDialog(): void {
  //   Swal.fire({
  //     title: 'Token Verification Successful',
  //     input: 'password',
  //     inputAttributes: {
  //       autocapitalize: 'off'
  //     },
  //     showCancelButton: true,
  //     confirmButtonText: 'Submit',
  //     showLoaderOnConfirm: true,
  // preConfirm: (login) => {
  //   this.userserv.validateWithToken(login).subscribe((a: ValidateUserWithToken) => {
  //     a ? this.router.navigate(['/home']) : swal('Oops! ', 'An error occured. Contact support!', 'error');
  //   });

  //   return fetch(`//api.github.com/users/${login}`)
  //     .then(response => {
  //       if (!response.ok) {
  //         throw new Error(response.statusText);
  //       }
  //       return response.json();
  //     })
  //     .catch(error => {
  //       Swal.showValidationMessage(
  //         `Request failed: ${error}`
  //       );
  //     });
  // },
  // allowOutsideClick: () => !Swal.isLoading()
  // });
  // }).then((result) => {
  //   if (result.value) {
  //     Swal.fire({
  //       title: `${result.value.login}'s avatar`,
  //       imageUrl: result.value.avatar_url
  //     });
  //   }
  // });

  // }

}

