import { Category } from './category.model';

export class Expense {
    // tslint:disable-next-line: variable-name
    _id: string;
    userId: string;
    accountId: string;
    categoryId: string;
    addedDate: Date;
    addedDateString: string;
    title: string;
    amount: number;
    category: Category;
}
