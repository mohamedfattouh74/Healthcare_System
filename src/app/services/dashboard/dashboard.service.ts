import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}
  baseUrl = 'http://localhost:3000/';

  getUpcomingAppointments() {
    return this.http.get(`${this.baseUrl}dashboard-upcomingAppointments`);
  }

  getTotalRevenue() {
    return this.http.get(`${this.baseUrl}dashboard-totalRevenue`);
  }
  getRebookingRate() {
    return this.http.get(`${this.baseUrl}dashboard-rebookingRate`);
  }
}
