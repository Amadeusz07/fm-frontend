import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public username: string;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.username = this.authService.user;
  }

  public logout() {
    this.authService.logout();
  }

}
