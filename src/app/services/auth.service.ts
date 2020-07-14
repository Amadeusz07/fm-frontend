import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../models/tokenResponse.model';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    public user: string;
    /**
     *
     */
    constructor(private http: HttpClient, private router: Router) {
        this.user = localStorage.getItem('userName');
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return token != null;
    }

    public login(email: string, password: string): boolean {
        let logged = false;
        this.http.post<any>('login', { email, password }).subscribe((response: TokenResponse) => {
            logged = this.loginInWith(response.token, response.expiresDate, email);
        });

        return logged;
    }

    public register(email: string, password: string): Observable<any> {
        return this.http.post<any>('register', { email, password });
    }

    public logout(): void {
        this.http.post<any>('logout', {}).subscribe(response => {
            this.router.navigate(['./login']);
            this.clearLocalStorage();
            localStorage.removeItem('userName');
            this.user = '';
        });
    }

    public loginInWith(token: string, expirationDate: Date, email?: string) {
        if (token && expirationDate) {
            localStorage.setItem('token', token.toString());
            localStorage.setItem('expDate', expirationDate.toString());

            this.router.navigate(['./dashboard/expenses']);
            if (email) {
                localStorage.removeItem('userName');
                localStorage.setItem('userName', email.toString());
                this.user = email;
            }

            return true;
        }
        return false;
    }

    public clearLocalStorage() {
        localStorage.removeItem('token');
        localStorage.removeItem('expDate');
    }
}
