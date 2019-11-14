import { Component, OnInit } from '@angular/core';
import { ResetBasisPasswordComponent } from '../reset-basis-password/reset-basis-password.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quicklinks',
  templateUrl: './quicklinks.component.html',
  styleUrls: ['./quicklinks.component.css']
})
export class QuicklinksComponent implements OnInit {
status: any;
  constructor(
    private notifier: NotificationModalComponent,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
    ) {}

  ngOnInit() {
    this.status = 'quickLinks';
  }

  open(status: any) {
    this.status = status;
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }
}
