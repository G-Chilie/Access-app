import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { UtilityService } from '../utility.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { KillMyIDStatus } from '../_model/user';
import swal from 'sweetalert';

@Component({
  selector: 'app-kill-my-id',
  templateUrl: './kill-my-id.component.html',
  styleUrls: ['./kill-my-id.component.css']
})
export class KillMyIdComponent implements OnInit {
  closeResult: string;
  Password1: string;
  UserName: string;
  myForm2: FormGroup;
  password: FormControl;
  loading = false;
  constructor(private modalService: NgbModal, private userser: UserService, private formBuilder: FormBuilder,
    private userServ: UserService,
    private util: UtilityService) { }

  ngOnInit() {
    this.createLoginForm();
  }

  public createLoginForm() {
    this.myForm2 = this.formBuilder.group({
      UserName: ['', Validators.required],
      // Password2: ['', Validators.required]
    });
    // this.modals.pop();
  }

  submitRequest() {
    this.loading = true;
    // this.loginError = null;
    const logidet = this.myForm2.value;
    setTimeout(() => {
      this.loading = false;
      localStorage.setItem('New Password Details:', JSON.stringify(this.myForm2.value));
      console.log(logidet);
      // alert('Logging in....');
    }, 2000);
    const userDetails: any = {
      UserName: logidet.UserName
      // NewPassword: this.password.value
    };
    console.log('Password Details:' + JSON.stringify(userDetails.UserName));
    this.userser.killMyID(userDetails).subscribe((a: KillMyIDStatus) => {
      a ?  console.log(a) : swal('Oops!', a.ResponseDescription, 'error');

    });
  }

  Back() {
    window.location.reload();
  }
}
