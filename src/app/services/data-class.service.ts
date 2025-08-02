import {inject, Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {ApiPath} from '../../shared/constants/api-path';
import {HttpClient} from '@angular/common/http';
import {IClassDetails} from '../../shared/interfaces/iClass-details';

@Injectable({
  providedIn: 'root'
})
export class DataClassService {
  private http = inject(HttpClient);


  getAllClasses(): Observable<IClassDetails[] | null> {
    return this.http.get<IClassDetails[]>(ApiPath.classes).pipe(
      tap(res => {
        return of();
      }),
      catchError(err => {
        console.error('Error fetching users', err);
        return of(null)
      })
    )
  }
}
