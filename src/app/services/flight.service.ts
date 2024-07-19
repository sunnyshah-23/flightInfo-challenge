import { Injectable } from '@angular/core';
import { FlightInfo } from '../FlightInfo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'token':'WW91IG11c3QgYmUgdGhlIGN1cmlvdXMgdHlwZS4gIEJyaW5nIHRoaXMgdXAgYXQgdGhlIGludGVydmlldyBmb3IgYm9udXMgcG9pbnRzICEh'
  }),
};

@Injectable({
  providedIn: 'root'
})

export class FlightService {

  private apiUrl='https://us-central1-crm-sdk.cloudfunctions.net/flightInfoChallenge';

  constructor( private http:HttpClient) {}

  sendFlightInfo(flightDetails:FlightInfo,name:string):Observable<boolean>{
    httpOptions.headers = httpOptions.headers.set('name', name);
    return this.http.post<boolean>(`${this.apiUrl}`,flightDetails,httpOptions);
  }
}
