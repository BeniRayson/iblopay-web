// ADDITION beyond the requested enums/ list — needed to type commission_transactions.status.
// Mirrors the Postgres `commission_status_enum` type 1:1.
export var CommissionStatus;
(function (CommissionStatus) {
    CommissionStatus["PENDING"] = "PENDING";
    CommissionStatus["CREDITED"] = "CREDITED";
    CommissionStatus["FAILED"] = "FAILED";
})(CommissionStatus || (CommissionStatus = {}));
//# sourceMappingURL=commission-status.enum.js.map