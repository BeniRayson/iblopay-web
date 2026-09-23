import { CommissionType } from '../enums/commission-type.enum';
import { CommissionStatus } from '../enums/commission-status.enum';
export interface CommissionTransaction {
    commissionId: string;
    transactionId: string;
    agentId: string;
    amount: number;
    rate: number | null;
    commissionType: CommissionType;
    status: CommissionStatus;
    createdAt: string;
    creditedAt: string | null;
}
//# sourceMappingURL=commission-transaction.model.d.ts.map