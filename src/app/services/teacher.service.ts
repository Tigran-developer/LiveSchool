import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPath } from '../../shared/constants/api-path';
import { ITeacher } from '../../shared/interfaces/iTeacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  constructor(private http: HttpClient) { }

  // Get all teachers
  getAllTeachers(): Observable<ITeacher[]> {
    return this.http.get<ITeacher[]>(ApiPath.teachers);
  }

  // Get teacher by ID
  getTeacherById(id: string): Observable<ITeacher> {
    return this.http.get<ITeacher>(`${ApiPath.teachers}/${id}`);
  }

  // Create a new teacher
  createTeacher(teacherData: Partial<ITeacher>): Observable<ITeacher> {
    return this.http.post<ITeacher>(ApiPath.teachers, teacherData);
  }

  // Update teacher information
  updateTeacher(id: string, teacherData: Partial<ITeacher>): Observable<ITeacher> {
    return this.http.put<ITeacher>(`${ApiPath.teachers}/${id}`, teacherData);
  }

  // Delete a teacher
  deleteTeacher(id: string): Observable<any> {
    return this.http.delete(`${ApiPath.teachers}/${id}`);
  }
}

