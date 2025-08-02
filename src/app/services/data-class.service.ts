import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {ApiPath} from '../../shared/constants/api-path';
import {HttpClient} from '@angular/common/http';
import {IClassDetails} from '../../shared/interfaces/iClass-details';
import {formatDateTime} from '../../shared/functions/functions';

@Injectable({
  providedIn: 'root'
})
export class DataClassService {
  private http = inject(HttpClient);

  getAllClasses(): Observable<IClassDetails[] | null> {
    return this.http.get<IClassDetails[]>(ApiPath.classes).pipe(
      map(classes => {
        return classes.map(item => {
          return {
            ...item,
            startTime: formatDateTime(item.startTime)
          };
        });
      }),
      catchError(err => {
        console.error('Error fetching users', err);
        return of(null)
      })
    )
  }
}
