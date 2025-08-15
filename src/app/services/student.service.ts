import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {IStudent} from '../../shared/interfaces/iStudent';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ApiPath} from '../../shared/constants/api-path';
import {ParamKeys} from '../../shared/constants/param-keys';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudentByUserId(userId : string): Observable<IStudent | null> {
    const params = new HttpParams().set(ParamKeys.userId, userId);
    return this.http.get<IStudent>(ApiPath.pupils+ApiPath.student, { params }).pipe(
      catchError(err => {
        console.error('Error fetching classes for student with id => ', userId, err);
        return of(null)
      })
    )
  }
}
