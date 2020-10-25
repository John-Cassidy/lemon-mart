import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InMemoryAuthService } from 'src/app/auth/auth.inmemory.service';
import { AuthService } from 'src/app/auth/auth.service';
import { commonTestingModules } from 'src/app/common/common.testing';

import { LogoutComponent } from './logout.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [commonTestingModules],
      providers: [{ provide: AuthService, useClass: InMemoryAuthService }],
      declarations: [LogoutComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
