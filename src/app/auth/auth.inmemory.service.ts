import { Injectable } from '@angular/core';
import { sign } from 'fake-jwt-sign';
import { Observable, of, throwError } from 'rxjs';

import { PhoneType, User } from '../user/user/user';
import { Role } from './auth.enum';
import { AuthService, IAuthStatus, IServerAuthResponse } from './auth.service';

@Injectable()
export class InMemoryAuthService extends AuthService {
  private defaultUser = User.Build({
    _id: '5da01751da27cc462d265913',
    email: 'candiawoods@gmail.com',
    name: { first: 'John', last: 'Cassidy' },
    picture:
      'https://en.gravatar.com/userimage/182109022/4ae95ba92ab0ab36217456b342d64b16.jpeg',
    role: Role.Manager,
    dateOfBirth: new Date(1980, 1, 1),
    userStatus: true,
    address: {
      line1: '1 Oxford St.',
      city: 'Cambridge',
      state: 'Massachusetts',
      zip: '02138',
    },
    level: 2,
    phones: [
      {
        id: 0,
        type: PhoneType.Mobile,
        digits: '5555551212',
      },
    ],
  });

  protected authProvider(
    email: string,
    password: string
  ): Observable<IServerAuthResponse> {
    email = email.toLowerCase();

    if (!email.endsWith('@test.com')) {
      return throwError('Faled to login! Email needs to end with @test.com.');
    }

    const authStatus = {
      isAuthenticated: true,
      userId: this.defaultUser._id,
      userRole: email.includes('cashier')
        ? Role.Cashier
        : email.includes('clerk')
        ? Role.Clerk
        : email.includes('manager')
        ? Role.Manager
        : Role.None,
    } as IAuthStatus;

    this.defaultUser.role = authStatus.userRole;

    const authResponse = {
      accessToken: sign(authStatus, 'secret', {
        expiresIn: '1h',
        algorithm: 'none',
      }),
    } as IServerAuthResponse;

    return of(authResponse);
  }
  protected transformJwtToken(token: IAuthStatus): IAuthStatus {
    return token;
  }
  protected getCurrentUser(): Observable<User> {
    return of(this.defaultUser);
  }
  constructor() {
    super();
    console.warn(
      "You're using the InMemoryAuthService. Do not use this service in production."
    );
  }
}
