// Mirrors the Postgres `card_status_enum` type 1:1.
// Keep these two in sync — if a value is added/removed in SQL, update here too.
export var CardStatus;
(function (CardStatus) {
    CardStatus["NEUTRAL"] = "NEUTRAL";
    CardStatus["ACTIVE"] = "ACTIVE";
    CardStatus["BLOCKED"] = "BLOCKED";
    CardStatus["REPLACED"] = "REPLACED";
    CardStatus["CLOSED"] = "CLOSED";
    CardStatus["SUSPENDED"] = "SUSPENDED";
})(CardStatus || (CardStatus = {}));
//# sourceMappingURL=card-status.enum.js.map