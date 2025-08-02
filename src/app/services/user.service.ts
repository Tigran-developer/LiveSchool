import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {IUser} from '../../shared/interfaces/iUser';
import {ApiPath} from '../../shared/constants/api-path';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<IUser[]| null> {
    return this.http.get<IUser[]>(ApiPath.users).pipe(
      tap(res=>{
        console.log(res)
      }),
      catchError(err=>{
        console.error('Error fetching users', err);
        return of(null)
      })
    )
  }
}
