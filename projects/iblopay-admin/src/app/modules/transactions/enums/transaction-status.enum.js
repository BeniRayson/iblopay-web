// Mirrors the Postgres `transaction_status_enum` type 1:1.
export var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["PENDING"] = "PENDING";
    TransactionStatus["COMPLETED"] = "COMPLETED";
    TransactionStatus["FAILED"] = "FAILED";
    TransactionStatus["REVERSED"] = "REVERSED";
})(TransactionStatus || (TransactionStatus = {}));
//# sourceMappingURL=transaction-status.enum.js.map