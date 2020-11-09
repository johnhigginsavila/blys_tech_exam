// tslint:disable:no-string-literal
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CodeValidationComponent } from './code-validation.component';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('CodeValidationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        HttpModule
      ],
      declarations: [
        CodeValidationComponent
      ]
    });
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CodeValidationComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain \'Verification code:\' as title', () => {
    const fixture = TestBed.createComponent(CodeValidationComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.verification h1').textContent).toContain('Verification code:');
  });

  it('form should be valid', () => {
    const fixture = TestBed.createComponent(CodeValidationComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.verificationForm.controls['digit0'].setValue(1);
    app.verificationForm.controls['digit1'].setValue(1);
    app.verificationForm.controls['digit2'].setValue(1);
    app.verificationForm.controls['digit3'].setValue(1);
    app.verificationForm.controls['digit4'].setValue(1);
    app.verificationForm.controls['digit5'].setValue(1);
    expect(app.verificationForm.valid).toBeTruthy();
  });

  it('form should not accept non numeric char be valid', () => {
    const fixture = TestBed.createComponent(CodeValidationComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    app.verificationForm.controls['digit0'].setValue('a');
    app.verificationForm.controls['digit1'].setValue('a');
    app.verificationForm.controls['digit2'].setValue('a');
    app.verificationForm.controls['digit3'].setValue('a');
    app.verificationForm.controls['digit4'].setValue('a');
    app.verificationForm.controls['digit5'].setValue('a');
    expect(app.verificationForm.valid).not.toBeTruthy();
  });

  it('form should be invalid', () => {
    const fixture = TestBed.createComponent(CodeValidationComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.verificationForm.valid).not.toBeTruthy();
  });

  it('should call sendCode method when button is clicked', async () => {
    const fixture = TestBed.createComponent(CodeValidationComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    spyOn(app, 'sendCode');
    const el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(app.sendCode).toHaveBeenCalled();
  });

  it('inputs should be highlighted in red when submit is pressed', async () => {
    const fixture = TestBed.createComponent(CodeValidationComponent);
    const compiled = fixture.nativeElement;
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const el = fixture.debugElement.query(By.css('button')).nativeElement;
    await el.click();
    fixture.detectChanges();
    const input0 = compiled.querySelector('.is-invalid');
    expect(input0).not.toBeNull();
  });
});
