import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { IUser } from '../user/user/user';
import { Role } from './auth.enum';

export interface IAuthStatus {
  isAuthenticated: boolean;
  userRole: Role;
  userId: string;
}

export interface IAuthService {
  readonly authStatus$: BehaviorSubject<IAuthStatus>;
  readonly currentUser$: BehaviorSubject<IUser>;
  login(email: string, passwordk: string): Observable<void>;
  logout(clearToken?: boolean): void;
  getToken(): string;
}

@Injectable()
export class AuthService {
  constructor() {}
}
