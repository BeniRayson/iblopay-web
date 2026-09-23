import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from '../../services/agent.service';
export declare class AgentCreateComponent implements OnInit {
    private fb;
    private agentService;
    private router;
    agentForm: FormGroup;
    isLoading: boolean;
    provinces: string[];
    constructor(fb: FormBuilder, agentService: AgentService, router: Router);
    ngOnInit(): void;
    initForm(): void;
    passwordMatchValidator(g: FormGroup): any;
    onFileSelected(event: any): void;
    onSubmit(): void;
    cancel(): void;
}
//# sourceMappingURL=agent-create.component.d.ts.map