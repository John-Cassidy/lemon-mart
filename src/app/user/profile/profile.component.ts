import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { Role } from 'src/app/auth/auth.enum';
import { AuthService } from 'src/app/auth/auth.service';
import {
  EmailValidation,
  OneCharValidation,
  OptionalTextValidation,
  RequiredTextValidation,
  USAPhoneNumberValidation,
  USAZipCodeValidation,
} from 'src/app/common/validations';
import { $enum } from 'ts-enum-util';

import { ErrorSets } from '../../user-controls/field-error/field-error.directive';
import { IPhone, IUser, PhoneType } from '../user/user';
import { IUSState, USStateFilter } from './data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  Role = Role;
  PhoneType = PhoneType;
  PhoneTypes = $enum(PhoneType).getKeys();
  formGroup!: FormGroup;
  states$: Observable<IUSState[]> | undefined;
  userError = '';
  currentUserId: string | undefined;
  ErrorSets = ErrorSets;

  constructor(
    private formBuilder: FormBuilder,
    // private uiService: UiService,
    // private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.authService.currentUser$
      .pipe(
        filter((user) => user !== null),
        tap((user) => {
          this.currentUserId = user._id;
          this.buildForm(user);
        })
      )
      .subscribe();
  }

  private get currentUserRole(): Role {
    return this.authService.authStatus$.value?.userRole;
  }

  buildForm(user?: IUser): void {
    this.formGroup = this.formBuilder.group({
      email: [
        {
          value: user?.email || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        EmailValidation,
      ],
      name: this.formBuilder.group({
        first: [user?.name?.first || '', RequiredTextValidation],
        middle: [user?.name?.middle || '', OneCharValidation],
        last: [user?.name?.last || '', RequiredTextValidation],
      }),
      role: [
        {
          value: user?.role || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        [Validators.required],
      ],
      dateOfBirth: [user?.dateOfBirth || '', Validators.required],
      address: this.formBuilder.group({
        line1: [user?.address?.line1 || '', RequiredTextValidation],
        line2: [user?.address?.line2 || '', OptionalTextValidation],
        city: [user?.address?.city || '', RequiredTextValidation],
        state: [user?.address?.city || '', RequiredTextValidation],
        zip: [user?.address?.zip || '', USAZipCodeValidation],
      }),
      phones: this.formBuilder.array(this.buildPhoneArray(user?.phones || [])),
    });

    const state = this.formGroup.get('address.state');

    if (state != null) {
      this.states$ = state.valueChanges.pipe(
        startWith(''),
        map((value) => USStateFilter(value))
      );
    }
  }
  // tslint:disable-next-line: no-any
  buildPhoneArray(phones: IPhone[]): any[] {
    const groups = [];

    if (phones?.length === 0) {
      groups.push(this.buildPhoneFormControl(1));
    } else {
      phones.forEach((p) => {
        groups.push(this.buildPhoneFormControl(p.id, p.type, p.digits));
      });
    }
    return groups;
  }
  // tslint:disable-next-line: no-any
  buildPhoneFormControl(id: number, type?: string, phoneNumber?: string): any {
    return this.formBuilder.group({
      id: [id],
      type: [type || '', Validators.required],
      digits: [phoneNumber || '', USAPhoneNumberValidation],
    });
  }
}
