// NOTE: not present in your SQL schema yet — assumed for the UI (physical vs
// virtual card badge). Drop or rename this if the backend models it
// differently, e.g. as a column on `cards` or on a separate `card_products` table.
export var CardType;
(function (CardType) {
    CardType["PHYSICAL"] = "PHYSICAL";
    CardType["VIRTUAL"] = "VIRTUAL";
})(CardType || (CardType = {}));
//# sourceMappingURL=card-type.enum.js.map