import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FastHistoryComponent } from './fast-history/fast-history.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';
import { HomeComponent } from './home/home.component';
import { CategoriesManagerComponent } from './categories-manager/categories-manager.component';
import { APIInterceptor } from './interceptors/api.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSelectModule,
  MatInputModule,
  MatTableModule
} from '@angular/material';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './shared/pie-chart/pie-chart.component';
import { LineChartComponent } from './shared/line-chart/line-chart.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth-guard.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    DashboardComponent,
    FastHistoryComponent,
    AddExpenseComponent,
    HomeComponent,
    CategoriesManagerComponent,
    PieChartComponent,
    LineChartComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    ChartsModule
  ],
  providers: [ AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
