import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, SkillData, ExchangeRequest } from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:5000/api';
  constructor(private http: HttpClient) {}
  getStudents(): Observable<Student[]> { return this.http.get<Student[]>(`${this.baseUrl}/students`); }
  addStudent(data: Student): Observable<Student> { return this.http.post<Student>(`${this.baseUrl}/students`, data); }
  updateStudent(id: string, data: Student): Observable<Student> { return this.http.put<Student>(`${this.baseUrl}/students/${id}`, data); }
  deleteStudent(id: string): Observable<{message: string}> { return this.http.delete<{message: string}>(`${this.baseUrl}/students/${id}`); }
  getSkills(): Observable<SkillData[]> { return this.http.get<SkillData[]>(`${this.baseUrl}/skills`); }
  addSkill(data: SkillData): Observable<SkillData> { return this.http.post<SkillData>(`${this.baseUrl}/skills`, data); }
  updateSkill(id: string, data: SkillData): Observable<SkillData> { return this.http.put<SkillData>(`${this.baseUrl}/skills/${id}`, data); }
  deleteSkill(id: string): Observable<{message: string}> { return this.http.delete<{message: string}>(`${this.baseUrl}/skills/${id}`); }
  getRequests(): Observable<ExchangeRequest[]> { return this.http.get<ExchangeRequest[]>(`${this.baseUrl}/requests`); }
  addRequest(data: ExchangeRequest): Observable<ExchangeRequest> { return this.http.post<ExchangeRequest>(`${this.baseUrl}/requests`, data); }
  updateRequest(id: string, data: Partial<ExchangeRequest>): Observable<ExchangeRequest> { return this.http.put<ExchangeRequest>(`${this.baseUrl}/requests/${id}`, data); }
  deleteRequest(id: string): Observable<{message: string}> { return this.http.delete<{message: string}>(`${this.baseUrl}/requests/${id}`); }
}
