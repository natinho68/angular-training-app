import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService {

  constructor(private http: HttpClient) {}

  getCitySuggestions(value: string): Observable<string[]> {

    return this.http.get<string[]>(`/api/autocomplete/${value}`);

  }

}
