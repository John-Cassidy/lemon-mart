import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { Role } from 'src/app/auth/auth.enum';
import { AuthService } from 'src/app/auth/auth.service';
import { UiService } from 'src/app/common/ui.service';
import {
  EmailValidation,
  OneCharValidation,
  OptionalTextValidation,
  RequiredTextValidation,
  USAPhoneNumberValidation,
  USAZipCodeValidation,
} from 'src/app/common/validations';
import { SubSink } from 'subsink';
import { $enum } from 'ts-enum-util';

import { ErrorSets } from '../../user-controls/field-error/field-error.directive';
import { IName, IPhone, IUser, PhoneType } from '../user/user';
import { UserService } from '../user/user.service';
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
  // tslint:disable-next-line: no-any
  initialValues: any;

  states$: Observable<IUSState[]> | undefined;
  userError = '';
  currentUserId!: string;
  ErrorSets = ErrorSets;

  readonly nameInitialData$ = new BehaviorSubject<IName>({
    first: '',
    middle: '',
    last: '',
  });

  private subs = new SubSink();

  now = new Date();
  minDate = new Date(
    this.now.getFullYear() - 100,
    this.now.getMonth(),
    this.now.getDate()
  );

  get dateOfBirth(): Date {
    return this.formGroup.get('dateOfBirth')?.value || this.now;
  }

  get age(): number {
    return this.now.getFullYear() - this.dateOfBirth.getFullYear();
  }

  get phonesArray(): FormArray {
    return this.formGroup.get('phones') as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    private uiservice: UiService,
    private userservice: UserService,
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

  public setForm() {
    this.formGroup.reset(this.initialValues);
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
      phones: this.buildPhoneArray(user?.phones || []),
    });

    const state = this.formGroup.get('address.state');

    if (state != null) {
      this.states$ = state.valueChanges.pipe(
        startWith(''),
        map((value) => USStateFilter(value))
      );
    }

    this.initialValues = this.formGroup.value;
  }

  async save(form: FormGroup): Promise<void> {
    this.subs.add(
      this.userservice.updateUser(this.currentUserId, form.value).subscribe(
        (res: IUser) => {
          this.formGroup.patchValue(res);
          this.uiservice.showToast('Updated user');
        },
        (err: string) => (this.userError = err)
      )
    );
  }

  // tslint:disable-next-line: no-any
  buildPhoneArray(phones: IPhone[]): FormArray {
    const groups: FormArray = this.formBuilder.array([]);

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
  buildPhoneFormControl(id: number, type?: string, phoneNumber?: string): FormGroup {
    return this.formBuilder.group({
      id: [id],
      type: [type || '', Validators.required],
      digits: [phoneNumber || '', USAPhoneNumberValidation],
    });
  }

  addPhone(): void {
    this.phonesArray.push(this.buildPhoneFormControl(this.phonesArray.value.length + 1));
  }

  convertTypeToPhoneType(type: string): PhoneType {
    return PhoneType[$enum(PhoneType).asKeyOrThrow(type)];
  }
}
