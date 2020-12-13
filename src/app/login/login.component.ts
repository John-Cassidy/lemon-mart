import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';
import { SubSink } from 'subsink';

import { Role } from '../auth/auth.enum';
import { AuthService } from '../auth/auth.service';
import { UiService } from '../common/ui.service';
import { EmailValidation, PasswordValidation } from '../common/validations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  public loginForm!: FormGroup;
  public loginError = '';
  public redirectUrl!: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.subs.sink = route.paramMap.subscribe(
      (params) => (this.redirectUrl = params.get('redirectUrl') ?? '')
    );
  }

  ngOnInit(): void {
    this.authService.logout();
    this.buildLoginForm();
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  private buildLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation],
    });
  }

  public async login(submittedForm: FormGroup): Promise<void> {
    this.authService
      .login(submittedForm.value.email, submittedForm.value.password)
      .pipe(catchError((err) => (this.loginError = err)));

    this.subs.sink = combineLatest([
      this.authService.authStatus$,
      this.authService.currentUser$,
    ])
      .pipe(
        filter(([authStatus, user]) => authStatus.isAuthenticated && user?._id !== ''),
        tap(([authStatus, user]) => {
          this.uiService.showToast(`Welcome ${user.fullName}! Role: ${user.role}`);
          // this.uiService.showDialog(
          //   `Logged into LemonMart`,
          //   `Welcome ${user.fullName}! <br/> Role: ${user.role}`
          // );
          this.router.navigate([
            this.redirectUrl || this.homeRoutePerRole(user.role as Role),
          ]);
        })
      )
      .subscribe();
  }
  homeRoutePerRole(role: Role): string {
    switch (role) {
      case Role.Cashier:
        return '/pos';
      case Role.Clerk:
        return '/inventory';
      case Role.Manager:
        return '/manager';
      default:
        return '/user/profile';
    }
  }
}
