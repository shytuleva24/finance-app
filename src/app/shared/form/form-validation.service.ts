import { Injectable } from '@angular/core';

export interface ValidationRules {
  required?: string;
  pattern?: {
    regex: RegExp;
    message: string;
  };
  minLength?: {
    length: number;
    message: string;
  };
  maxLength?: {
    length: number;
    message: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class FormValidationService {
  /**
   * Validates a string value against provided rules.
   * Returns an error message if invalid, or null if valid.
   */
  validate(val: unknown, rules: ValidationRules): string | null {
    const stringVal = val === null || val === undefined ? '' : String(val);

    if (rules.required && !stringVal.trim()) {
      return rules.required;
    }

    if (rules.minLength && stringVal.length < rules.minLength.length) {
      return rules.minLength.message;
    }

    if (rules.maxLength && stringVal.length > rules.maxLength.length) {
      return rules.maxLength.message;
    }

    if (rules.pattern && !rules.pattern.regex.test(stringVal)) {
      return rules.pattern.message;
    }

    return null;
  }
}
