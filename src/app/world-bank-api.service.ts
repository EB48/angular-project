import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class WorldService {
  
  constructor(private http: HttpClient) {}

  getCountryData(countryCode: string): Observable<any> {
    const url =  this.http.get<any>(`https://api.worldbank.org/v2/country/${countryCode}?format=json`);
    
    return url;
  }
  
}
