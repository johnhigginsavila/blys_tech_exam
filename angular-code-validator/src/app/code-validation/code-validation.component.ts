import { AuthService } from './../core/services/auth.service';
// tslint:disable:ban-types
import { Component, OnInit, OnChanges, DoCheck, Input, Output, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-code-validation',
  templateUrl: './code-validation.component.html',
  styleUrls: ['./code-validation.component.scss']
})

export class CodeValidationComponent implements OnInit {
  verificationForm: FormGroup;
  onSubmit = false;
  errorAlert = false;
  errorText = '';
  @ViewChild('digit0') digit0El: ElementRef;
  @ViewChild('digit1') digit1El: ElementRef;
  @ViewChild('digit2') digit2El: ElementRef;
  @ViewChild('digit3') digit3El: ElementRef;
  @ViewChild('digit4') digit4El: ElementRef;
  @ViewChild('digit5') digit5El: ElementRef;
  @ViewChild('submit') submitEl: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this._loadForm();
  }

  _loadForm() {
    this.verificationForm = this.formBuilder.group({
      digit0: ['', Validators.required],
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required]
    });
  }

  _validateNumber(event, num: Number) {
    const key = event.key;
    const numberPat = new RegExp('^[0-9]$');
    if (!numberPat.test(key)) {
      // this._updateValue(num);
      // console.log(this.verificationForm.value);
    } else {
      // event.preventDefault();
    }

  }

  _afterPress(event, next: Number) {
    const key = event.key;
    const numberPat = new RegExp('^[0-9]$');
    if (numberPat.test(key)) {
      this._goTo(next);
    } else {
      this._updateValue(next);
    }
  }

  _goTo(next: Number) {
    switch (next) {
      case 0:
        this.digit1El.nativeElement.focus();
        break;
      case 1:
        this.digit2El.nativeElement.focus();
        break;
      case 2:
        this.digit3El.nativeElement.focus();
        break;
      case 3:
        this.digit4El.nativeElement.focus();
        break;
      case 4:
        this.digit5El.nativeElement.focus();
        break;
      case 5:
        this.submitEl.nativeElement.focus();
        break;
    }
  }

  _updateValue(num: Number, val = null) {
    if (!val) {
      const numberPat = new RegExp('^[0-9]$');
      const prevVal = this.verificationForm.get(`digit${num}`).value;
      val = numberPat.test(prevVal) ? prevVal : '';
    }
    switch (num) {
      case 0:
        this.verificationForm.get('digit0').setValue(val);
        this.digit0El.nativeElement.value = val;
        break;
      case 1:
        this.verificationForm.get('digit1').setValue(val);
        this.digit1El.nativeElement.value = val;
        break;
      case 2:
        this.verificationForm.get('digit2').setValue(val);
        this.digit2El.nativeElement.value = val;
        break;
      case 3:
        this.verificationForm.get('digit3').setValue(val);
        this.digit3El.nativeElement.value = val;
        break;
      case 4:
        this.verificationForm.get('digit4').setValue(val);
        this.digit4El.nativeElement.value = val;
        break;
      case 5:
        this.verificationForm.get('digit5').setValue(val);
        this.digit5El.nativeElement.value = val;
        break;
    }
  }

  onPaste(event) {
    const textFromClipboard = event.clipboardData.getData('text');
    let num = 0;
    const numberPat = new RegExp('^[0-9]$');
    textFromClipboard.split('').forEach((val) => {
      if (num >= 5) {
        return;
      }
      if (numberPat.test(val)) {
        this._updateValue(num, val);
        num++;
      }
    });
  }

  sendCode() {
    this.onSubmit = true;
    const code = Object.values(this.verificationForm.value).join('');
    if (this.verificationForm.valid) {
      return this.auth.validateCode(code)
        .subscribe(
          (response) => {
            if (response && response.success) {
              this.router.navigate(['verified']);
            }
          },
          (error) => {
            console.log(error);
            let message = 'An error occured while processing request.';
            if (error && error._body) {
              try {
                const err = JSON.parse(error._body);
                message = err && err.message || message;
              } catch (e) {
                // ignore error
              }
            }
            this.errorAlert = true;
            this.errorText = message;
          }
        );
    }
  }

  get formControl() {
    return this.verificationForm.controls;
  }
}
