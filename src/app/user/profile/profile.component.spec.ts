import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  ObservablePropertyStrategy,
  autoSpyObj,
  injectSpy,
} from 'angular-unit-test-helper';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { AuthService, defaultAuthStatus } from 'src/app/auth/auth.service';

import {
  commonTestingModules,
  commonTestingProviders,
} from '../../common/common.testing';
import { FieldErrorModule } from '../../user-controls/field-error/field-error.module';
import { NameInputComponent } from '../name-input/name-input.component';
import { UserMaterialModule } from '../user-material.module';
import { User } from '../user/user';
import { ViewUserComponent } from '../view-user/view-user.component';
import { ProfileComponent } from './profile.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {
  showMaskTyped: true,
};

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authServiceMock: jasmine.SpyObj<AuthService>;

  beforeEach(
    waitForAsync(() => {
      const authServiceSpy = autoSpyObj(
        AuthService,
        ['currentUser$', 'authStatus$'],
        ObservablePropertyStrategy.BehaviorSubject
      );

      TestBed.configureTestingModule({
        providers: commonTestingProviders.concat({
          provide: AuthService,
          useValue: authServiceSpy,
        }),
        imports: commonTestingModules.concat([
          UserMaterialModule,
          FieldErrorModule,
          NgxMaskModule.forRoot(options),
        ]),
        declarations: [ProfileComponent, NameInputComponent, ViewUserComponent],
      }).compileComponents();

      authServiceMock = injectSpy(AuthService);

      fixture = TestBed.createComponent(ProfileComponent);
      component = fixture.debugElement.componentInstance;
    })
  );

  it('should create', () => {
    authServiceMock.currentUser$.next(new User());
    authServiceMock.authStatus$.next(defaultAuthStatus);

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
