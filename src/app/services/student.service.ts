import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPath } from '../../shared/constants/api-path';
import { IStudent } from '../../shared/interfaces/iStudent';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  constructor(private http: HttpClient) { }

  // Get all pupils
  getAllStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(ApiPath.pupils);
  }

  // Get pupil by user ID
  getStudentByUserId(userId: string): Observable<IStudent> {
    return this.http.get<IStudent>(`${ApiPath.pupils}/student`, {
      params: { userId }
    });
  }

  // Create a new pupil
  createStudent(studentData: Partial<IStudent>): Observable<IStudent> {
    return this.http.post<IStudent>(ApiPath.pupils, studentData);
  }

  // Update pupil information
  updateStudent(id: string, studentData: Partial<IStudent>): Observable<IStudent> {
    return this.http.put<IStudent>(`${ApiPath.pupils}/${id}`, studentData);
  }

  // Delete a pupil
  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${ApiPath.pupils}/${id}`);
  }
}
