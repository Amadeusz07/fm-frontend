import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Credentials } from '../models/credentials.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public model: Credentials;
  public registerModel: Credentials;
  public registerLabel: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.model = {
      email: '',
      password: ''
    } as Credentials;
    this.registerModel = {
      email: '',
      password: ''
    } as Credentials;

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['dashboard/expenses']);
    }
  }

  public onSubmitLogin(form: NgForm) {
    const logged = this.authService.login(this.model.email, this.model.password);
    form.reset();
    if (logged) {
      this.router.navigate(['./dashboard/expenses']);
    }
  }

  public onSubmitRegister(form: NgForm) {
    this.authService.register(this.registerModel.email, this.registerModel.password)
      .pipe(
        tap(
          data => null,
          error => this.registerLabel = 'Error occured'
        )
      )
      .subscribe(response => {
        this.registerLabel = 'User Created';
      });

    form.reset();
  }

}
