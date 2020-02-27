import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { CategoriesManagerComponent } from './categories-manager/categories-manager.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.interceptor';


const routes: Routes = [
  {
    path: 'dashboard',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'expenses',
        component: AddExpenseComponent
      },
      {
        path: 'categories',
        component: CategoriesManagerComponent
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
