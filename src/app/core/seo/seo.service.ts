import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/** Options for updating page title and meta tags (SEO). */
export interface SeoOptions {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

/** Manages document title and meta tags for SEO. SSR-safe. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Updates document title and optional description/canonical for the current route.
   */
  update(options: SeoOptions): void {
    if (options.title) {
      this.title.setTitle(options.title);
    }
    if (options.description) {
      this.meta.updateTag({ name: 'description', content: options.description });
    }
    if (options.canonicalUrl && isPlatformBrowser(this.platformId)) {
      let link = document.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', options.canonicalUrl);
    }
  }
}
