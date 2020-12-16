import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { OnCallComponent } from './components/on-call/on-call.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'on-call', component: OnCallComponent
      }
    ]
  }
];

@NgModule({
  declarations: [AdminComponent, OnCallComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
