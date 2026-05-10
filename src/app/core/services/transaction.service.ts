import { computed, inject, Injectable, signal } from '@angular/core';
import { Page, Transaction } from '../models/transaction.model';
import { HttpClient, HttpParams, httpResource } from '@angular/common/http';
import { TRANSACTIONS_URL } from '@app/core/constants/api.constants';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(TRANSACTIONS_URL);

  private readonly params = signal<Record<string, string | number | null>>({
    page: 0,
    size: 10,
    sort: 'date,desc',
  });

  private readonly transactionsResource = httpResource<Page<Transaction>>(() => {
    let httpParams = new HttpParams();
    const p = this.params();
    Object.keys(p).forEach((key) => {
      const val = p[key];
      if (val !== null && val !== undefined) {
        httpParams = httpParams.set(key, String(val));
      }
    });
    return {
      url: this.baseUrl as string,
      params: httpParams,
    };
  });

  readonly transactionsPage = computed(() => this.transactionsResource.value());
  readonly transactions = computed(() => {
    const val = this.transactionsResource.value();
    return val?.content && Array.isArray(val.content) ? val.content : [];
  });
  readonly loading = this.transactionsResource.isLoading;
  readonly error = this.transactionsResource.error;

  updateParams(newParams: Partial<Record<string, string | number | null>>) {
    this.params.update((p) => {
      const updated = { ...p };
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined) {
          updated[key] = value;
        }
      });
      return updated;
    });
  }

  deleteTransaction(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      tap(() => {
        this.transactionsResource.update((current) => {
          if (!current) return undefined as any;
          return {
            ...current,
            content: current.content.filter((c) => c.id !== id),
            totalElements: current.totalElements - 1,
          };
        });
      }),
    );
  }

  createTransaction(transaction: Omit<Transaction, 'id'>): Observable<Transaction> {
    return this.http.post<Transaction>(this.baseUrl as string, transaction).pipe(
      tap((newTransaction) => {
        this.transactionsResource.update((current) => {
          if (!current) return undefined as any;
          return {
            ...current,
            content: [newTransaction, ...current.content],
            totalElements: current.totalElements + 1,
          };
        });
      }),
    );
  }

  updateTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(`${this.baseUrl}/${transaction.id}`, transaction).pipe(
      tap((updatedTransaction) => {
        this.transactionsResource.update((current) => {
          if (!current) return undefined as any;
          return {
            ...current,
            content: current.content.map((c) =>
              c.id === updatedTransaction.id ? updatedTransaction : c,
            ),
          };
        });
      }),
    );
  }
}
