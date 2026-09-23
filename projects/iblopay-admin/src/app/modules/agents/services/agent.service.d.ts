import { Observable } from 'rxjs';
import { Agent, SubAgent, Electronic, Deposit } from '../models/agent.model';
export declare class AgentService {
    private mockAgents;
    getAgents(): Observable<Agent[]>;
    getAgentById(id: string): Observable<Agent>;
    createAgent(agentData: any): Observable<Agent>;
    updateAgent(id: string, agentData: any): Observable<Agent>;
    deleteAgent(id: string): Observable<void>;
    getAgentStats(): Observable<any>;
    getSubAgents(agentId: string): Observable<SubAgent[]>;
    getElectronics(agentId: string): Observable<Electronic[]>;
    getDeposits(agentId: string): Observable<Deposit[]>;
    searchAgents(query: string): Observable<Agent[]>;
}
//# sourceMappingURL=agent.service.d.ts.map