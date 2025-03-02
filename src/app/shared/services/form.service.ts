import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private apiUrl = 'https://script.google.com/macros/s/AKfycbzwn6uhL4aLb1VQgVVA1dW1goq8vAx7aKZo9RT0aYsnC-upZVoI2s652afXkMeHnkFP/exec';
  
  constructor(private http: HttpClient) {} 

  submitForm(formData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain;charset=utf-8'
    });
    return this.http.post(this.apiUrl, formData, { headers, responseType: 'text' });
  }
}
