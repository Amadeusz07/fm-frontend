import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Credentials } from '../models/credentials.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public model: Credentials;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.model = {
      email: '',
      password: ''
    } as Credentials;
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['dashboard/expenses']);
    }
  }

  public onSubmit(form: NgForm) {
    const logged = this.authService.login(this.model.email, this.model.password);
    form.reset();
    // if (logged) {
    //   this.router.navigate(['./dashboard/expenses']);
    // }
  }

}
