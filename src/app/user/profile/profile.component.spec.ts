import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ObservablePropertyStrategy,
  autoSpyObj,
  injectSpy,
} from 'angular-unit-test-helper';
import { AuthService, defaultAuthStatus } from 'src/app/auth/auth.service';

import {
  commonTestingModules,
  commonTestingProviders,
} from '../../common/common.testing';
import { User } from '../user/user';
import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = autoSpyObj(
      AuthService,
      ['currentUser$', 'authStatus$'],
      ObservablePropertyStrategy.BehaviorSubject
    );
    await TestBed.configureTestingModule({
      imports: [commonTestingModules],
      providers: commonTestingProviders.concat({
        provide: AuthService,
        useValue: authServiceSpy,
      }),
      declarations: [ProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    authServiceMock = injectSpy(AuthService);

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    authServiceMock.currentUser$.next(new User());
    authServiceMock.authStatus$.next(defaultAuthStatus);
    expect(component).toBeTruthy();
  });
});
