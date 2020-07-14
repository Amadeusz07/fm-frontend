import { Component, OnInit, Inject } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-update-project-dialog',
  templateUrl: './update-project-dialog.component.html',
  styleUrls: ['./update-project-dialog.component.scss']
})
export class UpdateProjectDialogComponent implements OnInit {

  public newName = '';
  public projectName = '';
  public assignUsername = '';
  public unassignUsername = '';
  public errorMessage: string;
  public addingInformation: string;
  public isModified = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: Project,
    private projectsService: ProjectsService) { }

  ngOnInit() {
    this.projectName = this.model.name;
    this.newName = this.model.name;
  }

  onNoClick() {
    this.dialogRef.close();
  }

  public changeName() {
    this.isModified = true;
    this.projectsService.UpdateProject( { ...this.model, name: this.newName })
      .subscribe(_ => this.addingInformation = 'Project\'s name changed');
  }

  public assignUser() {
    this.isModified = true;
    this.projectsService.AssignUser( { ...this.model }, this.assignUsername)
      .subscribe(
        _ => this.addingInformation = 'User assigned',
        error => {
          if (error.status === 404) {
            this.errorMessage = 'User not found';
          }
        }
      );
  }

  public unassignUser() {
    this.isModified = true;
    const toUnassign = this.model.assignedUsers.filter(user => user._id === this.unassignUsername);
    if (!toUnassign) {
      this.errorMessage = 'Error occured';
    }
    this.projectsService.UnAssignUser(
      { ...this.model },
      toUnassign[0]._id
    ).subscribe(_ => this.addingInformation = 'User unassinged');
  }

}
