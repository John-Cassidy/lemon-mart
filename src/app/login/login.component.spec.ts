import { ComponentFixture, TestBed } from '@angular/core/testing';

import { commonTestingModules, commonTestingProviders } from '../common/common.testing';
import { FieldErrorModule } from '../user-controls/field-error/field-error.module';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: commonTestingModules.concat([FieldErrorModule]),
      providers: [commonTestingProviders],
      declarations: [LoginComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
