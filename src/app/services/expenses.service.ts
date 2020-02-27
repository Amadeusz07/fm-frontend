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
    return this.http.post('expenses', expense);
  }

  public getLastHistory(count: number): Observable<Expense[]> {
    let params = new HttpParams();
    params = params.append('count', count.toString());
    return this.http.get<Expense[]>('expenses', { params });
  }
}
