import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private http: HttpClient) {
    }

    public GetCategories(): Observable<Category[]> {
        return this.http.get<Category[]>('categories');
    }

    public GetCategory(id: string): Observable<Category> {
        return this.http.get<Category>(`categories/${id}`);
    }

    public AddCategory(category: Category): Observable<any> {
        return this.http.post('categories', category);
    }

    public UpdateCategory(category: Category): Observable<any> {
        return this.http.put(`categories/${category._id}`, category);
    }

    public DeleteCategory(category: Category): Observable<any> {
        return this.http.delete(`categories/${category._id}`);
    }
}
