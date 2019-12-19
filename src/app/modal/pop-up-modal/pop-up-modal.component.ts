import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/_services/user.service';
import { ValidateUserWithToken } from 'src/app/_model/user';
import { Router } from '@angular/router';
import swal from 'sweetalert';

export interface DialogData {
  animal: string;
  name: string;
}

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'app-pop-up-modal',
  templateUrl: './pop-up-modal.component.html',
  styleUrls: ['./pop-up-modal.component.css']
})
// tslint:disable-next-line: component-class-suffix
export class PopUpModalComponent {
  userName = localStorage.getItem('username');
  passWord = localStorage.getItem('password');
  ucode = localStorage.getItem('UserKey');
  loading = false;
  // tslint:disable-next-line: max-line-length
  appUrl = 'http://10.0.6.78:8888/forms/frmservlet?config=ref&serveruserparams=NLS_LANG=AMERICAN_AMERICA.AR8MSWIN1256&otherparams=P_WST_LAN_IND=1';

  constructor(public router: Router, public userserv: UserService, public dialog: MatDialog) {}

  openDialog(): void {
    Swal.fire({
      title: 'Token Verification Successful',
      input: 'password',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
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
    });
    // }).then((result) => {
    //   if (result.value) {
    //     Swal.fire({
    //       title: `${result.value.login}'s avatar`,
    //       imageUrl: result.value.avatar_url
    //     });
    //   }
    // });

  }

}

