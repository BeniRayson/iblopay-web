// src/app/modules/agents/services/agent-resolver.service.ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Agent } from '../models/agent.model';
import { AgentService } from './agent.service';

@Injectable({
  providedIn: 'root'
})
export class AgentResolver implements Resolve<Agent | null> {
  constructor(private agentService: AgentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Agent | null> {
    const id = route.paramMap.get('id');
    if (id) {
      return this.agentService.getAgentById(id);
    }
    return of(null);
  }
}