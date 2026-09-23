import { AUTH_CONSTANTS } from '../auth.constants';
/**
 * Validates PIN length (digits only)
 */
export function pinValidator() {
    return function (control) {
        var value = control.value;
        if (!value)
            return null;
        var isDigitsOnly = /^\d+$/.test(value);
        if (!isDigitsOnly) {
            return { pinFormat: 'Le PIN doit contenir uniquement des chiffres' };
        }
        if (value.length < AUTH_CONSTANTS.PIN_MIN_LENGTH) {
            return { pinMinLength: "Le PIN doit avoir au moins ".concat(AUTH_CONSTANTS.PIN_MIN_LENGTH, " chiffres") };
        }
        if (value.length > AUTH_CONSTANTS.PIN_MAX_LENGTH) {
            return { pinMaxLength: "Le PIN ne doit pas d\u00E9passer ".concat(AUTH_CONSTANTS.PIN_MAX_LENGTH, " chiffres") };
        }
        return null;
    };
}
/**
 * Validates that PIN and confirm PIN match
 */
export function pinMatchValidator(pinField, confirmField) {
    return function (group) {
        var _a, _b;
        var pin = (_a = group.get(pinField)) === null || _a === void 0 ? void 0 : _a.value;
        var confirm = (_b = group.get(confirmField)) === null || _b === void 0 ? void 0 : _b.value;
        if (pin && confirm && pin !== confirm) {
            return { pinMismatch: 'Les PINs ne correspondent pas' };
        }
        return null;
    };
}
/**
 * Validates PIN is not a repeated or sequential number
 */
export function strongPinValidator() {
    return function (control) {
        var value = control.value;
        if (!value)
            return null;
        // Check for repeated digits (e.g., 1111, 0000)
        if (/^(\d)\1+$/.test(value)) {
            return { weakPin: 'Le PIN ne doit pas contenir des chiffres répétés' };
        }
        // Check for sequential digits (e.g., 1234, 4321)
        var digits = value.split('').map(Number);
        var isSequential = true;
        var isReverseSequential = true;
        for (var i = 1; i < digits.length; i++) {
            if (digits[i] !== digits[i - 1] + 1)
                isSequential = false;
            if (digits[i] !== digits[i - 1] - 1)
                isReverseSequential = false;
        }
        if (isSequential || isReverseSequential) {
            return { weakPin: 'Le PIN ne doit pas contenir des chiffres séquentiels' };
        }
        return null;
    };
}
//# sourceMappingURL=password.validator.js.map