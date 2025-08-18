import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ExcelUploadComponent } from './component/excel-upload/excel-upload.component';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([]), // even empty routes are fine
    CommonModule,
    
  ],
})
export class AppModule {}
