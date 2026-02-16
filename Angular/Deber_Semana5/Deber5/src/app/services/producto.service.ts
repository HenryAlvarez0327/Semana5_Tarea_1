import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  RUTA_API = "https://localhost:7135/api/Productos";

  constructor(private http: HttpClient) {}

  todos(): Observable<any[]> {
    return this.http.get<any[]>(this.RUTA_API);
  }

  uno(id: number): Observable<any> {
    return this.http.get<any>(`${this.RUTA_API}/${id}`);
  }

  nuevo(producto: any): Observable<any> {
    return this.http.post<any>(this.RUTA_API, producto);
  }

  editar(producto: any): Observable<any> {
    return this.http.put<any>(`${this.RUTA_API}/${producto.id}`, producto);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.RUTA_API}/${id}`);
  }
}
