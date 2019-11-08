import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ResetBasisPasswordComponent } from '../reset-basis-password/reset-basis-password.component';


@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  constructor(private formBuilder: FormBuilder, private userServ: UserService,
    private ResetPass: ResetBasisPasswordComponent) { }

  ngOnInit() {
    this.createLoginForm();
  }
  public createLoginForm() {
    this.loginForm = this.formBuilder.group({
      Password1: ['', Validators.required],
      Password2: ['', Validators.required]
    });
  }


  sendRequest() {
    this.ResetPass.submitRequest(this.loginForm.value);
  }
}
