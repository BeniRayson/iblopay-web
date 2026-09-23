// Mirrors the Postgres `transaction_type_enum` type 1:1.
export var TransactionType;
(function (TransactionType) {
    TransactionType["DEPOSIT"] = "DEPOSIT";
    TransactionType["WITHDRAWAL"] = "WITHDRAWAL";
    TransactionType["TRANSFER"] = "TRANSFER";
    TransactionType["PAYMENT_NFC"] = "PAYMENT_NFC";
    TransactionType["SWEEP"] = "SWEEP";
    TransactionType["SWEEP_INVERSE"] = "SWEEP_INVERSE";
    TransactionType["COMMISSION"] = "COMMISSION";
    TransactionType["REIMBURSEMENT"] = "REIMBURSEMENT";
})(TransactionType || (TransactionType = {}));
//# sourceMappingURL=transaction-type.enum.js.map