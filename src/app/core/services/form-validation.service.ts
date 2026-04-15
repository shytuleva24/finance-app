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
  validate(val: string, rules: ValidationRules): string | null {
    if (rules.required && !val.trim()) {
      return rules.required;
    }

    if (rules.minLength && val.length < rules.minLength.length) {
      return rules.minLength.message;
    }

    if (rules.maxLength && val.length > rules.maxLength.length) {
      return rules.maxLength.message;
    }

    if (rules.pattern && !rules.pattern.regex.test(val)) {
      return rules.pattern.message;
    }

    return null;
  }
}
