import {inject, Injectable} from '@angular/core';
import {catchError, EMPTY, map, Observable, of, tap} from 'rxjs';
import {ApiPath} from '../../shared/constants/api-path';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IClassDetails} from '../../shared/interfaces/iClass-details';
import {formatDateTime} from '../../shared/functions/functions';
import {ParamKeys} from '../../shared/constants/param-keys';

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
        console.error('Error fetching classes', err);
        return EMPTY;
      })
    )
  }

  getBookedClasses(studentId: string): Observable<IClassDetails[] | null> {
    const params = new HttpParams().set(ParamKeys.studentId, studentId);
    return this.http.get<IClassDetails[]>(`${ApiPath.classes}${ApiPath.booked_classes}`, { params }).pipe(
      map(classes => {
        return classes.map(item => {
          return {
            ...item,
            startTime: formatDateTime(item.startTime)
          };
        });
      }),
      catchError(err => {
        console.error('Error fetching classes for student with id => ', studentId, err);
        return EMPTY;
      })
    )
  }
}
