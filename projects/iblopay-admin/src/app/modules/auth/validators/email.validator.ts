import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AUTH_CONSTANTS } from '../auth.constants';


export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const cleaned = value.replace(/[\s-]/g, '');

    if (!AUTH_CONSTANTS.PHONE_PATTERN.test(cleaned)) {
      return { phoneFormat: 'Le format du numéro de téléphone est invalide' };
    }

    return null;
  };
}


export function emailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailPattern.test(value)) {
      return { emailFormat: 'Le format de l\'email est invalide' };
    }

    return null;
  };
}


export function otpValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const isDigitsOnly = /^\d+$/.test(value);
    if (!isDigitsOnly) {
      return { otpFormat: 'Le code OTP doit contenir uniquement des chiffres' };
    }

    if (value.length !== AUTH_CONSTANTS.OTP_LENGTH) {
      return { otpLength: `Le code OTP doit contenir ${AUTH_CONSTANTS.OTP_LENGTH} chiffres` };
    }

    return null;
  };
}


export function cniValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    if (value.length < 5 || value.length > 30) {
      return { cniFormat: 'Le numéro CNI doit contenir entre 5 et 30 caractères' };
    }

    return null;
  };
}
