import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  fullName: string ;
  picture: any;
  constructor() { }

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('StaffDetails')) ;
   this.fullName = user.FullName;
   this.picture = user.Picture;
   console.log(this.fullName , user.FullName);

  }
}
