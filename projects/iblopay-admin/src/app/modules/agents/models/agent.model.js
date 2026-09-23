// src/app/modules/agents/models/agent.model.ts
export var DocumentType;
(function (DocumentType) {
    DocumentType["CIN"] = "CIN";
    DocumentType["NIF"] = "NIF";
    DocumentType["COMMERCE_REGISTER"] = "COMMERCE_REGISTER";
    DocumentType["APPROVAL_LETTER"] = "APPROVAL_LETTER";
    DocumentType["PROFILE_PICTURE"] = "PROFILE_PICTURE";
})(DocumentType || (DocumentType = {}));
export var AgentStatus;
(function (AgentStatus) {
    AgentStatus["PENDING"] = "PENDING";
    AgentStatus["ACTIVE"] = "ACTIVE";
    AgentStatus["SUSPENDED"] = "SUSPENDED";
    AgentStatus["BLOCKED"] = "BLOCKED";
    AgentStatus["INACTIVE"] = "INACTIVE";
})(AgentStatus || (AgentStatus = {}));
export var AgentType;
(function (AgentType) {
    AgentType["SUPER_AGENT"] = "SUPER_AGENT";
    AgentType["MASTER_AGENT"] = "MASTER_AGENT";
    AgentType["AGENT"] = "AGENT";
    AgentType["SUB_AGENT"] = "SUB_AGENT";
    AgentType["RETAILER"] = "RETAILER";
})(AgentType || (AgentType = {}));
//# sourceMappingURL=agent.model.js.map