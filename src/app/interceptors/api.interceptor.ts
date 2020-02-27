import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    /**
     *
     */
    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers =  req.headers.append('Content-Type', 'application/json');
        if (this.authService.isAuthenticated()) {
            headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
        }
        // headers = headers.append('Content-Type', 'application/json');
        const apiReq = req.clone({
            url: `http://localhost:8080/${req.url}`,
            headers
          });

        return next.handle(apiReq);
    }
}
