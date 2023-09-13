import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, empty, of } from 'rxjs';
import { Student } from '../interfaces/Student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private apiUrl: string = environment.apiUrl;

  createTeacher(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.apiUrl}/teacher`, formData);
  }
  login(formData: FormData): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/teacher/login`, formData);
  }
  getGlobalRaking(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/grades`);
  }
  getRankingBySchool(school: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/grades/${school}`);
  }
  releaseGrades(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(`${this.apiUrl}/teacher/grades`, formData);
  }
}
