import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private apiUrl = 'http://localhost:3000/api'; // The base URL for your backend API

  constructor(private http: HttpClient) {}

  // Login API
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // Signup API
  signup(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  // Get profile API
  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile`);
  }

  // Logout (if backend handles tokens)
  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
