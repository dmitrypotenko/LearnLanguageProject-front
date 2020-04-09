import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-concession-dialog',
  templateUrl: './concession-dialog.component.html',
  styleUrls: ['./concession-dialog.component.scss']
})
export class ConcessionDialogComponent implements OnInit {

  public dialogRef: MatDialogRef<Boolean>;

  constructor(dialogRef: MatDialogRef<Boolean>) {
    this.dialogRef = dialogRef;
  }

  ngOnInit() {
  }

  yes() {
    this.dialogRef.close(true);
  }

  no() {
    this.dialogRef.close(false);
  }
}
