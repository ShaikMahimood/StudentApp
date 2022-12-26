import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Student } from '../models/student';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
const baseUrl = `${environment.apiUrl}`;

@Injectable({
    providedIn: 'root'
})

export class StudentApiService {

    constructor(private http: HttpClient) { }

    getAllStudent(): Observable<Student[]> {
        return this.http.get(baseUrl + 'getall').pipe<Student[]>(map((data: any) => data.results));
    }

    getStudent(params: any): Observable<Student[]> {
        return this.http.get(`${baseUrl}get`, params).pipe<Student[]>(map((data: any) => data.results))
    }

    createStudent(params: Student): Observable<Student> {
        console.log("Create", params);
        return this.http.post<Student>(`${baseUrl}insert`, params, { headers: new HttpHeaders().set("Content-Type", "application/json")});
    }

    updateStudent(params: Student): Observable<Student> {
        return this.http.put<Student>(`${baseUrl}update`, params, { headers: new HttpHeaders().set("Content-Type", "application/json")});
    }

    deleteStudent(id: number) {
        return this.http.delete(`${baseUrl}delete?id=${id}`);
    }
}
