// ADDITION beyond the requested enums/ list — needed to type sweep_transactions.status.
// Mirrors the Postgres `sweep_status_enum` type 1:1.
export var SweepStatus;
(function (SweepStatus) {
    SweepStatus["PENDING"] = "PENDING";
    SweepStatus["COMPLETED"] = "COMPLETED";
    SweepStatus["ROLLED_BACK"] = "ROLLED_BACK";
})(SweepStatus || (SweepStatus = {}));
//# sourceMappingURL=sweep-status.enum.js.map