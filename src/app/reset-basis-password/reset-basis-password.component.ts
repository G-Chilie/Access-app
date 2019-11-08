import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ResetPasswordStatus } from '../_model/user';
// import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { catchError } from 'rxjs/operators';
import { UtilityService } from '../utility.service';

@Component({
  selector: 'app-reset-basis-password',
  templateUrl: './reset-basis-password.component.html',
  styleUrls: ['./reset-basis-password.component.css']
})
export class ResetBasisPasswordComponent implements OnInit {
  closeResult: string;
  loginForm: FormGroup;
  password: any;
  loading = false;
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder,
    private userServ: UserService,
    private util: UtilityService) { }

  ngOnInit() {
  }

  submitRequest(passwords) {
    // this.userServ.resetBasisPassword(this.password);
    if (passwords.password1 = passwords.password2) {
      const password = passwords.password1;
      console.log(password);
    } else {
      catchError(this.util.handleError);
    }
    setTimeout(() => {
      this.loading = false;
    }, 3000);
    const userDetails: any = {
      password: this.password
      // NewPassword: this.password.value
    };
    console.log('USERDET' + JSON.stringify(userDetails));
    this.userServ.resetBasisPassword(userDetails).subscribe((a: ResetPasswordStatus) => {
      console.log(a);
    });
  }

}
