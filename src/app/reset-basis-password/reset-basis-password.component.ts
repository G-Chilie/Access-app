import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ResetPasswordStatus, UserEoneDetails } from '../_model/user';
import swal from 'sweetalert';
import { catchError } from 'rxjs/operators';
import { UtilityService } from '../utility.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-basis-password',
  templateUrl: './reset-basis-password.component.html',
  styleUrls: ['./reset-basis-password.component.css']
})
export class ResetBasisPasswordComponent implements OnInit {
  closeResult: string;
  NewPassword: string;
  passwordvalid = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}';
  myForm: FormGroup;
  password: FormControl;
  // password: FormControl;
  // password: any;
  loading = false;
  constructor(private modalService: NgbModal, private router: Router, private userser: UserService, private formBuilder: FormBuilder,
    private userServ: UserService,
    private util: UtilityService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  public createLoginForm() {
    this.myForm = this.formBuilder.group({
      // tslint:disable-next-line: quotemark
      NewPassword: ['', [Validators.required,
        Validators.pattern(this.passwordvalid),
       Validators.minLength(5)]],
      // tslint:disable-next-line: quotemark
      NewPassword2: ['', [Validators.required,
        Validators.pattern(this.passwordvalid),
      Validators.minLength(5)]]
    });
    // this.modals.pop();
  }

  submitRequest() {
    this.loading = true;
    // this.loginError = null;
    const logidet = this.myForm.value;
    setTimeout(() => {
      this.loading = false;
      localStorage.setItem('New Password Details:', JSON.stringify(this.myForm.value));
      console.log(logidet);
      // alert('Logging in....');
    }, 2000);
    const userDetails: any = {
      NewPassword: logidet.NewPassword,
      // password2: logidet.Password2
      // NewPassword: this.password.value
    };
    if (JSON.stringify(logidet.NewPassword) !== JSON.stringify(logidet.NewPassword2)) {
      swal('Oops!', 'Passwords supplied do not match. Try again!', 'error');
      return;
    }
    console.log('New Password Details:' + JSON.stringify(userDetails.NewPassword));
    this.userser.resetBasisPassword(userDetails).subscribe((a: ResetPasswordStatus) => {
      console.log(a);
    });

  }

  Back() {
    window.location.reload();
  }

}
