import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from '../../models/agent.model';
export declare class AgentDocumentsComponent implements OnInit {
    private route;
    private router;
    agent: Agent | null;
    constructor(route: ActivatedRoute, router: Router);
    ngOnInit(): void;
    goBack(): void;
}
//# sourceMappingURL=agent-documents.component.d.ts.map