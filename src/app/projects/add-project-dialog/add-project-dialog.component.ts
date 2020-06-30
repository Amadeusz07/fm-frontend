import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/project.model';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.scss']
})
export class AddProjectDialogComponent implements OnInit {

  public model = {
    name: ''
  } as Project;

  constructor(public dialogRef: MatDialogRef<AddProjectDialogComponent>) { }

  ngOnInit() {
    this.model.name = '';
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
