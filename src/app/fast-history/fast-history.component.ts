import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Expense } from '../models/expense.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fast-history',
  templateUrl: './fast-history.component.html',
  styleUrls: ['./fast-history.component.scss']
})
export class FastHistoryComponent implements OnInit, OnDestroy {
  public history: Expense[];
  public header: string;
  public loading = true;
  public displayedColumns: string[] = ['addedDate', 'title', 'category', 'amount'];
  private currentDate: Date;
  private expensesSubscription: Subscription;

  constructor(private expensesService: ExpensesService) { }

  ngOnInit() {
    this.expensesSubscription = this.expensesService.expenseAdded.subscribe(_ => this.getLastHistory());
    this.getLastHistory();
    this.currentDate = new Date();
    this.header =  this.currentDate.toLocaleString('default', { month: 'long' });
  }

  ngOnDestroy() {
    this.expensesSubscription.unsubscribe();
  }

  private getLastHistory() {
    this.expensesService.getLastHistory(10).subscribe(expenses => {
      this.history = expenses;
      this.loading = false;
      this.history.forEach(element => element.addedDateString = new Date(element.addedDate).toLocaleDateString());
    });
  }

}
