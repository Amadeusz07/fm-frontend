import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense.model';
import { ExpensesService } from '../services/expenses.service';

@Component({
  selector: 'app-expenses-listing',
  templateUrl: './expenses-listing.component.html',
  styleUrls: ['./expenses-listing.component.scss']
})
export class ExpensesListingComponent implements OnInit {
  public loading = true;
  public data: Expense[];

  constructor(private expensesService: ExpensesService) { }

  ngOnInit() {
    this.expensesService.getLastHistory(0, new Date()).subscribe(expenses => {
      this.data = expenses;
      this.loading = false;
      this.data.forEach(element => element.addedDateString = new Date(element.addedDate).toLocaleDateString());
    });
  }

}
