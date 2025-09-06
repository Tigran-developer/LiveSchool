import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiPath } from '../../shared/constants/api-path';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private http: HttpClient) { }

  // Get total numbers for dashboard
  getTotalNumbers(): Observable<any> {
    return this.http.get(`${ApiPath.subscription}${ApiPath.total_numbers}`);
  }

  // Get subscription information
  getSubscriptionInfo(): Observable<any> {
    return this.http.get(ApiPath.subscription);
  }
}
