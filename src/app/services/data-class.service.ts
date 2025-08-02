import {inject, Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {ApiPath} from '../../shared/constants/api-path';
import {HttpClient} from '@angular/common/http';
import {IClass} from '../../shared/interfaces/iClass';

@Injectable({
  providedIn: 'root'
})
export class DataClassService {
  private http = inject(HttpClient);


  getAllClasses(): Observable<any | null> {
    return this.http.get<IClass[]>(ApiPath.classes).pipe(
      tap(res => {
        console.log(res);
        return of();
      }),
      catchError(err => {
        console.error('Error fetching users', err);
        return of(null)
      })
    )
  }
}
