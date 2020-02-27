import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'finance-management';
  get isLoginPage() {
    return !this.authService.isAuthenticated()
  }
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
  }

}
