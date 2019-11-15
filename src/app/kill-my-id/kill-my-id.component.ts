import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UtilityService } from '../utility.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KillMyIDStatus } from '../_model/user';


@Component({
  selector: 'app-kill-my-id',
  templateUrl: './kill-my-id.component.html',
  styleUrls: ['./kill-my-id.component.css']
})
export class KillMyIdComponent implements OnInit {
  closeResult: string;
  myForm: FormGroup;
  password: FormControl;
  loading = false;
  constructor(private modalService: NgbModal, private userser: UserService, private formBuilder: FormBuilder,
    private userServ: UserService,
    private util: UtilityService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  public createLoginForm() {
    this.myForm = this.formBuilder.group({
      Password1: ['', Validators.required],
      Password2: ['', Validators.required]
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
      password1: logidet.Password1,
      password2: logidet.Password2
      // NewPassword: this.password.value
    };
    console.log('New Password Details:' + JSON.stringify(userDetails.password2));
    this.userser.resetBasisPassword(userDetails.password2).subscribe((a: KillMyIDStatus) => {
      console.log(a);
    });
  }
}
