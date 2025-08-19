import {inject, Injectable} from '@angular/core';
import {catchError, EMPTY, map, Observable, of, tap} from 'rxjs';
import {ApiPath} from '../../shared/constants/api-path';
import {HttpClient, HttpParams} from '@angular/common/http';
import {IClassDetails} from '../../shared/interfaces/iClass-details';
import {formatDateTime} from '../../shared/functions/functions';
import {ParamKeys} from '../../shared/constants/param-keys';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataClassService {

  constructor(private http: HttpClient,
              private authService: AuthService) {
  }

  getAllClasses(): Observable<IClassDetails[] | null> {
    const studentId = this.authService.currentUser?.id;
    if (!studentId) {
      return EMPTY;
    }
    const params = new HttpParams().set(ParamKeys.userId, studentId)
    return this.http.get<IClassDetails[]>(ApiPath.classes + ApiPath.browse_classes, {params}).pipe(
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

  bookClass(classId: string): Observable<string | null> {
    const studentId = this.authService.currentUser?.id;
    if (!studentId) {
      return EMPTY;
    }
    const body = {
      classId, studentId,
    }

    return  this.http.post<string>(ApiPath.classes+ApiPath.book_class, body).pipe(
      catchError(err => {
        console.error('Error booking class', err);
        return EMPTY;
      })
    )
  }
}
