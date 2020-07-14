import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../models/project.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class ProjectsService {

    constructor(private http: HttpClient) { }

    public GetProjects(): Observable<Project[]> {
        return this.http.get<Project[]>('/projects');
    }

    public GetAssignedProjects(): Observable<Project[]> {
        return this.http.get<Project[]>('/projects/assigned');
    }

    public AddProject(project: Project): Observable<any> {
        return this.http.post('projects', project);
    }

    public DisableProject(project: Project): Observable<any> {
        return this.http.delete(`projects/${project._id}`);
    }

    public UpdateProject(project: Project): Observable<any> {
        return this.http.put(`projects/${project._id}`, project);
    }

    public AssignUser(project: Project, username: string): Observable<any> {
        return this.http.post(`projects/${project._id}/assignUser`, { username });
    }

    public UnAssignUser(project: Project, userId: string): Observable<any> {
        return this.http.post(`projects/${project._id}/unAssignUser`, { userId });
    }

    public SelectProject(projectId: string): Observable<any> {
        return this.http.post('selectProject', { projectId });
    }
}
