import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from '../models/tokenResponse.model';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ProjectsService } from './projects.service';
import { Project } from '../models/project.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user: string;
    public projectName: string;

    public usernameChanged: Subject<string> = new Subject<string>();
    public projectNameChanged: Subject<string> = new Subject<string>();
    /**
     *
     */
    constructor(private http: HttpClient, private router: Router, private projectsService: ProjectsService) {
        this.user = localStorage.getItem('userName');
        this.projectName = localStorage.getItem('projectName');
        this.usernameChanged.next(this.user);
    }

    public isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return token != null;
    }

    public login(email: string, password: string): boolean {
        let logged = false;
        this.http.post<any>('login', { email, password }).subscribe((response: TokenResponse) => {
            logged = this.loginInWith(response.token, response.expiresDate, response.username, response.projectId);
            this.router.navigate(['./projects']);
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
            localStorage.removeItem('projectName');
            this.user = '';
            this.projectName = '';
        });
    }

    public loginInWith(token: string, expirationDate: Date, email?: string, projectId?: string) {
        if (token && expirationDate) {
            localStorage.setItem('token', token.toString());
            localStorage.setItem('expDate', expirationDate.toString());

            if (email) {
                localStorage.removeItem('userName');
                localStorage.setItem('userName', email.toString());
                this.user = email;
                this.usernameChanged.next(this.user);
            }
            if (projectId) {
                localStorage.removeItem('projectId');
                localStorage.setItem('projectId', projectId.toString());
                this.projectsService.GetProject(projectId).subscribe((project: Project) => {
                    this.projectName = project.name;
                    this.projectNameChanged.next(this.projectName);
                    localStorage.setItem('projectName', this.projectName);
                });
                this.router.navigate(['./dashboard/expenses']);
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
