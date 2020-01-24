import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-categories-manager',
  templateUrl: './categories-manager.component.html',
  styleUrls: ['./categories-manager.component.scss']
})
export class CategoriesManagerComponent implements OnInit {

  public categories: Category[];
  public selectedId: string;
  public selectedCategory: Category;
  public newCategoryName: string;

  public updateError: string;
  public updateDone = true;
  public addingInformation: string;
  public addingError: string;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.getCategories();
  }

  public selectedCategoryChanged() {
    this.updateDone = false;
    this.categoriesService.GetCategory(this.selectedId).subscribe(category => {
      this.selectedCategory = category;
    });
  }

  public resetCategory() {
    this.updateDone = true;
    this.selectedCategory = null;
    this.selectedId = null;
  }

  public updateCategory() {
    this.categoriesService.UpdateCategory(this.selectedCategory)
      .subscribe(
        _ => {
          this.resetCategory();
          this.getCategories();
        },
        error => this.updateError = error
      );
  }

  public deleteCategory() {
    this.categoriesService.DeleteCategory(this.selectedCategory)
      .subscribe(
        _ => {
          this.resetCategory();
          this.getCategories();
        },
        error => this.updateError = error
      );
  }

  public addCategory() {
    this.categoriesService.AddCategory({ name: this.newCategoryName} as Category)
      .subscribe(
        _ => {
          this.addingInformation = 'Added ' + this.newCategoryName + ' successfully';
          this.getCategories();
          this.newCategoryName = '';
        },
        error => this.addingError = error
      );
  }

  private getCategories() {
    this.categoriesService.GetCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

}
