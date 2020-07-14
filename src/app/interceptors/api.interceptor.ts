import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    /**
     *
     */
    constructor(private authService: AuthService, private router: Router) {
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401 || err.status === 403) {
            this.router.navigateByUrl(`/login`);
            this.authService.logout();
            return of(err.message);
        }
        return throwError(err);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers =  req.headers.append('Content-Type', 'application/json');
        if (this.authService.isAuthenticated()) {
            headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        }
        const apiReq = req.clone({
            url: `${environment.apiUrl}/${req.url}`,
            headers
          });

        return next.handle(apiReq).pipe(catchError(x => this.handleAuthError(x)));
    }
}
