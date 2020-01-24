import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../services/expenses.service';
import { Expense } from '../models/expense.model';

@Component({
  selector: 'app-fast-history',
  templateUrl: './fast-history.component.html',
  styleUrls: ['./fast-history.component.scss']
})
export class FastHistoryComponent implements OnInit {
  public history: Expense[];
  constructor(private expensesService: ExpensesService) { }

  ngOnInit() {
    this.expensesService.getLastHistory(10).subscribe(expenses => this.history = expenses);
  }

}
