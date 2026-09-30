import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from '../../models/agent.model';

@Component({
  selector: 'app-agent-documents',
  templateUrl: './agent-documents.component.html',
  styleUrls: ['./agent-documents.component.scss']})
export class AgentDocumentsComponent implements OnInit {
  agent: Agent | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.agent = data['agent'];
    });
  }

  goBack(): void {
    this.router.navigate(['/agents']);
  }
}
