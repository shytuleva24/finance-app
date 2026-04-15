import { ValidationRules } from '@app/core/services/form-validation.service';

export const MAX_TEXT_LENGTH = 100;

export const nameValidations: ValidationRules = {
  required: 'Name is required',
  maxLength: { length: MAX_TEXT_LENGTH, message: `Max length is ${MAX_TEXT_LENGTH}` },
};

export const emailValidations: ValidationRules = {
  required: 'Email is required',
  pattern: {
    regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Please enter a valid email address',
  },
  maxLength: { length: MAX_TEXT_LENGTH, message: `Max length is ${MAX_TEXT_LENGTH}` },
};

export const passwordValidations: ValidationRules = {
  required: 'Password is required',
  minLength: { length: 8, message: 'Password must be at least 8 characters' },
  maxLength: { length: MAX_TEXT_LENGTH, message: `Max length is ${MAX_TEXT_LENGTH}` },
};
