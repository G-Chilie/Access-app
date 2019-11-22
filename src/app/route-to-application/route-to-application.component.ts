import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-route-to-application',
  templateUrl: './route-to-application.component.html',
  styleUrls: ['./route-to-application.component.css']
})
export class RouteToApplicationComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  // postUserToApp(): Observable<Book[]> {
  //   return this.http.get(this.url)
  //  .map(this.extractData)
  //  .catch(this.handleErrorObservable);
}

