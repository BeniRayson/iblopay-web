// src/app/modules/agents/services/agent.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Agent, AgentStatus, AgentType, SubAgent, Electronic, Deposit, Transaction } from '../models/agent.model';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
  private mockAgents: Agent[] = [
    // ================================================================
    // SUPER AGENT 1 - Jean Mukiza (5 agents)
    // ================================================================
    {
      id: '1',
      code: 'SA-001',
      firstName: 'Jean',
      lastName: 'Mukiza',
      email: 'jean.mukiza@iblopay.com',
      phone: '+257 79 900 11 22',
      cin: '1-234567-89012',
      cardNumber: 'CARTE-IBP-2024-0001',
      dateOfBirth: new Date('1980-05-15'),
      address: {
        province: 'Bujumbura Mairie',
        commune: 'Mukaza',
        zone: 'Nyakabiga',
        colline: 'Nyakabiga',
        quartier: 'Nyakabiga',
        completeAddress: 'Nyakabiga, Mukaza, Bujumbura',
        latitude: '-3.3860',
        longitude: '29.3583'
      },
      nif: 'NIF-123456789',
      commerceRegister: 'RC-2024-001',
      status: AgentStatus.ACTIVE,
      type: AgentType.SUPER_AGENT,
      joinDate: new Date('2024-01-01'),
      createdBy: 'admin@iblopay.com',
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01'),
      documents: [],
      electronics: [
        {
          id: 'e1',
          type: 'POS_TERMINAL',
          brand: 'Ingenico',
          model: 'Move 5000',
          serialNumber: 'SN-ING-2024-001',
          status: 'ACTIVE',
          assignedDate: new Date('2024-01-15'),
          notes: 'Terminal principal',
          amountInCirculation: 10000000,
          currency: 'BIF'
        },
        {
          id: 'e2',
          type: 'PHONE',
          brand: 'Samsung',
          model: 'Galaxy S24',
          serialNumber: 'SN-SAM-2024-002',
          status: 'ACTIVE',
          assignedDate: new Date('2024-02-01'),
          notes: 'Smartphone',
          amountInCirculation: 5000000,
          currency: 'BIF'
        }
      ],
      deposits: [
        {
          id: 'd1',
          agentId: '2',
          agentName: 'Marie Niyonzima',
          amount: 500000,
          currency: 'BIF',
          date: new Date('2024-06-10'),
          status: 'COMPLETED',
          reference: 'DEP-2024-001'
        },
        {
          id: 'd2',
          agentId: '3',
          agentName: 'Pierre Ndayishimiye',
          amount: 750000,
          currency: 'BIF',
          date: new Date('2024-06-12'),
          status: 'COMPLETED',
          reference: 'DEP-2024-002'
        },
        {
          id: 'd3',
          agentId: '4',
          agentName: 'Claire Iradukunda',
          amount: 300000,
          currency: 'BIF',
          date: new Date('2024-06-14'),
          status: 'PENDING',
          reference: 'DEP-2024-003'
        },
        {
          id: 'd4',
          agentId: '5',
          agentName: 'David Hakizimana',
          amount: 450000,
          currency: 'BIF',
          date: new Date('2024-06-15'),
          status: 'COMPLETED',
          reference: 'DEP-2024-004'
        },
        {
          id: 'd5',
          agentId: '6',
          agentName: 'Esther Niyonkuru',
          amount: 600000,
          currency: 'BIF',
          date: new Date('2024-06-16'),
          status: 'COMPLETED',
          reference: 'DEP-2024-005'
        }
      ],
      agents: [
        {
          id: '2',
          code: 'AG-001',
          firstName: 'Marie',
          lastName: 'Niyonzima',
          email: 'marie.niyonzima@iblopay.com',
          phone: '+257 79 900 33 44',
          status: 'ACTIVE',
          joinDate: new Date('2024-02-01'),
          transactions: [
            { id: 't1', type: 'DEPOSIT', amount: 500000, currency: 'BIF', date: new Date('2024-06-10'), status: 'COMPLETED', reference: 'TXN-2024-001', description: 'Dépôt initial' },
            { id: 't2', type: 'TRANSFER', amount: 100000, currency: 'BIF', date: new Date('2024-06-11'), status: 'COMPLETED', reference: 'TXN-2024-002', description: 'Transfert vers client' }
          ]
        },
        {
          id: '3',
          code: 'AG-002',
          firstName: 'Pierre',
          lastName: 'Ndayishimiye',
          email: 'pierre.ndayishimiye@iblopay.com',
          phone: '+257 79 900 55 66',
          status: 'ACTIVE',
          joinDate: new Date('2024-03-01'),
          transactions: [
            { id: 't3', type: 'DEPOSIT', amount: 750000, currency: 'BIF', date: new Date('2024-06-12'), status: 'COMPLETED', reference: 'TXN-2024-003', description: 'Dépôt' },
            { id: 't4', type: 'TRANSFER', amount: 200000, currency: 'BIF', date: new Date('2024-06-14'), status: 'PENDING', reference: 'TXN-2024-004', description: 'Transfert en attente' }
          ]
        },
        {
          id: '4',
          code: 'AG-003',
          firstName: 'Claire',
          lastName: 'Iradukunda',
          email: 'claire.iradukunda@iblopay.com',
          phone: '+257 79 900 77 88',
          status: 'PENDING',
          joinDate: new Date('2024-04-01'),
          transactions: [
            { id: 't5', type: 'DEPOSIT', amount: 300000, currency: 'BIF', date: new Date('2024-06-14'), status: 'PENDING', reference: 'TXN-2024-005', description: 'Dépôt en attente' }
          ]
        },
        {
          id: '5',
          code: 'AG-004',
          firstName: 'David',
          lastName: 'Hakizimana',
          email: 'david.hakizimana@iblopay.com',
          phone: '+257 79 900 88 99',
          status: 'ACTIVE',
          joinDate: new Date('2024-05-01'),
          transactions: [
            { id: 't6', type: 'DEPOSIT', amount: 450000, currency: 'BIF', date: new Date('2024-06-15'), status: 'COMPLETED', reference: 'TXN-2024-006', description: 'Dépôt' },
            { id: 't7', type: 'TRANSFER', amount: 150000, currency: 'BIF', date: new Date('2024-06-16'), status: 'COMPLETED', reference: 'TXN-2024-007', description: 'Transfert' }
          ]
        },
        {
          id: '6',
          code: 'AG-005',
          firstName: 'Esther',
          lastName: 'Niyonkuru',
          email: 'esther.niyonkuru@iblopay.com',
          phone: '+257 79 900 99 00',
          status: 'ACTIVE',
          joinDate: new Date('2024-06-01'),
          transactions: [
            { id: 't8', type: 'DEPOSIT', amount: 600000, currency: 'BIF', date: new Date('2024-06-17'), status: 'COMPLETED', reference: 'TXN-2024-008', description: 'Dépôt' }
          ]
        }
      ]
    },
    // ================================================================
    // SUPER AGENT 2 - Marie Ndayisenga (5 agents)
    // ================================================================
    {
      id: '2',
      code: 'SA-002',
      firstName: 'Marie',
      lastName: 'Ndayisenga',
      email: 'marie.ndayisenga@iblopay.com',
      phone: '+257 79 900 22 33',
      cin: '2-345678-90123',
      cardNumber: 'CARTE-IBP-2024-0002',
      dateOfBirth: new Date('1985-08-20'),
      address: {
        province: 'Bujumbura',
        commune: 'Bujumbura Mairie',
        zone: 'Kinindo',
        colline: 'Kinindo',
        quartier: 'Kinindo',
        completeAddress: 'Kinindo, Bujumbura Mairie, Bujumbura',
        latitude: '-3.3760',
        longitude: '29.3633'
      },
      nif: 'NIF-234567890',
      commerceRegister: 'RC-2024-002',
      status: AgentStatus.ACTIVE,
      type: AgentType.SUPER_AGENT,
      joinDate: new Date('2024-02-01'),
      createdBy: 'admin@iblopay.com',
      createdAt: new Date('2024-02-01'),
      updatedAt: new Date('2024-02-01'),
      documents: [],
      electronics: [
        {
          id: 'e4',
          type: 'POS_TERMINAL',
          brand: 'Verifone',
          model: 'VX 520',
          serialNumber: 'SN-VER-2024-004',
          status: 'ACTIVE',
          assignedDate: new Date('2024-03-01'),
          amountInCirculation: 8000000,
          currency: 'BIF'
        }
      ],
      deposits: [
        { id: 'd6', agentId: '7', agentName: 'Fabrice Nkurunziza', amount: 200000, currency: 'BIF', date: new Date('2024-07-01'), status: 'COMPLETED', reference: 'DEP-2024-006' },
        { id: 'd7', agentId: '8', agentName: 'Grace Ndayishimiye', amount: 350000, currency: 'BIF', date: new Date('2024-07-05'), status: 'COMPLETED', reference: 'DEP-2024-007' },
        { id: 'd8', agentId: '9', agentName: 'Henry Muhirwa', amount: 500000, currency: 'BIF', date: new Date('2024-07-10'), status: 'PENDING', reference: 'DEP-2024-008' },
        { id: 'd9', agentId: '10', agentName: 'Isabelle Niyonkuru', amount: 700000, currency: 'BIF', date: new Date('2024-07-15'), status: 'COMPLETED', reference: 'DEP-2024-009' },
        { id: 'd10', agentId: '11', agentName: 'Jean Paul Niyonzima', amount: 250000, currency: 'BIF', date: new Date('2024-07-20'), status: 'COMPLETED', reference: 'DEP-2024-010' }
      ],
      agents: [
        {
          id: '7',
          code: 'AG-006',
          firstName: 'Fabrice',
          lastName: 'Nkurunziza',
          email: 'fabrice.nkurunziza@iblopay.com',
          phone: '+257 79 900 77 88',
          status: 'SUSPENDED',
          joinDate: new Date('2024-07-01'),
          transactions: [
            { id: 't9', type: 'DEPOSIT', amount: 200000, currency: 'BIF', date: new Date('2024-07-01'), status: 'COMPLETED', reference: 'TXN-2024-009', description: 'Dépôt' }
          ]
        },
        {
          id: '8',
          code: 'AG-007',
          firstName: 'Grace',
          lastName: 'Ndayishimiye',
          email: 'grace.ndayishimiye@iblopay.com',
          phone: '+257 79 900 88 99',
          status: 'PENDING',
          joinDate: new Date('2024-07-05'),
          transactions: [
            { id: 't10', type: 'DEPOSIT', amount: 350000, currency: 'BIF', date: new Date('2024-07-05'), status: 'PENDING', reference: 'TXN-2024-010', description: 'Dépôt en attente' }
          ]
        },
        {
          id: '9',
          code: 'AG-008',
          firstName: 'Henry',
          lastName: 'Muhirwa',
          email: 'henry.muhirwa@iblopay.com',
          phone: '+257 79 900 99 00',
          status: 'BLOCKED',
          joinDate: new Date('2024-07-10'),
          transactions: [
            { id: 't11', type: 'DEPOSIT', amount: 500000, currency: 'BIF', date: new Date('2024-07-10'), status: 'COMPLETED', reference: 'TXN-2024-011', description: 'Dépôt' }
          ]
        },
        {
          id: '10',
          code: 'AG-009',
          firstName: 'Isabelle',
          lastName: 'Niyonkuru',
          email: 'isabelle.niyonkuru@iblopay.com',
          phone: '+257 79 900 00 11',
          status: 'ACTIVE',
          joinDate: new Date('2024-07-15'),
          transactions: [
            { id: 't12', type: 'DEPOSIT', amount: 700000, currency: 'BIF', date: new Date('2024-07-15'), status: 'COMPLETED', reference: 'TXN-2024-012', description: 'Dépôt' },
            { id: 't13', type: 'TRANSFER', amount: 300000, currency: 'BIF', date: new Date('2024-07-16'), status: 'COMPLETED', reference: 'TXN-2024-013', description: 'Transfert' }
          ]
        },
        {
          id: '11',
          code: 'AG-010',
          firstName: 'Jean Paul',
          lastName: 'Niyonzima',
          email: 'jeanpaul.niyonzima@iblopay.com',
          phone: '+257 79 900 11 33',
          status: 'ACTIVE',
          joinDate: new Date('2024-07-20'),
          transactions: [
            { id: 't14', type: 'DEPOSIT', amount: 250000, currency: 'BIF', date: new Date('2024-07-20'), status: 'COMPLETED', reference: 'TXN-2024-014', description: 'Dépôt' }
          ]
        }
      ]
    },
    // ================================================================
    // SUPER AGENT 3 - Pierre Ndayishimiye (5 agents)
    // ================================================================
    {
      id: '3',
      code: 'SA-003',
      firstName: 'Pierre',
      lastName: 'Ndayishimiye',
      email: 'pierre.ndayishimiye@iblopay.com',
      phone: '+257 79 900 33 44',
      cin: '3-456789-01234',
      cardNumber: 'CARTE-IBP-2024-0003',
      dateOfBirth: new Date('1978-12-10'),
      address: {
        province: 'Gitega',
        commune: 'Gitega',
        zone: 'Centre',
        colline: 'Gitega',
        quartier: 'Gitega',
        completeAddress: 'Centre, Gitega, Gitega',
        latitude: '-3.4264',
        longitude: '29.9302'
      },
      nif: 'NIF-345678901',
      commerceRegister: 'RC-2024-003',
      status: AgentStatus.ACTIVE,
      type: AgentType.SUPER_AGENT,
      joinDate: new Date('2024-03-01'),
      createdBy: 'admin@iblopay.com',
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-01'),
      documents: [],
      electronics: [
        {
          id: 'e5',
          type: 'TABLET',
          brand: 'Apple',
          model: 'iPad Pro',
          serialNumber: 'SN-APP-2024-005',
          status: 'ACTIVE',
          assignedDate: new Date('2024-04-01'),
          amountInCirculation: 3000000,
          currency: 'BIF'
        },
        {
          id: 'e6',
          type: 'PHONE',
          brand: 'iPhone',
          model: '15 Pro Max',
          serialNumber: 'SN-IPH-2024-006',
          status: 'ACTIVE',
          assignedDate: new Date('2024-05-01'),
          amountInCirculation: 2000000,
          currency: 'BIF'
        }
      ],
      deposits: [
        { id: 'd11', agentId: '12', agentName: 'Alice Niyomwungere', amount: 400000, currency: 'BIF', date: new Date('2024-08-01'), status: 'COMPLETED', reference: 'DEP-2024-011' },
        { id: 'd12', agentId: '13', agentName: 'Emmanuel Ndayishimiye', amount: 550000, currency: 'BIF', date: new Date('2024-08-05'), status: 'COMPLETED', reference: 'DEP-2024-012' },
        { id: 'd13', agentId: '14', agentName: 'Rosine Niyonzima', amount: 320000, currency: 'BIF', date: new Date('2024-08-10'), status: 'PENDING', reference: 'DEP-2024-013' },
        { id: 'd14', agentId: '15', agentName: 'Olivier Nkurunziza', amount: 480000, currency: 'BIF', date: new Date('2024-08-15'), status: 'COMPLETED', reference: 'DEP-2024-014' },
        { id: 'd15', agentId: '16', agentName: 'Pascaline Niyonkuru', amount: 600000, currency: 'BIF', date: new Date('2024-08-20'), status: 'COMPLETED', reference: 'DEP-2024-015' }
      ],
      agents: [
        {
          id: '12',
          code: 'AG-011',
          firstName: 'Alice',
          lastName: 'Niyomwungere',
          email: 'alice.niyomwungere@iblopay.com',
          phone: '+257 79 900 12 34',
          status: 'ACTIVE',
          joinDate: new Date('2024-08-01'),
          transactions: [
            { id: 't15', type: 'DEPOSIT', amount: 400000, currency: 'BIF', date: new Date('2024-08-01'), status: 'COMPLETED', reference: 'TXN-2024-015', description: 'Dépôt' }
          ]
        },
        {
          id: '13',
          code: 'AG-012',
          firstName: 'Emmanuel',
          lastName: 'Ndayishimiye',
          email: 'emmanuel.ndayishimiye@iblopay.com',
          phone: '+257 79 900 23 45',
          status: 'ACTIVE',
          joinDate: new Date('2024-08-05'),
          transactions: [
            { id: 't16', type: 'DEPOSIT', amount: 550000, currency: 'BIF', date: new Date('2024-08-05'), status: 'COMPLETED', reference: 'TXN-2024-016', description: 'Dépôt' },
            { id: 't17', type: 'TRANSFER', amount: 200000, currency: 'BIF', date: new Date('2024-08-06'), status: 'COMPLETED', reference: 'TXN-2024-017', description: 'Transfert' }
          ]
        },
        {
          id: '14',
          code: 'AG-013',
          firstName: 'Rosine',
          lastName: 'Niyonzima',
          email: 'rosine.niyonzima@iblopay.com',
          phone: '+257 79 900 34 56',
          status: 'PENDING',
          joinDate: new Date('2024-08-10'),
          transactions: [
            { id: 't18', type: 'DEPOSIT', amount: 320000, currency: 'BIF', date: new Date('2024-08-10'), status: 'PENDING', reference: 'TXN-2024-018', description: 'Dépôt en attente' }
          ]
        },
        {
          id: '15',
          code: 'AG-014',
          firstName: 'Olivier',
          lastName: 'Nkurunziza',
          email: 'olivier.nkurunziza@iblopay.com',
          phone: '+257 79 900 45 67',
          status: 'ACTIVE',
          joinDate: new Date('2024-08-15'),
          transactions: [
            { id: 't19', type: 'DEPOSIT', amount: 480000, currency: 'BIF', date: new Date('2024-08-15'), status: 'COMPLETED', reference: 'TXN-2024-019', description: 'Dépôt' }
          ]
        },
        {
          id: '16',
          code: 'AG-015',
          firstName: 'Pascaline',
          lastName: 'Niyonkuru',
          email: 'pascaline.niyonkuru@iblopay.com',
          phone: '+257 79 900 56 78',
          status: 'ACTIVE',
          joinDate: new Date('2024-08-20'),
          transactions: [
            { id: 't20', type: 'DEPOSIT', amount: 600000, currency: 'BIF', date: new Date('2024-08-20'), status: 'COMPLETED', reference: 'TXN-2024-020', description: 'Dépôt' }
          ]
        }
      ]
    },
    // ================================================================
    // SUPER AGENT 4 - Claire Iradukunda (5 agents)
    // ================================================================
    {
      id: '4',
      code: 'SA-004',
      firstName: 'Claire',
      lastName: 'Iradukunda',
      email: 'claire.iradukunda@iblopay.com',
      phone: '+257 79 900 44 55',
      cin: '4-567890-12345',
      cardNumber: 'CARTE-IBP-2024-0004',
      dateOfBirth: new Date('1990-03-25'),
      address: {
        province: 'Bujumbura Mairie',
        commune: 'Ntahangwa',
        zone: 'Rohero',
        colline: 'Rohero',
        quartier: 'Rohero',
        completeAddress: 'Rohero, Ntahangwa, Bujumbura',
        latitude: '-3.3760',
        longitude: '29.3633'
      },
      nif: 'NIF-456789012',
      commerceRegister: 'RC-2024-004',
      status: AgentStatus.PENDING,
      type: AgentType.SUPER_AGENT,
      joinDate: new Date('2024-04-01'),
      createdBy: 'admin@iblopay.com',
      createdAt: new Date('2024-04-01'),
      updatedAt: new Date('2024-04-01'),
      documents: [],
      electronics: [],
      deposits: [
        { id: 'd16', agentId: '17', agentName: 'Thierry Niyonzima', amount: 280000, currency: 'BIF', date: new Date('2024-09-01'), status: 'PENDING', reference: 'DEP-2024-016' },
        { id: 'd17', agentId: '18', agentName: 'Catherine Ndayishimiye', amount: 420000, currency: 'BIF', date: new Date('2024-09-05'), status: 'COMPLETED', reference: 'DEP-2024-017' },
        { id: 'd18', agentId: '19', agentName: 'Michel Nkurunziza', amount: 350000, currency: 'BIF', date: new Date('2024-09-10'), status: 'PENDING', reference: 'DEP-2024-018' },
        { id: 'd19', agentId: '20', agentName: 'Françoise Niyonkuru', amount: 500000, currency: 'BIF', date: new Date('2024-09-15'), status: 'COMPLETED', reference: 'DEP-2024-019' },
        { id: 'd20', agentId: '21', agentName: 'Jean Claude Ndayisenga', amount: 450000, currency: 'BIF', date: new Date('2024-09-20'), status: 'COMPLETED', reference: 'DEP-2024-020' }
      ],
      agents: [
        {
          id: '17',
          code: 'AG-016',
          firstName: 'Thierry',
          lastName: 'Niyonzima',
          email: 'thierry.niyonzima@iblopay.com',
          phone: '+257 79 900 67 89',
          status: 'PENDING',
          joinDate: new Date('2024-09-01'),
          transactions: [
            { id: 't21', type: 'DEPOSIT', amount: 280000, currency: 'BIF', date: new Date('2024-09-01'), status: 'PENDING', reference: 'TXN-2024-021', description: 'Dépôt en attente' }
          ]
        },
        {
          id: '18',
          code: 'AG-017',
          firstName: 'Catherine',
          lastName: 'Ndayishimiye',
          email: 'catherine.ndayishimiye@iblopay.com',
          phone: '+257 79 900 78 90',
          status: 'ACTIVE',
          joinDate: new Date('2024-09-05'),
          transactions: [
            { id: 't22', type: 'DEPOSIT', amount: 420000, currency: 'BIF', date: new Date('2024-09-05'), status: 'COMPLETED', reference: 'TXN-2024-022', description: 'Dépôt' }
          ]
        },
        {
          id: '19',
          code: 'AG-018',
          firstName: 'Michel',
          lastName: 'Nkurunziza',
          email: 'michel.nkurunziza@iblopay.com',
          phone: '+257 79 900 89 01',
          status: 'PENDING',
          joinDate: new Date('2024-09-10'),
          transactions: [
            { id: 't23', type: 'DEPOSIT', amount: 350000, currency: 'BIF', date: new Date('2024-09-10'), status: 'PENDING', reference: 'TXN-2024-023', description: 'Dépôt en attente' }
          ]
        },
        {
          id: '20',
          code: 'AG-019',
          firstName: 'Françoise',
          lastName: 'Niyonkuru',
          email: 'francoise.niyonkuru@iblopay.com',
          phone: '+257 79 900 90 12',
          status: 'ACTIVE',
          joinDate: new Date('2024-09-15'),
          transactions: [
            { id: 't24', type: 'DEPOSIT', amount: 500000, currency: 'BIF', date: new Date('2024-09-15'), status: 'COMPLETED', reference: 'TXN-2024-024', description: 'Dépôt' },
            { id: 't25', type: 'TRANSFER', amount: 150000, currency: 'BIF', date: new Date('2024-09-16'), status: 'COMPLETED', reference: 'TXN-2024-025', description: 'Transfert' }
          ]
        },
        {
          id: '21',
          code: 'AG-020',
          firstName: 'Jean Claude',
          lastName: 'Ndayisenga',
          email: 'jeanclaude.ndayisenga@iblopay.com',
          phone: '+257 79 900 01 23',
          status: 'ACTIVE',
          joinDate: new Date('2024-09-20'),
          transactions: [
            { id: 't26', type: 'DEPOSIT', amount: 450000, currency: 'BIF', date: new Date('2024-09-20'), status: 'COMPLETED', reference: 'TXN-2024-026', description: 'Dépôt' }
          ]
        }
      ]
    },
    // ================================================================
    // SUPER AGENT 5 - David Hakizimana (5 agents)
    // ================================================================
    {
      id: '5',
      code: 'SA-005',
      firstName: 'David',
      lastName: 'Hakizimana',
      email: 'david.hakizimana@iblopay.com',
      phone: '+257 79 900 55 66',
      cin: '5-678901-23456',
      cardNumber: 'CARTE-IBP-2024-0005',
      dateOfBirth: new Date('1982-07-15'),
      address: {
        province: 'Muyinga',
        commune: 'Muyinga',
        zone: 'Centre',
        colline: 'Muyinga',
        quartier: 'Muyinga',
        completeAddress: 'Centre, Muyinga, Muyinga',
        latitude: '-2.8490',
        longitude: '30.3414'
      },
      nif: 'NIF-567890123',
      commerceRegister: 'RC-2024-005',
      status: AgentStatus.ACTIVE,
      type: AgentType.SUPER_AGENT,
      joinDate: new Date('2024-05-01'),
      createdBy: 'admin@iblopay.com',
      createdAt: new Date('2024-05-01'),
      updatedAt: new Date('2024-05-01'),
      documents: [],
      electronics: [
        {
          id: 'e7',
          type: 'POS_TERMINAL',
          brand: 'Ingenico',
          model: 'Move 5000',
          serialNumber: 'SN-ING-2024-007',
          status: 'ACTIVE',
          assignedDate: new Date('2024-06-01'),
          amountInCirculation: 6000000,
          currency: 'BIF'
        }
      ],
      deposits: [
        { id: 'd21', agentId: '22', agentName: 'Aimé Niyonzima', amount: 380000, currency: 'BIF', date: new Date('2024-10-01'), status: 'COMPLETED', reference: 'DEP-2024-021' },
        { id: 'd22', agentId: '23', agentName: 'Béatrice Ndayishimiye', amount: 520000, currency: 'BIF', date: new Date('2024-10-05'), status: 'COMPLETED', reference: 'DEP-2024-022' },
        { id: 'd23', agentId: '24', agentName: 'Charles Nkurunziza', amount: 300000, currency: 'BIF', date: new Date('2024-10-10'), status: 'PENDING', reference: 'DEP-2024-023' },
        { id: 'd24', agentId: '25', agentName: 'Diane Niyonkuru', amount: 650000, currency: 'BIF', date: new Date('2024-10-15'), status: 'COMPLETED', reference: 'DEP-2024-024' },
        { id: 'd25', agentId: '26', agentName: 'Eric Ndayisenga', amount: 420000, currency: 'BIF', date: new Date('2024-10-20'), status: 'COMPLETED', reference: 'DEP-2024-025' }
      ],
      agents: [
        {
          id: '22',
          code: 'AG-021',
          firstName: 'Aimé',
          lastName: 'Niyonzima',
          email: 'aime.niyonzima@iblopay.com',
          phone: '+257 79 900 12 34',
          status: 'ACTIVE',
          joinDate: new Date('2024-10-01'),
          transactions: [
            { id: 't27', type: 'DEPOSIT', amount: 380000, currency: 'BIF', date: new Date('2024-10-01'), status: 'COMPLETED', reference: 'TXN-2024-027', description: 'Dépôt' }
          ]
        },
        {
          id: '23',
          code: 'AG-022',
          firstName: 'Béatrice',
          lastName: 'Ndayishimiye',
          email: 'beatrice.ndayishimiye@iblopay.com',
          phone: '+257 79 900 23 45',
          status: 'ACTIVE',
          joinDate: new Date('2024-10-05'),
          transactions: [
            { id: 't28', type: 'DEPOSIT', amount: 520000, currency: 'BIF', date: new Date('2024-10-05'), status: 'COMPLETED', reference: 'TXN-2024-028', description: 'Dépôt' }
          ]
        },
        {
          id: '24',
          code: 'AG-023',
          firstName: 'Charles',
          lastName: 'Nkurunziza',
          email: 'charles.nkurunziza@iblopay.com',
          phone: '+257 79 900 34 56',
          status: 'PENDING',
          joinDate: new Date('2024-10-10'),
          transactions: [
            { id: 't29', type: 'DEPOSIT', amount: 300000, currency: 'BIF', date: new Date('2024-10-10'), status: 'PENDING', reference: 'TXN-2024-029', description: 'Dépôt en attente' }
          ]
        },
        {
          id: '25',
          code: 'AG-024',
          firstName: 'Diane',
          lastName: 'Niyonkuru',
          email: 'diane.niyonkuru@iblopay.com',
          phone: '+257 79 900 45 67',
          status: 'ACTIVE',
          joinDate: new Date('2024-10-15'),
          transactions: [
            { id: 't30', type: 'DEPOSIT', amount: 650000, currency: 'BIF', date: new Date('2024-10-15'), status: 'COMPLETED', reference: 'TXN-2024-030', description: 'Dépôt' },
            { id: 't31', type: 'TRANSFER', amount: 250000, currency: 'BIF', date: new Date('2024-10-16'), status: 'COMPLETED', reference: 'TXN-2024-031', description: 'Transfert' }
          ]
        },
        {
          id: '26',
          code: 'AG-025',
          firstName: 'Eric',
          lastName: 'Ndayisenga',
          email: 'eric.ndayisenga@iblopay.com',
          phone: '+257 79 900 56 78',
          status: 'ACTIVE',
          joinDate: new Date('2024-10-20'),
          transactions: [
            { id: 't32', type: 'DEPOSIT', amount: 420000, currency: 'BIF', date: new Date('2024-10-20'), status: 'COMPLETED', reference: 'TXN-2024-032', description: 'Dépôt' }
          ]
        }
      ]
    },
    // ================================================================
    // SUPER AGENT 6 - Esther Niyonzima (5 agents)
    // ================================================================
    {
      id: '6',
      code: 'SA-006',
      firstName: 'Esther',
      lastName: 'Niyonzima',
      email: 'esther.niyonzima@iblopay.com',
      phone: '+257 79 900 66 77',
      cin: '6-789012-34567',
      cardNumber: 'CARTE-IBP-2024-0006',
      dateOfBirth: new Date('1988-11-30'),
      address: {
        province: 'Ngozi',
        commune: 'Ngozi',
        zone: 'Centre',
        colline: 'Ngozi',
        quartier: 'Ngozi',
        completeAddress: 'Centre, Ngozi, Ngozi',
        latitude: '-2.9000',
        longitude: '29.8333'
      },
      nif: 'NIF-678901234',
      commerceRegister: 'RC-2024-006',
      status: AgentStatus.ACTIVE,
      type: AgentType.SUPER_AGENT,
      joinDate: new Date('2024-06-01'),
      createdBy: 'admin@iblopay.com',
      createdAt: new Date('2024-06-01'),
      updatedAt: new Date('2024-06-01'),
      documents: [],
      electronics: [
        {
          id: 'e8',
          type: 'PHONE',
          brand: 'Samsung',
          model: 'Galaxy S23',
          serialNumber: 'SN-SAM-2024-008',
          status: 'ACTIVE',
          assignedDate: new Date('2024-07-01'),
          amountInCirculation: 4000000,
          currency: 'BIF'
        }
      ],
      deposits: [
        { id: 'd26', agentId: '27', agentName: 'Félicien Niyonzima', amount: 350000, currency: 'BIF', date: new Date('2024-11-01'), status: 'COMPLETED', reference: 'DEP-2024-026' },
        { id: 'd27', agentId: '28', agentName: 'Gisèle Ndayishimiye', amount: 480000, currency: 'BIF', date: new Date('2024-11-05'), status: 'COMPLETED', reference: 'DEP-2024-027' },
        { id: 'd28', agentId: '29', agentName: 'Hervé Nkurunziza', amount: 320000, currency: 'BIF', date: new Date('2024-11-10'), status: 'PENDING', reference: 'DEP-2024-028' },
        { id: 'd29', agentId: '30', agentName: 'Inès Niyonkuru', amount: 550000, currency: 'BIF', date: new Date('2024-11-15'), status: 'COMPLETED', reference: 'DEP-2024-029' },
        { id: 'd30', agentId: '31', agentName: 'Jacques Ndayisenga', amount: 400000, currency: 'BIF', date: new Date('2024-11-20'), status: 'COMPLETED', reference: 'DEP-2024-030' }
      ],
      agents: [
        {
          id: '27',
          code: 'AG-026',
          firstName: 'Félicien',
          lastName: 'Niyonzima',
          email: 'felicien.niyonzima@iblopay.com',
          phone: '+257 79 900 67 89',
          status: 'ACTIVE',
          joinDate: new Date('2024-11-01'),
          transactions: [
            { id: 't33', type: 'DEPOSIT', amount: 350000, currency: 'BIF', date: new Date('2024-11-01'), status: 'COMPLETED', reference: 'TXN-2024-033', description: 'Dépôt' }
          ]
        },
        {
          id: '28',
          code: 'AG-027',
          firstName: 'Gisèle',
          lastName: 'Ndayishimiye',
          email: 'gisele.ndayishimiye@iblopay.com',
          phone: '+257 79 900 78 90',
          status: 'ACTIVE',
          joinDate: new Date('2024-11-05'),
          transactions: [
            { id: 't34', type: 'DEPOSIT', amount: 480000, currency: 'BIF', date: new Date('2024-11-05'), status: 'COMPLETED', reference: 'TXN-2024-034', description: 'Dépôt' }
          ]
        },
        {
          id: '29',
          code: 'AG-028',
          firstName: 'Hervé',
          lastName: 'Nkurunziza',
          email: 'herve.nkurunziza@iblopay.com',
          phone: '+257 79 900 89 01',
          status: 'PENDING',
          joinDate: new Date('2024-11-10'),
          transactions: [
            { id: 't35', type: 'DEPOSIT', amount: 320000, currency: 'BIF', date: new Date('2024-11-10'), status: 'PENDING', reference: 'TXN-2024-035', description: 'Dépôt en attente' }
          ]
        },
        {
          id: '30',
          code: 'AG-029',
          firstName: 'Inès',
          lastName: 'Niyonkuru',
          email: 'ines.niyonkuru@iblopay.com',
          phone: '+257 79 900 90 12',
          status: 'ACTIVE',
          joinDate: new Date('2024-11-15'),
          transactions: [
            { id: 't36', type: 'DEPOSIT', amount: 550000, currency: 'BIF', date: new Date('2024-11-15'), status: 'COMPLETED', reference: 'TXN-2024-036', description: 'Dépôt' },
            { id: 't37', type: 'TRANSFER', amount: 200000, currency: 'BIF', date: new Date('2024-11-16'), status: 'COMPLETED', reference: 'TXN-2024-037', description: 'Transfert' }
          ]
        },
        {
          id: '31',
          code: 'AG-030',
          firstName: 'Jacques',
          lastName: 'Ndayisenga',
          email: 'jacques.ndayisenga@iblopay.com',
          phone: '+257 79 900 01 23',
          status: 'ACTIVE',
          joinDate: new Date('2024-11-20'),
          transactions: [
            { id: 't38', type: 'DEPOSIT', amount: 400000, currency: 'BIF', date: new Date('2024-11-20'), status: 'COMPLETED', reference: 'TXN-2024-038', description: 'Dépôt' }
          ]
        }
      ]
    },
    // ================================================================
    // SUPER AGENT 7 à 10 (sans agents pour l'instant)
    // ================================================================
    {
      id: '7',
      code: 'SA-007',
      firstName: 'Fabrice',
      lastName: 'Nkurunziza',
      email: 'fabrice.nkurunziza@iblopay.com',
      phone: '+257 79 900 77 88',
      cin: '7-890123-45678',
      cardNumber: 'CARTE-IBP-2024-0007',
      dateOfBirth: new Date('1975-04-20'),
      address: {
        province: 'Bururi',
        commune: 'Bururi',
        zone: 'Centre',
        colline: 'Bururi',
        quartier: 'Bururi',
        completeAddress: 'Centre, Bururi, Bururi',
        latitude: '-3.9500',
        longitude: '29.6167'
      },
      nif: 'NIF-789012345',
      commerceRegister: 'RC-2024-007',
      status: AgentStatus.SUSPENDED,
      type: AgentType.SUPER_AGENT,
      joinDate: new Date('2024-07-01'),
      createdBy: 'admin@iblopay.com',
      createdAt: new Date('2024-07-01'),
      updatedAt: new Date('2024-07-01'),
      documents: [],
      electronics: [],
      deposits: [],
      agents: []
    },
    {
      id: '8',
      code: 'SA-008',
      firstName: 'Grace',
      lastName: 'Ndayishimiye',
      email: 'grace.ndayishimiye@iblopay.com',
      phone: '+257 79 900 88 99',
      cin: '8-901234-56789',
      cardNumber: 'CARTE-IBP-2024-0008',
      dateOfBirth: new Date('1992-09-10'),
      address: {
        province: 'Cankuzo',
        commune: 'Cankuzo',
        zone: 'Centre',
        colline: 'Cankuzo',
        quartier: 'Cankuzo',
        completeAddress: 'Centre, Cankuzo, Cankuzo',
        latitude: '-3.2167',
        longitude: '30.5500'
      },
      nif: 'NIF-890123456',
      commerceRegister: 'RC-2024-008',
      status: AgentStatus.PENDING,
      type: AgentType.SUPER_AGENT,
      joinDate: new Date('2024-08-01'),
      createdBy: 'admin@iblopay.com',
      createdAt: new Date('2024-08-01'),
      updatedAt: new Date('2024-08-01'),
      documents: [],
      electronics: [],
      deposits: [],
      agents: []
    },
    {
      id: '9',
      code: 'SA-009',
      firstName: 'Henry',
      lastName: 'Muhirwa',
      email: 'henry.muhirwa@iblopay.com',
      phone: '+257 79 900 99 00',
      cin: '9-012345-67890',
      cardNumber: 'CARTE-IBP-2024-0009',
      dateOfBirth: new Date('1983-06-05'),
      address: {
        province: 'Ruyigi',
        commune: 'Ruyigi',
        zone: 'Centre',
        colline: 'Ruyigi',
        quartier: 'Ruyigi',
        completeAddress: 'Centre, Ruyigi, Ruyigi',
        latitude: '-3.4667',
        longitude: '30.2500'
      },
      nif: 'NIF-901234567',
      commerceRegister: 'RC-2024-009',
      status: AgentStatus.BLOCKED,
      type: AgentType.SUPER_AGENT,
      joinDate: new Date('2024-09-01'),
      createdBy: 'admin@iblopay.com',
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-09-01'),
      documents: [],
      electronics: [
        {
          id: 'e9',
          type: 'TABLET',
          brand: 'Samsung',
          model: 'Galaxy Tab S9',
          serialNumber: 'SN-SAM-2024-009',
          status: 'INACTIVE',
          assignedDate: new Date('2024-10-01'),
          amountInCirculation: 2500000,
          currency: 'BIF'
        }
      ],
      deposits: [],
      agents: []
    },
    {
      id: '10',
      code: 'SA-010',
      firstName: 'Isabelle',
      lastName: 'Niyonkuru',
      email: 'isabelle.niyonkuru@iblopay.com',
      phone: '+257 79 900 00 11',
      cin: '0-123456-78901',
      cardNumber: 'CARTE-IBP-2024-0010',
      dateOfBirth: new Date('1987-01-25'),
      address: {
        province: 'Kayanza',
        commune: 'Kayanza',
        zone: 'Centre',
        colline: 'Kayanza',
        quartier: 'Kayanza',
        completeAddress: 'Centre, Kayanza, Kayanza',
        latitude: '-2.9167',
        longitude: '29.6167'
      },
      nif: 'NIF-012345678',
      commerceRegister: 'RC-2024-010',
      status: AgentStatus.ACTIVE,
      type: AgentType.SUPER_AGENT,
      joinDate: new Date('2024-10-01'),
      createdBy: 'admin@iblopay.com',
      createdAt: new Date('2024-10-01'),
      updatedAt: new Date('2024-10-01'),
      documents: [],
      electronics: [
        {
          id: 'e10',
          type: 'POS_TERMINAL',
          brand: 'Verifone',
          model: 'VX 520',
          serialNumber: 'SN-VER-2024-010',
          status: 'ACTIVE',
          assignedDate: new Date('2024-11-01'),
          amountInCirculation: 7000000,
          currency: 'BIF'
        }
      ],
      deposits: [],
      agents: []
    }
  ];

  // ============================================
  // MÉTHODES PUBLIQUES
  // ============================================

  getAgents(): Observable<Agent[]> {
    return of([...this.mockAgents]);
  }

  getAgentById(id: string): Observable<Agent> {
    const agent = this.mockAgents.find(a => a.id === id);
    if (agent) {
      return of({...agent});
    }
    return throwError(() => new Error('Agent non trouvé'));
  }

  createAgent(agentData: any): Observable<Agent> {
    const newAgent: Agent = {
      id: Date.now().toString(),
      code: `SA-${String(this.mockAgents.length + 1).padStart(3, '0')}`,
      firstName: agentData.firstName,
      lastName: agentData.lastName,
      email: agentData.email || `${agentData.firstName.toLowerCase()}.${agentData.lastName.toLowerCase()}@iblopay.com`,
      phone: agentData.phone,
      cin: agentData.cin,
      cardNumber: agentData.cardNumber || `CARTE-IBP-2024-${String(this.mockAgents.length + 1).padStart(4, '0')}`,
      dateOfBirth: agentData.dateOfBirth,
      address: {
        province: agentData.province,
        commune: agentData.commune,
        zone: agentData.zone,
        colline: agentData.colline,
        quartier: agentData.quartier,
        completeAddress: `${agentData.zone || agentData.quartier || agentData.colline}, ${agentData.commune}, ${agentData.province}`
      },
      nif: agentData.nif,
      commerceRegister: agentData.commerceRegister,
      status: AgentStatus.PENDING,
      type: AgentType.SUPER_AGENT,
      joinDate: new Date(),
      createdBy: 'admin@iblopay.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      documents: [],
      electronics: [],
      deposits: [],
      agents: [],
      password: agentData.password
    };
    this.mockAgents.push(newAgent);
    return of(newAgent);
  }

  updateAgent(id: string, agentData: any): Observable<Agent> {
    const index = this.mockAgents.findIndex(a => a.id === id);
    if (index === -1) {
      return throwError(() => new Error('Agent non trouvé'));
    }
    
    const currentAgent = this.mockAgents[index];
    if (!currentAgent) {
      return throwError(() => new Error('Agent non trouvé'));
    }

    const updatedAgent: Agent = {
      ...currentAgent,
      ...agentData,
      updatedAt: new Date()
    };
    
    this.mockAgents[index] = updatedAgent;
    return of(updatedAgent);
  }

  deleteAgent(id: string): Observable<void> {
    const index = this.mockAgents.findIndex(a => a.id === id);
    if (index === -1) {
      return throwError(() => new Error('Agent non trouvé'));
    }
    this.mockAgents.splice(index, 1);
    return of(void 0);
  }

  getAgentStats(): Observable<any> {
    const total = this.mockAgents.length;
    const active = this.mockAgents.filter(a => a.status === AgentStatus.ACTIVE).length;
    const pending = this.mockAgents.filter(a => a.status === AgentStatus.PENDING).length;
    const blocked = this.mockAgents.filter(a => a.status === AgentStatus.BLOCKED).length;
    const suspended = this.mockAgents.filter(a => a.status === AgentStatus.SUSPENDED).length;
    const inactive = this.mockAgents.filter(a => a.status === AgentStatus.INACTIVE).length;
    
    const totalElectronics = this.mockAgents.reduce((acc, a) => acc + (a.electronics?.length || 0), 0);
    const totalAgents = this.mockAgents.reduce((acc, a) => acc + (a.agents?.length || 0), 0);
    const totalDeposits = this.mockAgents.reduce((acc, a) => acc + (a.deposits?.length || 0), 0);
    
    let totalDepositAmount = 0;
    let totalTransactionAmount = 0;
    
    this.mockAgents.forEach(agent => {
      agent.deposits?.forEach(d => {
        if (d.status === 'COMPLETED') {
          totalDepositAmount += d.amount;
        }
      });
      agent.agents?.forEach(subAgent => {
        subAgent.transactions?.forEach(t => {
          if (t.status === 'COMPLETED') {
            totalTransactionAmount += t.amount;
          }
        });
      });
    });
    
    return of({
      total,
      active,
      pending,
      blocked,
      suspended,
      inactive,
      totalElectronics,
      totalAgents,
      totalDeposits,
      totalDepositAmount,
      totalTransactionAmount
    });
  }

  getSubAgents(agentId: string): Observable<SubAgent[]> {
    const agent = this.mockAgents.find(a => a.id === agentId);
    return of(agent?.agents || []);
  }

  getElectronics(agentId: string): Observable<Electronic[]> {
    const agent = this.mockAgents.find(a => a.id === agentId);
    return of(agent?.electronics || []);
  }

  getDeposits(agentId: string): Observable<Deposit[]> {
    const agent = this.mockAgents.find(a => a.id === agentId);
    return of(agent?.deposits || []);
  }

  searchAgents(query: string): Observable<Agent[]> {
    if (!query || query.trim() === '') {
      return of([...this.mockAgents]);
    }
    
    const searchTerm = query.toLowerCase().trim();
    const filtered = this.mockAgents.filter(a => 
      a.firstName.toLowerCase().includes(searchTerm) ||
      a.lastName.toLowerCase().includes(searchTerm) ||
      a.phone.includes(searchTerm) ||
      a.cardNumber.toLowerCase().includes(searchTerm) ||
      a.code.toLowerCase().includes(searchTerm) ||
      a.address.completeAddress.toLowerCase().includes(searchTerm)
    );
    return of(filtered);
  }
}