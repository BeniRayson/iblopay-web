import { ValidatorFn } from '@angular/forms';
/**
 * Validates PIN length (digits only)
 */
export declare function pinValidator(): ValidatorFn;
/**
 * Validates that PIN and confirm PIN match
 */
export declare function pinMatchValidator(pinField: string, confirmField: string): ValidatorFn;
/**
 * Validates PIN is not a repeated or sequential number
 */
export declare function strongPinValidator(): ValidatorFn;
//# sourceMappingURL=password.validator.d.ts.map