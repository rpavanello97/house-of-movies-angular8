import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'dio-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  title = "Success";
  description = "Your data has been saved successfully";
  btnSuccess = "Ok";
  btnCancel = "Cancel";
  colorBtn = "primary";
  hasCloseBtn = false;

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    // if(this.data) {
    //   this.title = this.data.title || this.title;
    //   this.description = this.data.description || this.description;
    //   this.btnSuccess = this.data.btnSuccess || this.btnSuccess;
    //   this.btnCancel = this.data.btnCancel || this.btnCancel;
    //   this.colorBtn = this.data.colorBtn || this.colorBtn;
    //   this.hasCloseBtn = this.data.hasCloseBtn || this.hasCloseBtn;
    // }
  }

}
