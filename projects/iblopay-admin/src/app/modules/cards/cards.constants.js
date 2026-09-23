var _a, _b;
import { CardStatus } from './enums/card-status.enum';
import { CardType } from './enums/card-type.enum';
// Display metadata for each CardStatus. Keep in sync with card-status.enum.ts.
export var CARD_STATUS_META = (_a = {},
    _a[CardStatus.NEUTRAL] = { label: 'Not activated', color: '#8a8f98' },
    _a[CardStatus.ACTIVE] = { label: 'Active', color: '#1fae5b' },
    _a[CardStatus.BLOCKED] = { label: 'Blocked', color: '#e0932c' },
    _a[CardStatus.REPLACED] = { label: 'Replaced', color: '#6f6fef' },
    _a[CardStatus.CLOSED] = { label: 'Closed', color: '#e14b4b' },
    _a[CardStatus.SUSPENDED] = { label: 'Suspended', color: '#f2a90c' },
    _a);
export var CARD_TYPE_META = (_b = {},
    _b[CardType.PHYSICAL] = { label: 'Physical', icon: '💳' },
    _b[CardType.VIRTUAL] = { label: 'Virtual', icon: '🖥️' },
    _b);
export var CARDS_ROUTE_PATHS = {
    list: '',
    detail: ':id',
    activation: 'activation',
    distribution: 'distribution',
    stock: 'stock'
};
//# sourceMappingURL=cards.constants.js.map