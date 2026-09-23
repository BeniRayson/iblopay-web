// ADDITION beyond the requested enums/ list — needed to type `payment_mode`
// on the transactions table. Mirrors the Postgres `payment_mode_enum` type 1:1.
export var PaymentMode;
(function (PaymentMode) {
    PaymentMode["NFC"] = "NFC";
    PaymentMode["USSD"] = "USSD";
    PaymentMode["MOBILE_APP"] = "MOBILE_APP";
    PaymentMode["WEB"] = "WEB";
    PaymentMode["AGENT"] = "AGENT";
})(PaymentMode || (PaymentMode = {}));
//# sourceMappingURL=payment-mode.enum.js.map