import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NuevaMonedaDto, NuevaMonedaCreateDto, NuevaMonedaUpdateDto } from '../Models/modelMoneda';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NuevaMonedaService {

    private apiUrl = `${environment.apiUrlNuevaMoneda}`;

    constructor(private http: HttpClient) { }

    private getToken(): HttpHeaders {
        const token = localStorage.getItem('token');
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    getAllMonedas(): Observable<NuevaMonedaDto[]> {
        let headers = this.getToken();
        return this.http.get<NuevaMonedaDto[]>(`${this.apiUrl}/GetAll`, { headers });
    }

    getMonedaById(id: number): Observable<NuevaMonedaDto> {
        let headers = this.getToken();
        return this.http.get<NuevaMonedaDto>(`${this.apiUrl}/${id}`, { headers });
    }

    createMoneda(createDto: NuevaMonedaCreateDto): Observable<NuevaMonedaDto> {
        let headers = this.getToken();
        return this.http.post<NuevaMonedaDto>(this.apiUrl, createDto, { headers });
    }

    updateMoneda(updateDto: NuevaMonedaUpdateDto): Observable<NuevaMonedaDto> {
        let headers = this.getToken();
        return this.http.put<NuevaMonedaDto>(this.apiUrl, updateDto, { headers });
    }

    deleteMoneda(id: number): Observable<void> {
        let headers = this.getToken();
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
}
