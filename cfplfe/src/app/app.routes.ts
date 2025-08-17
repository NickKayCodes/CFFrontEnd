import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ExcelUploadComponent } from '../component/excel-upload/excel-upload.component';

const routes: Routes = [
  { path: 'excel-upload', component: ExcelUploadComponent },
];
export { routes };

