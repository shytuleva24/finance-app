/**
 * Supported currencies in the application.
 */
export type CurrencyCode = 'USD' | 'EUR' | 'PLN';

/**
 * Represents a single exchange rate point in time.
 */
export interface FxRatePoint {
  readonly date: string; // ISO date YYYY-MM-DD
  readonly base: CurrencyCode;
  readonly quote: CurrencyCode;
  readonly rate: number;
}

/**
 * Normalized data structure for exchange rates.
 */
export interface FxRateData {
  readonly rates: FxRatePoint[];
  readonly lastUpdated: string;
  readonly source: string;
}

/**
 * Cross-rate calculation matrix [base][quote].
 */
export type FxMatrix = Record<CurrencyCode, Record<CurrencyCode, number>>;
