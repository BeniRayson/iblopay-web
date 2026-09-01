// src/app/modules/auth/validators/password.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AUTH_CONSTANTS } from '../auth.constants';

/**
 * Validates PIN length (digits only)
 */
export function pinValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const isDigitsOnly = /^\d+$/.test(value);
    if (!isDigitsOnly) {
      return { pinFormat: 'Le PIN doit contenir uniquement des chiffres' };
    }

    if (value.length < AUTH_CONSTANTS.PIN_MIN_LENGTH) {
      return { pinMinLength: `Le PIN doit avoir au moins ${AUTH_CONSTANTS.PIN_MIN_LENGTH} chiffres` };
    }

    if (value.length > AUTH_CONSTANTS.PIN_MAX_LENGTH) {
      return { pinMaxLength: `Le PIN ne doit pas dépasser ${AUTH_CONSTANTS.PIN_MAX_LENGTH} chiffres` };
    }

    return null;
  };
}

/**
 * Validates that PIN and confirm PIN match
 */
export function pinMatchValidator(pinField: string, confirmField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const pin = group.get(pinField)?.value;
    const confirm = group.get(confirmField)?.value;

    if (pin && confirm && pin !== confirm) {
      return { pinMismatch: 'Les PINs ne correspondent pas' };
    }
    return null;
  };
}

/**
 * Validates PIN is not a repeated or sequential number
 */
export function strongPinValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    // Check for repeated digits (e.g., 1111, 0000)
    if (/^(\d)\1+$/.test(value)) {
      return { weakPin: 'Le PIN ne doit pas contenir des chiffres répétés' };
    }

    // Check for sequential digits (e.g., 1234, 4321)
    const digits = value.split('').map(Number);
    let isSequential = true;
    let isReverseSequential = true;

    for (let i = 1; i < digits.length; i++) {
      if (digits[i] !== digits[i - 1] + 1) isSequential = false;
      if (digits[i] !== digits[i - 1] - 1) isReverseSequential = false;
    }

    if (isSequential || isReverseSequential) {
      return { weakPin: 'Le PIN ne doit pas contenir des chiffres séquentiels' };
    }

    return null;
  };
}
