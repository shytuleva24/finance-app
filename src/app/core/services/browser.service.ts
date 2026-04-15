import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class BrowserService {
  private readonly platformId = inject(PLATFORM_ID);
  readonly isBrowser = signal(isPlatformBrowser(this.platformId)).asReadonly();
}
