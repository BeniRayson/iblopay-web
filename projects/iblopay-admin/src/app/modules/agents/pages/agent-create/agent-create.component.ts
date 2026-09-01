// src/app/modules/agents/pages/agent-create/agent-create.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AgentService } from '../../services/agent.service';

@Component({
  selector: 'app-agent-create',
  templateUrl: './agent-create.component.html',
  styleUrls: ['./agent-create.component.scss']
})
export class AgentCreateComponent implements OnInit {
  agentForm!: FormGroup;
  isLoading = false;
  
  provinces = [
    'Bujumbura Mairie', 'Bubanza', 'Bururi', 'Cankuzo', 'Cibitoke',
    'Gitega', 'Karuzi', 'Kayanza', 'Kirundo', 'Makamba',
    'Muramvya', 'Muyinga', 'Mwaro', 'Ngozi', 'Rutana', 'Ruyigi'
  ];

  constructor(
    private fb: FormBuilder,
    private agentService: AgentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.agentForm = this.fb.group({
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      cin: ['', [Validators.required, Validators.minLength(10)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{8,15}$/)]],
      cardNumber: ['', [Validators.required, Validators.minLength(10)]],
      province: ['', Validators.required],
      commune: ['', Validators.required],
      zone: ['', Validators.required],
      colline: [''],
      quartier: [''],
      nif: ['', [Validators.required, Validators.minLength(5)]],
      commerceRegister: ['', [Validators.required, Validators.minLength(5)]],
      approvalLetter: [null, Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(g: FormGroup): any {
    const password = g.get('password')?.value;
    const confirm = g.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.agentForm.patchValue({ approvalLetter: file });
    }
  }

  onSubmit(): void {
    if (this.agentForm.invalid) {
      this.agentForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = this.agentForm.value;
    
    const agentData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      cin: formData.cin,
      cardNumber: formData.cardNumber,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      province: formData.province,
      commune: formData.commune,
      zone: formData.zone,
      colline: formData.colline,
      quartier: formData.quartier,
      nif: formData.nif,
      commerceRegister: formData.commerceRegister,
      password: formData.password,
      approvalLetter: `documents/approval_${Date.now()}.pdf`,
      approvalLetterName: formData.approvalLetter?.name || 'approval_letter.pdf'
    };
    
    this.agentService.createAgent(agentData).subscribe({
      next: (agent) => {
        this.isLoading = false;
        this.router.navigate(['/agents/detail', agent.id]);
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/agents']);
  }
}