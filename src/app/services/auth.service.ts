import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../models/tokenResponse.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    public user: string = 'blek@blek.pl';
    /**
     *
     */
    constructor(private http: HttpClient, private router: Router) {
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return token != null;
    }

    public login(email: string, password: string): boolean {
        let logged = false;
        this.http.post<any>('login', { email, password }).subscribe((response: TokenResponse) => {
            if (response.token && response.expiresDate) {
                localStorage.setItem('token', response.token.toString());
                localStorage.setItem('expDate', response.expiresDate.toString());
                logged = true;
                this.router.navigate(['./dashboard/expenses']);
                this.user = email;
            }
        });

        return logged;
    }

    public register(email: string, password: string): Observable<any> {
        return this.http.post<any>('register', { email, password });
    }

    public logout(): void {
        this.http.post<any>('logout', {}).subscribe(response => {
            console.log(response);
            this.router.navigate(['./login']);
            localStorage.removeItem('token');
            localStorage.removeItem('expDate');
            this.user = '';
        });
    }
}
