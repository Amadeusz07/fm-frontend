import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public username: string;
  public projectName: string;
  public get projectSelected(): boolean {
    return this.projectName != null && this.projectName !== '';
  }
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.user;
    this.projectName = this.authService.projectName;
    this.authService.usernameChanged.subscribe(username => this.username = username);
    this.authService.projectNameChanged.subscribe(projectName => this.projectName = projectName);
  }

  public logout() {
    this.authService.logout();
  }

}
