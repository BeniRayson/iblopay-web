export interface Agent {
    id: string;
    code: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cin: string;
    cardNumber: string;
    dateOfBirth: Date;
    address: AgentAddress;
    nif: string;
    commerceRegister: string;
    status: AgentStatus;
    type: AgentType;
    joinDate: Date;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    documents: AgentDocument[];
    electronics: Electronic[];
    deposits: Deposit[];
    agents: SubAgent[];
    profileImage?: string;
    approvalLetter?: string;
    password?: string;
}
export interface AgentAddress {
    province: string;
    commune: string;
    zone: string;
    colline?: string;
    quartier?: string;
    completeAddress: string;
    latitude?: string;
    longitude?: string;
}
export interface Electronic {
    id: string;
    type: 'PHONE' | 'TABLET' | 'POS_TERMINAL' | 'OTHER';
    brand: string;
    model: string;
    serialNumber: string;
    status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE' | 'LOST';
    assignedDate: Date;
    lastMaintenance?: Date;
    notes?: string;
    amountInCirculation: number;
    currency: string;
}
export interface Deposit {
    id: string;
    agentId: string;
    agentName: string;
    amount: number;
    currency: string;
    date: Date;
    status: 'PENDING' | 'COMPLETED' | 'FAILED';
    reference: string;
}
export interface SubAgent {
    id: string;
    code: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: string;
    joinDate: Date;
    transactions: Transaction[];
}
export interface Transaction {
    id: string;
    type: 'DEPOSIT' | 'TRANSFER' | 'WITHDRAWAL';
    amount: number;
    currency: string;
    date: Date;
    status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
    reference: string;
    description?: string;
}
export interface AgentDocument {
    id: string;
    agentId: string;
    type: DocumentType;
    name: string;
    filePath: string;
    fileName: string;
    uploadedAt: Date;
    status: 'PENDING' | 'VERIFIED' | 'REJECTED';
}
export declare enum DocumentType {
    CIN = "CIN",
    NIF = "NIF",
    COMMERCE_REGISTER = "COMMERCE_REGISTER",
    APPROVAL_LETTER = "APPROVAL_LETTER",
    PROFILE_PICTURE = "PROFILE_PICTURE"
}
export declare enum AgentStatus {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    SUSPENDED = "SUSPENDED",
    BLOCKED = "BLOCKED",
    INACTIVE = "INACTIVE"
}
export declare enum AgentType {
    SUPER_AGENT = "SUPER_AGENT",
    MASTER_AGENT = "MASTER_AGENT",
    AGENT = "AGENT",
    SUB_AGENT = "SUB_AGENT",
    RETAILER = "RETAILER"
}
//# sourceMappingURL=agent.model.d.ts.map