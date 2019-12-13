import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ResetPasswordStatus } from '../_model/user';
import swal from 'sweetalert';
import { catchError } from 'rxjs/operators';
import { UtilityService } from '../utility.service';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router, ActivatedRoute } from '@angular/router';
import { FormValidators } from '../Validator/form-validator';
import { PopUpModalComponent } from '../modal/pop-up-modal/pop-up-modal.component';


@Component({
  selector: 'app-reset-basis-password',
  templateUrl: './reset-basis-password.component.html',
  styleUrls: ['./reset-basis-password.component.css']
})
export class ResetBasisPasswordComponent implements OnInit {
  closeResult: string;
  passwordvalid = '([A-Za-z]{4})([0-9]{3})[?=#$%&*^{}]';
  // passwordvalid2 = '([A-Za-z]{4})([0-9]{3})['{}[\]\\;':,.\/?#$%&*^()_+=-]';
  // passwordvalid = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/^['; ',.\/?#$%&*^{}()_+=-]*$/';
  // /^[ A-Za-z0-9_@./#&+-]*$/
  myForm: FormGroup;
  password: FormControl;
  // password: FormControl;
  // password: any;
  loading = false;
  // tslint:disable-next-line: max-line-length
  constructor(private popup: PopUpModalComponent, private modalService: NgbModal, private router: Router, private userser: UserService, private formBuilder: FormBuilder,
    private userServ: UserService,
    private util: UtilityService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  public createLoginForm() {
    this.myForm = this.formBuilder.group({
      // tslint:disable-next-line: quotemark
      // tslint:disable-next-line: max-line-length
      NewPassword: new FormControl('', [Validators.required,
      Validators.pattern(this.passwordvalid)
    ]),
      // tslint:disable-next-line: quotemark
      // tslint:disable-next-line: max-line-length
      NewPassword2: new FormControl('', [Validators.required,
       Validators.pattern(this.passwordvalid)]),

    });
    // this.modals.pop();
  }

  get NewPassword() {
    return this.myForm.get('NewPassword');
  }

  get NewPassword2() {
    return this.myForm.get('NewPassword');
  }

  submitRequest() {
    this.popup.openDialog();
    if (this.myForm.invalid) {
      FormValidators.validateAllFormFields(this.myForm);
      swal('Oops! ', 'Please enter vaild and identical passwords', 'error');
      return;
    }
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
    this.userser.resetBasisPassword(this.myForm.value.NewPassword2).subscribe((a: ResetPasswordStatus) => {
      console.log(a);
    });

  }

  Back() {
    window.location.reload();
  }

}
