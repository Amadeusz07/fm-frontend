import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../models/project.model';
import { MatDialog } from '@angular/material';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { UpdateProjectDialogComponent } from './update-project-dialog/update-project-dialog.component';
import { TokenResponse } from '../models/tokenResponse.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public assignedProjects: Project[];
  public loading: boolean;
  public assignedLoading: boolean;
  public displayedColumns: string[] = ['name', 'addedDate', 'disabledDate', 'actions'];
  public displayedColumnsForAssigned: string[] = ['name', 'addedDate', 'actions'];

  public errorProjects: string;
  public errorAssignedProjects: string;

  constructor(private projectsService: ProjectsService, private authService: AuthService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getProjects();
  }

  public openDialogNewProject() {
    const dialog = this.dialog.open(AddProjectDialogComponent);
    dialog.afterClosed().subscribe((result: Project) => {
      if (result) {
        this.projectsService.AddProject(result).subscribe(_ => {
          this.getProjects();
        });
      }
    });
  }

  public selectProject(id: string) {
    this.projectsService.SelectProject(id).subscribe((response: TokenResponse) => {
      this.authService.clearLocalStorage();
      this.authService.loginInWith(response.token, response.expiresDate);
    });
  }

  public openDialogEditProject(model: Project) {
    const dialog = this.dialog.open(UpdateProjectDialogComponent, { data: model });
    dialog.afterClosed().subscribe((wasModified: boolean) => {
      if (wasModified) {
        this.getProjects();
      }
    });
  }

  public disableProject(model: Project) {
    this.projectsService.DisableProject(model).subscribe(_ => {
      this.getProjects();
    });
  }

  private getProjects() {
    this.loading = true;
    this.assignedLoading = true;
    this.projectsService.GetProjects().subscribe(projects => {
      this.formatProject(projects);
      this.projects = projects;
      this.loading = false;
      this.errorProjects = '';
    }, error => {
      if (error.status === 404) {
        this.loading = false;
        this.errorProjects = 'No projects you own';
      }
    });
    this.projectsService.GetAssignedProjects().subscribe(projects => {
      this.formatProject(projects);
      this.assignedProjects = projects;
      this.assignedLoading = false;
      this.errorAssignedProjects = '';
    }, error => {
      if (error.status === 404) {
        this.assignedLoading = false;
        this.errorAssignedProjects = 'No projects you are assigned to';
      }
    });
  }

  private formatProject(projects: Project[]) {
    projects.forEach(element => {
      element.addedDateString = new Date(element.addedDate).toLocaleDateString();

      if (new Date(element.disabledDate).getFullYear() === 1) {
        element.disabledDateString = '-';
      } else {
        element.disabledDateString = new Date(element.disabledDate).toLocaleDateString();
      }

    });
  }
}
