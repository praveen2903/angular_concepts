import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutoComplete {
  constructor(private http: HttpClient) {}

  searchUsers(term: string): Observable<any[]> {
    return this.http.get<any[]>(
      `https://jsonplaceholder.typicode.com/users?name_like=${term}`
    );
  }
}
