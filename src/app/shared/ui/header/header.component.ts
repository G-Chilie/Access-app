import { Component, OnInit } from '@angular/core';
import * as JsEncryptModule from 'jsencrypt';
import { environment } from '../../../../environments/environment';
import { UserService } from '../../../_services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  fullName: any;
  picture: any;
  branchname: any;
  lastlogindate: any;
  constructor(private userserv: UserService) { }

  ngOnInit() {
    this.fullName = this.userserv.User;
    this.picture = this.userserv.userPicture;
    this.branchname = this.userserv.userBranch;
    this.lastlogindate = this.userserv.UserLastLoginDate;
    console.log(this.fullName);

  }

  extEncrypt(data) {
    // console.log('encrypting: ' + data);
    const encrypt = new JsEncryptModule.JSEncrypt();
    encrypt.setPublicKey(environment.PUB_AM_ENC_KEY);
    const hash = encrypt.encrypt(data);
    return hash;
  }
}
