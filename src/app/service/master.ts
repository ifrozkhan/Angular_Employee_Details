import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MasterService {
    
    constructor(private http: HttpClient) { }

    getUserList() {
        return this.http.get("https://jsonplaceholder.typicode.com/users");
    }
}

