import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Agent } from '../models/agent.model';
import { AgentService } from './agent.service';
export declare class AgentResolver implements Resolve<Agent | null> {
    private agentService;
    constructor(agentService: AgentService);
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Agent | null>;
}
//# sourceMappingURL=agent-resolver.service.d.ts.map