import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ParseDataComponent } from './parseData.component';


@Component({
  selector: 'diagnostic-form',
  templateUrl: 'diagnosticForm.component.html',
})
export class DiagnosticFormComponent implements OnInit {
  public isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public labs = [
    { label: 'lab 1', value: 1 },
    { label: 'lab 2', value: 2 },
  ];
  public parsedDataCount: string;
  public readonly dataSource: any[] = [
    { dl: '', dlid: '', total: '' }
  ];
  public readonly resultHeaders = [
    { label: 'Diagnostic Lab', key: 'dl' },
    { label: 'Diagnostic Lab ID', key: 'dlid' },
    { label: 'Total Diagnostic types', key: 'total' },
  ]
  public readonly cols = ['dl', 'dlid', 'total'];

  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      diagnosticLabVal: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      chooseFile: ['', Validators.required]
    });
    this.firstFormGroup.controls.diagnosticLabVal.valueChanges.subscribe(selectedLab => {
      this.onSelectLabId(this.labs.find(obj => selectedLab === obj.value));
    })

  }

  public onChooseFile(event) {
    this.secondFormGroup.controls.chooseFile.setValue(event.target.files[0].name);
  }

  public onUpload(fileToUpload: HTMLInputElement) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.onFileLoad(fileReader.result as string);
    }
    fileReader.readAsText(fileToUpload.files[0]);

  }

  private onSelectLabId(sel) {
    this.dataSource[0].dl = sel.label;
    this.dataSource[0].dlid = sel.value;
  }

  private onFileLoad(data: string) {
    const dialogRef = this.dialog.open(ParseDataComponent, {
      width: '1000px',
      data
    })
    dialogRef.afterClosed().subscribe(res => {
      this.parsedDataCount = dialogRef.componentInstance && dialogRef.componentInstance.isConfirmed ? dialogRef.componentInstance.dataSource.length.toString() : '';
      this.dataSource[0].total = this.parsedDataCount;
    });
  }

}