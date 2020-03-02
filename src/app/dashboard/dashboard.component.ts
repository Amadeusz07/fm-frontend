import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { CategorySummary } from '../models/categorySummary.model';
import { ExpensesService } from '../services/expenses.service';
import { PieChartComponent } from '../shared/pie-chart/pie-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public expensesByCategory: CategorySummary[];
  @ViewChild(PieChartComponent, { static: false} ) child: PieChartComponent;

  constructor(private categoriesService: CategoriesService, private expensesService: ExpensesService) { }

  ngOnInit() {
    this.getSummaryByCategory();
    this.expensesService.expenseAdded.subscribe(_ => {
      this.getSummaryByCategory();
    });
  }

  public getSummaryByCategory() {
    this.categoriesService.GetSummaryByCategory().subscribe((expenses: CategorySummary[]) => {
      this.expensesByCategory = expenses;
      if (this.child) {
        this.child.refresh(this.expensesByCategory);
      }
    });
  }

}
