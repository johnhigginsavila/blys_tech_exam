import { CodeVerifiedComponent } from './code-verified/code-verified.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CodeValidationComponent } from './code-validation/code-validation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  { path: '', component: CodeValidationComponent },
  { path: 'verified', component: CodeVerifiedComponent }
];

@NgModule({
  declarations: [
    CodeValidationComponent,
    CodeVerifiedComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgbAlertModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
