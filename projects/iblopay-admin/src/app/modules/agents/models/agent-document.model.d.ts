export interface AgentDocument {
    id: string;
    agentId: string;
    type: DocumentType;
    name: string;
    filePath: string;
    fileName: string;
    fileSize: number;
    mimeType: string;
    uploadedAt: Date;
    verifiedAt?: Date;
    verifiedBy?: string;
    status: DocumentStatus;
    expiryDate?: Date;
    comments?: string;
}
export declare enum DocumentType {
    CIN = "CIN",
    PASSPORT = "PASSPORT",
    PROOF_OF_ADDRESS = "PROOF_OF_ADDRESS",
    BUSINESS_LICENSE = "BUSINESS_LICENSE",
    TAX_ID = "TAX_ID",
    PROFILE_PICTURE = "PROFILE_PICTURE",
    CONTRACT = "CONTRACT",
    OTHER = "OTHER"
}
export declare enum DocumentStatus {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
    REJECTED = "REJECTED",
    EXPIRED = "EXPIRED",
    REQUIRES_UPDATE = "REQUIRES_UPDATE"
}
//# sourceMappingURL=agent-document.model.d.ts.map