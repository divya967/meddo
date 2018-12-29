import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppMaterialModule} from './material-module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatNativeDateModule, MatInputModule} from '@angular/material';

import { AppComponent } from './app.component';
import { DiagnosticFormComponent } from './diagnosticForm.component';
import { ParseDataComponent } from './parseData.component';

@NgModule({
  declarations: [
    AppComponent,
    DiagnosticFormComponent, ParseDataComponent
  ],
  entryComponents: [DiagnosticFormComponent, ParseDataComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppMaterialModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [DiagnosticFormComponent]
})
export class AppModule { }
