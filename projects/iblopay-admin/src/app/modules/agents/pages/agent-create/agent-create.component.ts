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
  showPassword = false;
  showConfirmPassword = false;

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
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      cin: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9 +()-]{8,20}$/)]],
      cardNumber: [''],
      province: ['', Validators.required],
      commune: ['', Validators.required],
      zone: ['', Validators.required],
      colline: [''],
      quartier: [''],
      nif: ['', [Validators.required, Validators.minLength(5)]],
      commerceRegister: ['', [Validators.required, Validators.minLength(5)]],
      approvalLetter: [null],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      status: ['ACTIVE', Validators.required],
      commissionRate: [0, [Validators.min(0), Validators.max(100)]],
      dailyLimit: [0, [Validators.min(0)]],
      initialBalance: [0, [Validators.min(0)]],
      allowAgentCreation: [true],
      allowCardManagement: [true],
      allowTransactions: [true],
      receiveReports: [false],
      notes: ['']
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(g: FormGroup): any {
    const password = g.get('password')?.value;
    const confirm = g.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
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
      email: formData.email,
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
      username: formData.username,
      status: formData.status,
      commissionRate: Number(formData.commissionRate || 0),
      dailyLimit: Number(formData.dailyLimit || 0),
      initialBalance: Number(formData.initialBalance || 0),
      permissions: {
        allowAgentCreation: formData.allowAgentCreation,
        allowCardManagement: formData.allowCardManagement,
        allowTransactions: formData.allowTransactions,
        receiveReports: formData.receiveReports
      },
      notes: formData.notes,
      approvalLetter: formData.approvalLetter ? `documents/approval_${Date.now()}.pdf` : undefined,
      approvalLetterName: formData.approvalLetter?.name || undefined
    };

    this.agentService.createAgent(agentData).subscribe({
      next: (agent) => {
        this.isLoading = false;
        this.router.navigate(['/agents', agent.id]);
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
