import { FormControl, FormGroup } from '@angular/forms';

import { passwordMatchValidator } from './password-match.validator';

describe('passwordMatchValidator', () => {
  it('should return null when passwords match', () => {
    const form = new FormGroup({
      password: new FormControl('password123'),
      confirmPassword: new FormControl('password123'),
    });

    const validator = passwordMatchValidator('password');
    const result = validator(form.get('confirmPassword')!);

    expect(result).toBeNull();
  });

  it('should return error when passwords do not match', () => {
    const form = new FormGroup({
      password: new FormControl('password123'),
      confirmPassword: new FormControl('different123'),
    });

    const validator = passwordMatchValidator('password');
    const result = validator(form.get('confirmPassword')!);

    expect(result).toEqual({ passwordMismatch: true });
  });

  it('should return null when password is empty', () => {
    const form = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl('password123'),
    });

    const validator = passwordMatchValidator('password');
    const result = validator(form.get('confirmPassword')!);

    expect(result).toBeNull();
  });

  it('should return null when confirm password is empty', () => {
    const form = new FormGroup({
      password: new FormControl('password123'),
      confirmPassword: new FormControl(''),
    });

    const validator = passwordMatchValidator('password');
    const result = validator(form.get('confirmPassword')!);

    expect(result).toBeNull();
  });

  it('should return null when parent form is missing', () => {
    const control = new FormControl('password123');
    const validator = passwordMatchValidator('password');
    const result = validator(control);

    expect(result).toBeNull();
  });
});
