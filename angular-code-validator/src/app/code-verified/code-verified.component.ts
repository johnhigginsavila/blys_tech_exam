import { Router } from '@angular/router';
// tslint:disable:ban-types
import { Component, OnInit, OnChanges, DoCheck, Input, Output, ViewChild, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-code-verified',
  templateUrl: './code-verified.component.html',
  styleUrls: ['./code-verified.component.scss', '../code-validation/code-validation.component.scss']
})

export class CodeVerifiedComponent {
  constructor(
    private router: Router
  ) {}

  goBack() {
    this.router.navigate(['']);
  }
}
