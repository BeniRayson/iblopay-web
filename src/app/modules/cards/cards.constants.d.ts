import { CardStatus } from './enums/card-status.enum';
import { CardType } from './enums/card-type.enum';
export interface StatusMeta {
    label: string;
    color: string;
}
export declare const CARD_STATUS_META: Record<CardStatus, StatusMeta>;
export declare const CARD_TYPE_META: Record<CardType, {
    label: string;
    icon: string;
}>;
export declare const CARDS_ROUTE_PATHS: {
    list: string;
    detail: string;
    activation: string;
    distribution: string;
    stock: string;
};
//# sourceMappingURL=cards.constants.d.ts.map