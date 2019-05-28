import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-openurl',
  templateUrl: './openurl.component.html',
  styleUrls: ['./openurl.component.css']
})
export class OpenurlComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      // Put user code to initialize the page here
      // const role_str: string[];
      // const enableTokenValidation = '1';
      // const role_chk = false;
      // const str: string;
      // let dec_str: string;
      // let qrystr: string;
      // let days: number;
      // // if (!IsPostBack) {
      //     if (((Session("uid") == null)
      //                 || ((Session("upass") == null)
      //                 || (Session("ucode") == null)))) {
      //         btn_continue.Enabled = false;
      // tslint:disable-next-line:max-line-length
      //         lit_message.Text = "<marquee behavior='slide' direction='left' truespeed='true' style='FONT-WEIGHT: bold; FONT-SIZE: medium; TEXT-TRANSFORM: capitalize; COLOR: red; FONT-STYLE: italic'>Error openeing this page. Please login from Eone Access Manager</marquee>";
      //     }
      //     else {
      //         hid_id.Value = Session("uid");
      //         hid_pass.Value = Session("upass");
      //         hid_code.Value = Session("ucode");
      //         lbl_userid.Text = Session("muserid");
      //         btn_continue.Enabled = true;
      //         lit_message.Text = "";
      //         let bu: ebankutil = new ebankutil();
      //         let logonconn: SqlClient.SqlConnection = new SqlClient.SqlConnection(bu.getSQLConnStr2);
      //         let cmdselect1: SqlClient.SqlCommand = new SqlClient.SqlCommand();
      //         let eone_com: SqlClient.SqlCommand;
      //         let eone_reader: SqlClient.SqlDataReader;
      //         try {
      //             let myremotepost: RemotePost = new RemotePost();
      //             myremotepost.Url = Session("url");
      //             myremotepost.Add("uid", Session("uid"));
      //             myremotepost.Add("upass", Session("upass"));
      //             myremotepost.Add("ucode", Session("ucode"));
      //             myremotepost.Add("uip", Session("userip"));
      //             myremotepost.Post();
      //             Session.Clear();
      //             Session.Abandon();
      //         }
      //         catch (ex /*:Exception*/) {
      //             days = 0;
      //             ErrHandler.WriteError(("Error contacting token server ==> " + ex.Message));
      //         }

  //         }

  //     }

  // }
  }

}
