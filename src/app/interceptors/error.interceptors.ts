import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public toastr: ToastrService,
        private authenticationService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log("err.status", err);
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            } else {
                if (err.error && err.error.status && err.error.status.message) {
                    this.toastr.error(err.error.status.message);
                } else {
                    this.toastr.error('Something went wrong Please try Again!!');
                }
            }
            const error = err.error.status.message || err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}