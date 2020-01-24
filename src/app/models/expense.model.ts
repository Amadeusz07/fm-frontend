import { Category } from './category.model';

export interface Expense {
    _id: string;
    userId: string;
    accountId: string;
    categoryId: string;
    title: string;
    amount: number;
    category: Category;
}