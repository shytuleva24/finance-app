import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { CATEGORIES_URL } from '@app/core/constants/api.constants';
import { Category } from '@app/core/models/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(CATEGORIES_URL);

  private readonly categoriesResource = httpResource<Category[]>(() => this.baseUrl);

  getCategories() {
    return this.categoriesResource;
  }

  getExpenseCategories() {
    return (this.categoriesResource.value() ?? []).filter((cat) => cat.type === 'OUTCOME');
  }

  getIncomeCategories() {
    return (this.categoriesResource.value() ?? []).filter((cat) => cat.type === 'INCOME');
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  createCategory(category: Omit<Category, 'id'>): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${category.id}`, category);
  }
}
