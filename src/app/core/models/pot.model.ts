import { CurrencyCode } from './fx-rate.model';

export type PotTheme =
  | 'Green'
  | 'Yellow'
  | 'Cyan'
  | 'Navy'
  | 'Red'
  | 'Purple'
  | 'Turquoise'
  | 'Brown'
  | 'Magenta'
  | 'Blue'
  | 'Grey'
  | 'Army Green'
  | 'Gold'
  | 'Orange';

export interface Pot {
  id: string;
  _id?: string; // MongoDB ID
  name: string;
  target: number;
  total: number;
  theme: PotTheme;
  currency: CurrencyCode;
}
