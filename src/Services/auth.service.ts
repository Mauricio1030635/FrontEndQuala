import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LoginRequest } from '../Models/LoginRequest ';
import { LoginResponse } from '../Models/LoginResponse';
import { RegisterRequest } from '../Models/RegisterRequest';
import { RegisterResponse } from '../Models/RegisterResponse';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    login(data: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/Login`, data);
    }

    register(data: RegisterRequest): Observable<RegisterResponse> {
        return this.http.post<RegisterResponse>(`${this.apiUrl}/Register`, data);
    }
} 