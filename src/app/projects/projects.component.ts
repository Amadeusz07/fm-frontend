import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { Project } from '../models/project.model';
import { MatDialog } from '@angular/material';
import { AddProjectDialogComponent } from './add-project-dialog/add-project-dialog.component';
import { UpdateProjectDialogComponent } from './update-project-dialog/update-project-dialog.component';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  public projects: Project[];
  public loading: boolean;
  public displayedColumns: string[] = ['name', 'addedDate', 'disabledDate', 'actions'];

  constructor(private projectsService: ProjectsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loading = true;
    this.getProjects();
  }

  public openDialogNewProject() {
    const dialog = this.dialog.open(AddProjectDialogComponent);
    dialog.afterClosed().subscribe((result: Project) => {
      this.projectsService.AddProject(result).subscribe(_ => {
        this.getProjects();
      });
    });
  }

  public selectProject(id: string) {
    console.log('selected project', id);
  }

  public openDialogEditProject(model: Project) {
    const dialog = this.dialog.open(UpdateProjectDialogComponent, { data: model });
    dialog.afterClosed().subscribe(_ => {
      this.getProjects();
    });
  }

  public disableProject(model: Project) {
    this.projectsService.DisableProject(model).subscribe(_ => {
      console.log('disabled');
    });
  }

  private getProjects() {
    this.projectsService.GetProjects().subscribe(projects => {
      this.projects = projects;
      this.loading = false;
      this.projects.forEach(element => {
        element.addedDateString = new Date(element.addedDate).toLocaleDateString();

        if (new Date(element.disabledDate).getFullYear() === 1) {
          element.disabledDateString = '-';
        } else {
          element.disabledDateString = new Date(element.disabledDate).toLocaleDateString();
        }
      });
    });
  }
}
