import { AUTH_CONSTANTS } from '../auth.constants';
/**
 * Validates phone number format
 */
export function phoneValidator() {
    return function (control) {
        var value = control.value;
        if (!value)
            return null;
        // Remove spaces and dashes
        var cleaned = value.replace(/[\s-]/g, '');
        if (!AUTH_CONSTANTS.PHONE_PATTERN.test(cleaned)) {
            return { phoneFormat: 'Le format du numéro de téléphone est invalide' };
        }
        return null;
    };
}
/**
 * Validates email format (optional field)
 */
export function emailValidator() {
    return function (control) {
        var value = control.value;
        if (!value)
            return null; // Email is optional
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(value)) {
            return { emailFormat: 'Le format de l\'email est invalide' };
        }
        return null;
    };
}
/**
 * Validates OTP code format
 */
export function otpValidator() {
    return function (control) {
        var value = control.value;
        if (!value)
            return null;
        var isDigitsOnly = /^\d+$/.test(value);
        if (!isDigitsOnly) {
            return { otpFormat: 'Le code OTP doit contenir uniquement des chiffres' };
        }
        if (value.length !== AUTH_CONSTANTS.OTP_LENGTH) {
            return { otpLength: "Le code OTP doit contenir ".concat(AUTH_CONSTANTS.OTP_LENGTH, " chiffres") };
        }
        return null;
    };
}
/**
 * Validates CNI number format
 */
export function cniValidator() {
    return function (control) {
        var value = control.value;
        if (!value)
            return null; // CNI is optional
        if (value.length < 5 || value.length > 30) {
            return { cniFormat: 'Le numéro CNI doit contenir entre 5 et 30 caractères' };
        }
        return null;
    };
}
//# sourceMappingURL=email.validator.js.map