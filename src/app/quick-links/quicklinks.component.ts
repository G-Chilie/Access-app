import { Component, OnInit } from '@angular/core';
import { ResetBasisPasswordComponent } from '../reset-basis-password/reset-basis-password.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { windowTime } from 'rxjs/operators';
import { Response } from 'selenium-webdriver/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quicklinks',
  templateUrl: './quicklinks.component.html',
  styleUrls: ['./quicklinks.component.css']
})
export class QuicklinksComponent implements OnInit {
status: any;
  constructor(
    private router: Router,
    private notifier: NotificationModalComponent,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
    ) {}

  ngOnInit() {
    this.status = 'quickLinks';
  }

  verifyToken() {
    this.router.navigate(['/token-validation']);
  }

  open(status: any) {
    this.status = status;
  }

  closeModal() {
    this.activeModal.close('Modal Closed');
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
