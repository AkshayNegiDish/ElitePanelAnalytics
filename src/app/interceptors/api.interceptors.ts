import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/auth.service';


import {
  HttpRequest,
  HttpHandler,
  HttpHeaders,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var token = this.authenticationService.getToken();
    var headers = {
     // 'client_id': 'dishtvconnect',
      'secrettoken': '/GScsTA$7HU+c4K5qtxt9Rq;',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const authReq = req.clone({
      url: environment.baseURL + req.url,
      headers: new HttpHeaders(headers)
    });
    return next.handle(authReq);
  }
} 