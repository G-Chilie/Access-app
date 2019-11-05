import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reset-basis-password',
  templateUrl: './reset-basis-password.component.html',
  styleUrls: ['./reset-basis-password.component.css']
})
export class ResetBasisPasswordComponent implements OnInit {
  closeResult: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }


}
