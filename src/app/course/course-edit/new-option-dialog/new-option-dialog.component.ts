import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-new-option-dialog',
  templateUrl: './new-option-dialog.component.html',
  styleUrls: ['./new-option-dialog.component.scss']
})
export class NewOptionDialogComponent implements OnInit {

  public dialogRef: MatDialogRef<String>;
  option: string;

  constructor(dialogRef: MatDialogRef<String>) {
    this.dialogRef = dialogRef;
  }

  ngOnInit() {
  }


  add() {
    this.dialogRef.close(this.option);
  }
}
