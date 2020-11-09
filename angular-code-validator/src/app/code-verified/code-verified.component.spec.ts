import { CodeVerifiedComponent } from './code-verified.component';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

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
        CodeVerifiedComponent
      ]
    });
  }));

  it('should create the component', () => {
    const fixture = TestBed.createComponent(CodeVerifiedComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should contain \'Code Verified!\' as title', () => {
    const fixture = TestBed.createComponent(CodeVerifiedComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.verification h1').textContent).toContain('Code Verified!');
  });
});
