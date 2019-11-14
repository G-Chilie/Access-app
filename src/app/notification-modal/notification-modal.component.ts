import { Component, OnInit, Input} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { ResetBasisPasswordComponent } from '../reset-basis-password/reset-basis-password.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})
export class NotificationModalComponent implements OnInit {
  myForm: FormGroup;
  loading = false;
  @Input() id: number;
  private modals: any[] = [];
  constructor(private formBuilder: FormBuilder, public activeModal: NgbActiveModal, private userServ: UserService,
    private ResetPass: ResetBasisPasswordComponent, private modalService: NgbModal) { }

  ngOnInit() {
    this.createLoginForm();
    // const modal: any = this.modals.filter(x => x.id === id)[0];
    // modal.open();
  }
  public createLoginForm() {
    this.myForm = this.formBuilder.group({
      Password1: ['', Validators.required],
      Password2: ['', Validators.required]
    });
    // this.modals.pop();
  }


  submitForm() {
    this.activeModal.close(this.myForm.value);
  }
}
