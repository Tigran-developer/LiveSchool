import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs';
import {IRegisterUser} from '../../shared/interfaces/iRegister-user';
import {HttpClient} from '@angular/common/http';
import {ApiPath} from '../../shared/constants/api-path';
import {IResponse} from '../../shared/interfaces/iResponse';
import {ICurrentUser} from '../../shared/interfaces/iCurrent-user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userStorageKey = 'currentUser';
  private _currentUser: ICurrentUser | null = null;

  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get currentUser(): ICurrentUser | null {
    if (!this._currentUser) {
      this.loadUserFromStorage();
    }
    return this._currentUser;
  }

  set currentUser(value: ICurrentUser | null) {
    localStorage.setItem(this.userStorageKey, JSON.stringify(value));
    this._currentUser = value;
  }

  constructor(private http: HttpClient, private router: Router) {
  }

  register(user: IRegisterUser): Observable<IResponse> {
    user.clientUrl = window.location.origin + ApiPath.authenticate

    return this.http.post(ApiPath.auth + ApiPath.register, user).pipe(
      map(res => {
        return {success: true, message: 'SUCCESSFULLY_REGISTERED'};
      }),
      catchError(error => {
        return of({success: false, message: 'ERROR_TRY_AGAIN'});
      })
    )
  }

  login(login: { email: string, password: string }): Observable<{ success: boolean, message?: string }> {
    const body = {
      emailPhone: login.email,
      password: login.password
    }
    return this.http.post<ICurrentUser>(ApiPath.auth + ApiPath.authenticate, body, {withCredentials: true}).pipe(
      map((user) => {
        this.currentUser = user;
        this.isLoggedIn$.next(true);
        return {success: true};
      }),
      catchError(res => {
        if (res.error === 'Email not confirmed.') {
          return of({success: false, message: 'CONFIRM_EMAIL'})
        }
        return of({success: false});
      })
    )
  }

  forgotPassword(email: string): Observable<IResponse> {
    const url = window.location.origin + ApiPath.reset_password
    const body = {
      email: email,
      clientUrl: url
    };
    return this.http.post<IResponse>(ApiPath.auth + ApiPath.forgot_password, body).pipe(
      catchError(error => {
        return of({success: false, message: 'ERROR_TRY_AGAIN'});
      })
    )
  }

  resetPassword(email?: string, token?: string, password?: string, confirmPassword?: string): Observable<IResponse> {
    if (!email || !password || !confirmPassword || !password) {
      return of({success: false, message: 'ERROR_TRY_AGAIN'});
    }
    const body = {
      password, confirmPassword, email, token
    }
    return this.http.post<IResponse>(ApiPath.auth + ApiPath.reset_password, body, {withCredentials: true}).pipe(
      catchError(error => {
        return of({success: false, message: 'ERROR_TRY_AGAIN'});
      })
    )
  }

  confirmEmail(email: string, token: string): Observable<IResponse> {
    return this.http.get<IResponse>(ApiPath.auth + ApiPath.confirm_email, {
      params: {email, token}
    }).pipe(catchError(error => {
      return of({success: false, message: 'ERROR_TRY_AGAIN'});
    }));
  }

  logout() {
    this.http
      .post<ICurrentUser>(ApiPath.auth + ApiPath.logout, {})
      .subscribe((res) => {
        this.clearSession();
        this.isLoggedIn$.next(false);
      });
  }

  private clearSession(): void {
    localStorage.removeItem(this.userStorageKey);
    this._currentUser = null;
    this.isLoggedIn$.next(false);
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem(this.userStorageKey);
    if (storedUser) {
      this._currentUser = JSON.parse(storedUser);
      this.isLoggedIn$.next(true);
    }
  }

  // Helper methods for role checking
  hasRole(role: string): boolean {
    return this.currentUser?.roles.includes(role) || false;
  }

  hasAnyRole(roles: string[]): boolean {
    return this.currentUser?.roles.some(role => roles.includes(role)) || false;
  }

  isAdmin(): boolean {
    return this.hasRole('Admin');
  }

  isTeacher(): boolean {
    return this.hasRole('Teacher');
  }

  isStudent(): boolean {
    return this.hasRole('Pupil');
  }

  //TMP - Updated to use new role system
  switchRole(role: 'admin' | 'teacher' | 'pupil'): void {
    const currentUser = this.currentUser;
    if (currentUser) {
      const mockUsers = {
        admin: {
          ...currentUser,
          roles: ['Admin'],
          firstName: 'Admin',
          lastName: 'User'
        },
        teacher: {
          ...currentUser,
          roles: ['Teacher'],
          firstName: 'John',
          lastName: 'Smith'
        },
        pupil: {
          ...currentUser,
          roles: ['Pupil'],
          firstName: 'Sarah',
          lastName: 'Johnson'
        }
      };
      this.currentUser = (mockUsers[role]);
    }
  }
}
