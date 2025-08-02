import {Injectable} from '@angular/core';
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs';
import {IRegisterUser} from '../../shared/interfaces/iRegister-user';
import {HttpClient} from '@angular/common/http';
import {ApiPath} from '../../shared/constants/api-path';
import {environment} from '../../enviroments/environment';
import {IResponse} from '../../shared/interfaces/iResponse';
import {Router} from '@angular/router';
import {ICurrentUser} from '../../shared/interfaces/iCurrent-user';

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
    this._currentUser = value;
  }

  constructor(private http: HttpClient,
              private router: Router,) {
  }

  register(user: IRegisterUser): Observable<IResponse> {
   user.clientUrl = window.location.origin + ApiPath.authenticate

    return this.http.post(ApiPath.auth+ApiPath.register, user).pipe(
      map(res=>{
        return {success: true, message: 'SUCCESSFULLY_REGISTERED'};
      }),
      catchError(error => {
        return of({success: false, message: 'ERROR_TRY_AGAIN'});
      })
    )
  }

  login(login: { email: string, password: string }): Observable<{ success: boolean }> {
    const body = {
      EmailPhone: login.email,
      Password: login.password
    }
    return this.http.post<ICurrentUser>(ApiPath.auth+ApiPath.authenticate, body, {withCredentials: true}).pipe(
      map((user) => {
        this._currentUser = user;
        this.isLoggedIn$.next(true);
        return {success: true};
      }),
      catchError(error => {
        return of({success: false});
      })
    )
  }

  forgotPassword(email: string): Observable<IResponse> {
    const url = window.location.origin + ApiPath.reset_password
    const body = {
      Email: email,
      ClientUrl: url};
    return this.http.post<IResponse>(ApiPath.auth+ApiPath.forgot_password, body).pipe(
      catchError(error => {
        return of({success: false, message: 'ERROR_TRY_AGAIN'});
      })
    )
  }

  resetPassword(email?: string, token?: string, password?: string, confirmPassword?: string): Observable<IResponse> {
    if(!email || !password || !confirmPassword || !password) {
      return of({success: false, message: 'ERROR_TRY_AGAIN'});
    }
    const body = {
      password, confirmPassword, email, token
    }
    return this.http.post<IResponse>(ApiPath.auth+ApiPath.reset_password, body, {withCredentials: true}).pipe(
      catchError(error => {
        return of({success: false, message: 'ERROR_TRY_AGAIN'});
      })
    )
  }

  confirmEmail(email: string, token: string): Observable<IResponse> {
    return this.http.get<IResponse>(ApiPath.auth + ApiPath.confirm_email, {
      params: { email, token }
    }).pipe(catchError(error => {
      return of({success: false, message: 'ERROR_TRY_AGAIN'});
    }));
  }


  logout() {
    this.http
      .post<ICurrentUser>(ApiPath.auth+ApiPath.logout, {})
      .subscribe((res) => {
        this.clearSession();
        this.isLoggedIn$.next(false);
      });
  }

  private clearSession(): void {
    localStorage.removeItem(this.userStorageKey);
    this.isLoggedIn$.next(false);
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem(this.userStorageKey);
    if (storedUser) {
      this._currentUser = JSON.parse(storedUser);
      this.isLoggedIn$.next(true);
    }
  }

  //TMP
  switchRole(role: 'admin' | 'teacher' | 'pupil'): void {
    const currentUser = this.currentUser;
    if (currentUser) {
      const mockUsers = {
        admin: {
          ...currentUser,
          role: 'admin',
          name: 'Admin User',
          email: 'admin@platform.com'
        },
        teacher: {
          ...currentUser,
          role: 'teacher',
          name: 'John Smith',
          email: 'john@platform.com'
        },
        pupil: {
          ...currentUser,
          role: 'pupil',
          name: 'Sarah Johnson',
          email: 'sarah@platform.com'
        }
      };
      this.currentUser = (mockUsers[role]);
    }
  }
}
