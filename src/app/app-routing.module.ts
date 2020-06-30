import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { CategoriesManagerComponent } from './categories-manager/categories-manager.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth-guard.service';
import { ExpensesListingComponent } from './expenses-listing/expenses-listing.component';
import { ProjectsComponent } from './projects/projects.component';

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
  {
    path: 'expense-listing',
    component: ExpensesListingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
