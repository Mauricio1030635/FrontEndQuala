import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NuevaEntidadDto, NuevaEntidadCreateDto, NuevaEntidadUpdateDto } from '../Models/modelEntidad';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class NuevaEntidadService {

    private apiUrl = `${environment.apiUrlNuevaEntidad}`;

    constructor(private http: HttpClient) { }

    private getToken(): HttpHeaders {
        const token = localStorage.getItem('token');
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
    }

    getAllEntidades(): Observable<NuevaEntidadDto[]> {
        let headers = this.getToken();
        return this.http.get<NuevaEntidadDto[]>(`${this.apiUrl}/GetAll`, { headers });
    }

    getEntidadById(id: number): Observable<NuevaEntidadDto> {
        let headers = this.getToken();
        return this.http.get<NuevaEntidadDto>(`${this.apiUrl}/${id}`, { headers });
    }

    createEntidad(createDto: NuevaEntidadCreateDto): Observable<NuevaEntidadDto> {
        let headers = this.getToken();
        return this.http.post<NuevaEntidadDto>(this.apiUrl, createDto, { headers });
    }

    updateEntidad(updateDto: NuevaEntidadUpdateDto): Observable<NuevaEntidadDto> {
        let headers = this.getToken();
        return this.http.put<NuevaEntidadDto>(this.apiUrl, updateDto, { headers });
    }

    deleteEntidad(id: number): Observable<void> {
        let headers = this.getToken();
        return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
    }
}
