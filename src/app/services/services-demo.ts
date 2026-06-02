import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ServicesDemo {
  private api = 'http://localhost:5200/api/users';
  constructor(private http: HttpClient) {}  //injecting httpClient

  getUsers() {
    return this.http.get(this.api);
  }

  /* ====================================
      GET USER BY ID - normal params
  ==================================== */

  getUserById(id: number) {
    return this.http.get(`${this.api}/${id}`);
  }

  /* ====================================
      QUERY PARAMS   http://localhost:5200?name=..&page = ...
  ==================================== */

  searchUsers(name: string, role: string) {
    const params = new HttpParams().set('name', name).set('role', role);
    return this.http.get(this.api, { params });
  }
  createUser(user: any) {
    return this.http.post(this.api, user);
  }

  updateUser(id: number, user: any) {
    return this.http.put(`${this.api}/${id}`,  user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}