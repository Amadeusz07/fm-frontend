import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../models/tokenResponse.model';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
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
        this.http.post('login', { email, password }).subscribe((response: TokenResponse) => {
            if (response.token && response.expiresDate) {
                localStorage.setItem('token', response.token.toString());
                localStorage.setItem('expDate', response.expiresDate.toString());
                logged = true;
                this.router.navigate(['./dashboard/expenses']);
            }
        });

        return logged;
    }

    public register(email: string, password: string): void {
        this.http.post('register', { email, password }).subscribe(response => {
            console.log(response);
        });
    }

    public logout(): void {
        this.http.post('logout', {}).subscribe(response => {
            console.log(response);
            this.router.navigate(['./login']);
            localStorage.removeItem('token');
            localStorage.removeItem('expDate');
        });
    }
}
