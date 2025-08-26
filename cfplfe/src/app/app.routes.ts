import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { ExcelUploadComponent } from './component/excel-upload/excel-upload.component';
import { ExcelPreviewComponent } from './component/excel-preview/excel-preview.component';
import { PrepPreviewComponent } from './component/prep-preview/prep-preview.component';



const routes: Routes = [
  { path: 'excel-upload', component: ExcelUploadComponent },
  {
    path: 'preview',
    component: ExcelPreviewComponent,
    children: [
      {
        path: 'prep',
        loadComponent: () =>
          import('./component/prep-preview/prep-preview.component').then(
            (m) => m.PrepPreviewComponent
          ),
      },
      {
        path: 'event',
        loadComponent: () =>
          import('./component/event-preview/event-preview.component').then(
            (m) => m.EventPreviewComponent
          ),
      },
    ],
  },
  {path: 'preview/prep-sample', component: PrepPreviewComponent, pathMatch: 'full' },
];
export { routes };

