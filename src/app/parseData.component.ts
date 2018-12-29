import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as pparse from 'papaparse';

@Component({
  selector: 'parse-data',
  templateUrl: 'parseData.component.html',
})
export class ParseDataComponent {
  public displayedColumns: string[] = [];
  public headers = [];
  public dataSource = [];
  public isConfirmed = false;

  private splittedData: string[];
  constructor(
    public dialogRef: MatDialogRef<ParseDataComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
  }

  public ngOnInit() {
    this.dataSource = pparse.parse(this.data,{ header: true}).data;
    this.headers = Object.keys(this.dataSource[0]);
  }

  public onCancel(): void {
    this.isConfirmed = false;
    this.dialogRef.close();
  }

}