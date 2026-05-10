import { inject, Injectable, signal } from '@angular/core';
import { HttpParams, httpResource } from '@angular/common/http';
import { OVERVIEW_URL } from '@app/core/constants/api.constants';
import { OverviewData } from '@app/core/models/overview.model';

@Injectable({
  providedIn: 'root',
})
export class OverviewService {
  private readonly baseUrl = inject(OVERVIEW_URL);

  private readonly range = signal<{ from: string; to: string } | null>(null);

  readonly currentRange = this.range.asReadonly();

  private readonly overviewResource = httpResource<OverviewData>(() => {
    const r = this.range();
    if (!r) return null as never;

    const httpParams = new HttpParams().set('from', r.from).set('to', r.to);

    return {
      url: this.baseUrl as string,
      params: httpParams,
    };
  });

  readonly overviewData = this.overviewResource.value;
  readonly loading = this.overviewResource.isLoading;
  readonly error = this.overviewResource.error;

  updateRange(from: string, to: string) {
    this.range.set({ from, to });
  }
}
