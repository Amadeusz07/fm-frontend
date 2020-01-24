import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { CategoriesManagerComponent } from './categories-manager/categories-manager.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: HomeComponent,
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
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
