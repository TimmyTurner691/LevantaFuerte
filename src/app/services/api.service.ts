import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'https://restcountries.com/v3.1/all?fields=name,flags'

  constructor(private http: HttpClient) { }

  getPaises(): Observable<any[]>{
    const headers = new HttpHeaders({
      'User-Agent': 'MyApp',
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(this.url, {headers} );
  }
}
