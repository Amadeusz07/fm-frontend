import { Injectable } from '@angular/core';
import { Expense } from '../models/expense.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  public expenseAdded = new Subject();

  constructor(private http: HttpClient) { }

  public addExpense(expense: Expense): Observable<any> {
    expense.amount = expense.amount
    return this.http.post('expenses', expense);
  }

  public getLastHistory(count: number, date: Date): Observable<Expense[]> {
    let params = new HttpParams();
    params = params.append('count', count.toString());
    params = params.append('date', `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDay() + 1).toString().padStart(2, '0')}`);
    return this.http.get<Expense[]>('expenses', { params });
  }

  public deleteExpense(expense: Expense): Observable<any> {
    return this.http.delete(`expenses/${expense._id}`);
  }
}
