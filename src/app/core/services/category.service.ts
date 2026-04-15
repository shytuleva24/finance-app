import { inject, Injectable, computed } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { CATEGORIES_URL } from '@app/core/constants/api.constants';
import { Category } from '@app/core/models/category.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(CATEGORIES_URL);

  private readonly categoriesResource = httpResource<Category[]>(() => this.baseUrl);

  readonly categories = computed(() => this.categoriesResource.value() ?? []);
  readonly loading = this.categoriesResource.isLoading;
  readonly error = this.categoriesResource.error;

  getCategories() {
    return this.categories;
  }

  getCategoryById(id: number) {
    return this.categories().find((c) => c.id === id);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.categoriesResource.update((current) => {
          return current ? current.filter((c) => c.id !== id) : [];
        });
      }),
    );
  }

  createCategory(category: Omit<Category, 'id'>): Observable<Category> {
    return this.http.post<Category>(this.baseUrl, category).pipe(
      tap((newCategory) => {
        this.categoriesResource.update((current) => {
          return current ? [...current, newCategory] : [newCategory];
        });
      }),
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/${category.id}`, category).pipe(
      tap((updatedCategory) => {
        this.categoriesResource.update((current) => {
          return current
            ? current.map((c) => (c.id === updatedCategory.id ? updatedCategory : c))
            : [updatedCategory];
        });
      }),
    );
  }
}
