import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPath } from '../../shared/constants/api-path';
import { IUser } from '../../shared/interfaces/iUser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  // Get all users (Admin only)
  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(ApiPath.users);
  }

  // Get user by ID
  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${ApiPath.users}/${id}`);
  }

  // Create a new user
  createUser(userData: Partial<IUser>): Observable<IUser> {
    return this.http.post<IUser>(ApiPath.users, userData);
  }

  // Update user information
  updateUser(id: string, userData: Partial<IUser>): Observable<IUser> {
    return this.http.put<IUser>(`${ApiPath.users}/${id}`, userData);
  }

  // Delete a user
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${ApiPath.users}/${id}`);
  }

  // Check if email exists (Admin/Teacher only)
/*  checkEmailExists(email: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${ApiPath.auth}${ApiPath.check_email_exist}`, {
      params: { email }
    });
  }*/
}
