import { Component, OnInit } from '@angular/core';
import { Expense } from '../models/expense.model';
import { ExpensesService } from '../services/expenses.service';
import { NgForm } from '@angular/forms';
import { Category } from '../models/category.model';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  public model: Expense;
  public addingInformation: string;
  public categories: Category[];

  constructor(private expenseService: ExpensesService, private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.model = {
      title: '',
      amount: 0,
      category: null
    } as Expense;
    this.categoriesService.GetCategories().subscribe(categories => this.categories = categories);
  }

  public onSubmit(form: NgForm) {
    this.expenseService.addExpense(this.model)
      .subscribe(
        _ => {
          this.addingInformation = 'Added new expense successfully';
          form.reset();
          this.model.amount = 0;
        }
      );
  }

}
