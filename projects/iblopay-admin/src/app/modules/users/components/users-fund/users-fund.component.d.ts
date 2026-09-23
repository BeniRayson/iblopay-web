import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';
interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    photoUrl: string;
    role: 'CLIENT' | 'AGENT' | 'SUPER_AGENT';
    status: 'ACTIVE' | 'SUSPENDED' | 'FROZEN' | 'CLOSED';
    cardNumber: string;
    cniNumber: string;
    address: {
        zone: string;
        commune: string;
        province: string;
        fullAddress: string;
    };
    createdAt: Date;
    createdBy: {
        id: string;
        firstName: string;
        lastName: string;
        role: string;
    };
    accountNumber: string;
    walletBalance: number;
}
interface Transaction {
    id: string;
    type: 'TRANSFER' | 'DEPOSIT' | 'WITHDRAWAL' | 'FUND' | 'COMMISSION';
    amount: number;
    date: Date;
    description: string;
    status: 'COMPLETED' | 'PENDING' | 'FAILED';
    from?: string;
    to?: string;
    reference?: string;
    commission?: number;
}
interface Commission {
    id: string;
    amount: number;
    date: Date;
    from: string;
    forTransaction: string;
    type: 'SEND' | 'RECEIVE';
    status: 'COMPLETED' | 'PENDING';
}
interface FundHistoryItem {
    id: string;
    amount: number;
    date: Date;
    reason: string;
    description: string;
    status: 'COMPLETED' | 'PENDING' | 'FAILED';
    adminName: string;
}
export declare class UsersFundComponent implements OnInit {
    private route;
    private router;
    private location;
    private fb;
    user: User | null;
    isLoading: boolean;
    isDarkMode: boolean;
    fundForm: FormGroup;
    fundLoading: boolean;
    fundError: string;
    fundSuccess: string;
    transactions: Transaction[];
    commissions: Commission[];
    fundHistory: FundHistoryItem[];
    transactionFilter: string;
    commissionFilter: string;
    totalTransactions: number;
    totalCommissions: number;
    totalFunds: number;
    private clientNames;
    private agentNames;
    private superAgentNames;
    constructor(route: ActivatedRoute, router: Router, location: Location, fb: FormBuilder);
    ngOnInit(): void;
    initFundForm(): void;
    loadTheme(): void;
    toggleTheme(): void;
    loadUser(id: string): void;
    private getMockUser;
    loadMockData(): void;
    private generateClientTransactions;
    private generateAgentTransactions;
    private generateAgentCommissions;
    private generateSuperAgentTransactions;
    private generateSuperAgentCommissions;
    private generateFundHistory;
    calculateStats(): void;
    goBack(): void;
    onSubmitFund(): void;
    get filteredTransactions(): Transaction[];
    get filteredCommissions(): Commission[];
    get allTransactions(): Transaction[];
    getDeposits(): Transaction[];
    getWithdrawals(): Transaction[];
    getTransfers(): Transaction[];
    getTotalDeposits(): number;
    getTotalWithdrawals(): number;
    getTotalTransfers(): number;
    getFieldError(fieldName: string): string;
    getInitials(firstName: string, lastName: string): string;
    getAvatarColor(id: string): string;
    getStatusLabel(status: string): string;
    getStatusClass(status: string): string;
    getRoleLabel(role: string): string;
    getRoleClass(role: string): string;
    getTransactionTypeLabel(type: string): string;
    getTransactionTypeClass(type: string): string;
    getTransactionStatusClass(status: string): string;
    getTransactionStatusLabel(status: string): string;
    getCommissionStatusClass(status: string): string;
    getCommissionStatusLabel(status: string): string;
    getFundReasonLabel(reason: string): string;
    getFundStatusClass(status: string): string;
    getFundStatusLabel(status: string): string;
    formatDate(date: Date): string;
    formatCurrency(amount: number): string;
    onFund(): void;
}
export {};
//# sourceMappingURL=users-fund.component.d.ts.map