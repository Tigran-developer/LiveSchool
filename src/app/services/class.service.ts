import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPath } from '../../shared/constants/api-path';
import { IClassDetails } from '../../shared/interfaces/iClass-details';
import { IClass, ICreateClassRequest, IUpdateClassRequest, IBookClassRequest } from '../../shared/interfaces/iClass';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  constructor(private http: HttpClient) { }

  // Get available classes for a student
  /*getBrowseClasses(userId: string): Observable<IClassDetails[]> {
    return this.http.get<IClassDetails[]>(`${ApiPath.classes}${ApiPath.browse_classes_endpoint}`, {
      params: { userId }
    });
  }

  // Get classes enrolled by a student
  getBookedClasses(studentId: string): Observable<IClassDetails[]> {
    return this.http.get<IClassDetails[]>(`${ApiPath.classes}${ApiPath.booked_classes_endpoint}`, {
      params: { studentId }
    });
  }

  // Get class details by ID
  getClassById(id: string): Observable<IClassDetails> {
    return this.http.get<IClassDetails>(`${ApiPath.classes}${ApiPath.class_details}/${id}`);
  }

  // Create a new class
  createClass(classData: ICreateClassRequest): Observable<IClass> {
    return this.http.post<IClass>(`${ApiPath.classes}${ApiPath.add_class}`, classData);
  }

  // Update class information
  updateClass(id: string, classData: IUpdateClassRequest): Observable<IClass> {
    return this.http.put<IClass>(`${ApiPath.classes}/${id}`, classData);
  }

  // Delete a class (soft delete)
  deleteClass(id: string): Observable<any> {
    return this.http.delete(`${ApiPath.classes}/${id}`);
  }

  // Book a class for a student
  bookClass(bookData: IBookClassRequest): Observable<any> {
    return this.http.post(`${ApiPath.classes}${ApiPath.book_class_endpoint}`, bookData);
  }

  // Get all classes (for admin/teacher management)
  getAllClasses(): Observable<IClass[]> {
    return this.http.get<IClass[]>(ApiPath.classes);
  }*/
}
