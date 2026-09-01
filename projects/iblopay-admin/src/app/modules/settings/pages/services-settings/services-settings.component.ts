import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// ========== INTERFACES ==========

interface ServiceRevenue {
  id: string;
  date: string;
  serviceId: string;
  serviceName: string;
  category: string;
  subCategory: string;
  amount: number;
  reference: string;
  statut: 'collecte' | 'transfert' | 'valide';
  paymentMethod: string;
  description?: string;
  clientName?: string;
  clientId?: string;
}

interface Service {
  id: string;
  key: string;
  name: string;
  icon: string;
  category: string;
  subCategory: string;
  accountNumber: string;
  status: 'actif' | 'inactif';
  fees: number;
  feesType: 'fixe' | 'pourcentage';
  plafond: number;
  commission: number;
  totalRevenue: number;
  transactions: number;
  lastTransaction?: string;
  description?: string;
  requiredDocuments: string[];
  procedure: string[];
  legalText?: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceId: string;
  serviceName: string;
  requestDate: string;
  status: 'en_attente' | 'approuve' | 'rejete';
  amount: number;
  reference: string;
  address?: string;
  idNumber?: string;
}

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

interface TabItem {
  key: string;
  label: string;
  icon: string;
  count?: number;
}

@Component({
  selector: 'app-services-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './services-settings.component.html',
  styleUrls: ['./services-settings.component.scss']
})
export class ServicesSettingsComponent implements OnInit {
  readonly title = 'Gestion des Services RNF';
  readonly icon = '🏛';
  readonly pageSize = 100;
  private readonly STORAGE_KEY = 'services_data_2025';
  private toastSeq = 0;

  services: Service[] = [];
  revenues: ServiceRevenue[] = [];
  clients: Client[] = [];
  toasts: Toast[] = [];
  selectedService: Service | null = null;
  showModal: boolean = false;
  showDetailModal: boolean = false;
  showClientModal: boolean = false;
  showDesactivatePinModal: boolean = false;
  modalType: string = '';
  modalTitle: string = '';
  formData: any = {};
  showPinModal: boolean = false;
  pinCode: string = '';
  desactivatePinCode: string = '';
  selectedClient: Client | null = null;
  serviceToDesactivate: Service | null = null;

  activeTab: string = 'dashboard';
  private currentPages: { [key: string]: number } = {
    services: 1,
    revenues: 1,
    clients: 1
  };

  tabs: TabItem[] = [
    { key: 'dashboard', label: 'Tableau de bord', icon: '📊' },
    { key: 'services', label: 'Services RNF', icon: '📋' },
    { key: 'revenues', label: 'Revenus', icon: '💰' },
    { key: 'categories', label: 'Catégories', icon: '📂' }
  ];

  categories: any[] = [];

  private clientNames = [
    'Jean Bosco NIZIGIYIMANA', 'Marie Claire NDIKUMANA', 'Pierre HAKIZIMANA',
    'Françoise NIBITANGA', 'Emmanuel NTAKIRUTIMANA', 'David NDAYISABA',
    'Esther NIYONKURU', 'Fabrice HAKIZIMANA', 'Gracieuse NIBITANGA',
    'Hervé NDAYIZEYE', 'Isabelle NDIKUMANA', 'Jean-Pierre HAKIZIMANA',
    'Karine NSABIMANA', 'Léonard NTAKIRUTIMANA', 'Martine NIZIGIYIMANA',
    'Alain NDAYISABA', 'Bernadette NIYONKURU', 'Charles NTAKIRUTIMANA',
    'Diane NIZIGIYIMANA', 'Éric NDIKUMANA', 'Florence HAKIZIMANA',
    'Gérard NIBITANGA', 'Hélène NDAYIZEYE', 'Irène NDAYISABA',
    'Joël NIYONKURU', 'Laurence NTAKIRUTIMANA', 'Michel NIZIGIYIMANA',
    'Nathalie NDIKUMANA', 'Olivier HAKIZIMANA', 'Pascale NIBITANGA',
    'Quentin NTAKIRUTIMANA', 'Rachel NIZIGIYIMANA', 'Stéphane NDIKUMANA',
    'Ursula NIBITANGA', 'Victor NDAYISABA', 'Wendy NIYONKURU',
    'Xénia NTAKIRUTIMANA', 'Yves NIZIGIYIMANA', 'Zoé NDIKUMANA'
  ];

  constructor() {
    this.loadData();
    this.initializeData();
  }

  ngOnInit(): void {
    this.updateCounts();
  }

  // ========== MÉTHODES POUR LA DATE ==========

  getCurrentDate(): string {
    return new Date().toLocaleDateString('fr-FR');
  }

  getRandomDemandeNumber(): string {
    return 'DEM-' + String(100000 + Math.floor(Math.random() * 900000)).padStart(6, '0');
  }

  // ========== MÉTHODES PIN ==========

  addPinDigit(digit: number): void {
    if (this.pinCode.length < 4) {
      this.pinCode += digit.toString();
    }
  }

  clearPin(): void {
    this.pinCode = '';
  }

  addDesactivatePinDigit(digit: number): void {
    if (this.desactivatePinCode.length < 4) {
      this.desactivatePinCode += digit.toString();
    }
  }

  clearDesactivatePin(): void {
    this.desactivatePinCode = '';
  }

  confirmPin(): void {
    if (this.pinCode === '1234') {
      this.showPinModal = false;
      this.toast('Code PIN validé avec succès', 'success');
    } else {
      this.toast('Code PIN incorrect', 'danger');
      this.pinCode = '';
    }
  }

  closePinModal(): void {
    this.showPinModal = false;
    this.pinCode = '';
  }

  confirmDesactivatePin(): void {
    if (this.desactivatePinCode === '1234') {
      if (this.serviceToDesactivate) {
        this.serviceToDesactivate.status = 'inactif';
        this.saveData();
        this.toast(`Service ${this.serviceToDesactivate.name} désactivé avec succès`, 'warning');
        this.showDesactivatePinModal = false;
        this.serviceToDesactivate = null;
        this.desactivatePinCode = '';
      }
    } else {
      this.toast('Code PIN incorrect. Veuillez réessayer.', 'danger');
      this.desactivatePinCode = '';
    }
  }

  closeDesactivatePinModal(): void {
    this.showDesactivatePinModal = false;
    this.serviceToDesactivate = null;
    this.desactivatePinCode = '';
  }

  // ========== INITIALISATION ==========

  private initializeData(): void {
    if (this.services.length > 0 && this.categories.length > 0) {
      this.services.forEach(service => {
        if (!service.requiredDocuments || service.requiredDocuments.length === 0) {
          service.requiredDocuments = ['Demande écrite', 'Pièce d\'identité', 'Photo d\'identité', 'Reçu de paiement'];
        }
        if (!service.procedure || service.procedure.length === 0) {
          service.procedure = [
            '1. Déposer une demande écrite auprès du service compétent',
            '2. Fournir les pièces justificatives requises',
            '3. Payer les frais de service',
            '4. Attendre le traitement de la demande (délai: 5 jours ouvrables)',
            '5. Récupérer le document ou l\'autorisation'
          ];
        }
      });
      this.ensureClientsForAllServices();
      return;
    }

    // Définir les catégories
    this.categories = [
      {
        id: 'ARCT',
        name: 'ARCT - Communications',
        icon: '📡',
        description: 'Redevances et taxes des télécommunications',
        subCategories: [
          { name: 'Autorisation réseaux radioélectriques fixes et mobiles', fees: 25000, account: '7234100' },
          { name: 'Étude du dossier', fees: 15000, account: '7234200' },
          { name: 'Agrément des équipements', fees: 30000, account: '7234300' },
          { name: 'Exploitation des fréquences', fees: 45000, account: '7234400' },
          { name: 'Exploitation des codes et numéros', fees: 35000, account: '7234500' },
          { name: 'Licence d\'exploitation des réseaux', fees: 100000, account: '7234600' },
          { name: 'Redevances Annuelles de 2% du C.A', fees: 0, account: '7234700', type: 'pourcentage' },
          { name: 'Autorisation service à valeur ajoutée', fees: 50000, account: '7234800' },
          { name: 'Certificat d\'homologation', fees: 40000, account: '7234900' },
          { name: 'Redevance trafic national', fees: 0, account: '7142202', type: 'pourcentage' },
          { name: 'Taxe messagerie mobile', fees: 0, account: '7142501', type: 'pourcentage' },
          { name: 'Taxe services financiers mobiles', fees: 0, account: '7142502', type: 'pourcentage' },
          { name: 'Taxe services de données mobiles', fees: 0, account: '7142503', type: 'pourcentage' },
          { name: 'Taxe OTT et communication IP', fees: 0, account: '7142504', type: 'pourcentage' }
        ]
      },
      {
        id: 'OBM',
        name: 'OBM - Mines',
        icon: '⛏️',
        description: 'Recettes minières et carrières',
        subCategories: [
          { name: 'Revenus et redevances des carrières', fees: 50000, account: '7213200' },
          { name: 'Or', fees: 75000, account: '7214000' },
          { name: 'Tourbe', fees: 40000, account: '7214100' }
        ]
      },
      {
        id: 'OBPE',
        name: 'OBPE - Environnement',
        icon: '🌿',
        description: 'Recettes environnementales et touristiques',
        subCategories: [
          { name: 'Recettes touristiques', fees: 20000, account: '7233' },
          { name: 'Attestation de Conformités environnementales', fees: 30000, account: '7233' },
          { name: 'Autorisations de transport produits carriers', fees: 25000, account: '7232900' },
          { name: 'Autorisations de transport produits forestiers', fees: 25000, account: '7232900' },
          { name: 'Permis de coupe', fees: 20000, account: '7233' }
        ]
      },
      {
        id: 'OBUHA',
        name: 'OBUHA & Universités',
        icon: '🏫',
        description: 'Taxes et locations immobilières',
        subCategories: [
          { name: 'Taxe de bâtisse', fees: 18000, account: '7232100' },
          { name: 'Location d\'immeubles', fees: 35000, account: '7221000' },
          { name: 'Amendes constructions non autorisées', fees: 25000, account: '7243' },
          { name: 'Location terrains', fees: 30000, account: '7213100' }
        ]
      },
      {
        id: 'ARCA',
        name: 'ARCA - Assurances',
        icon: '🛡️',
        description: 'Contributions des sociétés d\'assurances',
        subCategories: [
          { name: 'Contributions annuelles des assurances', fees: 80000, account: '7233830' },
          { name: 'Amendes', fees: 25000, account: '7243' }
        ]
      },
      {
        id: 'EDUCATION',
        name: 'Ministère Éducation',
        icon: '📚',
        description: 'Droits sur services éducatifs',
        subCategories: [
          { name: 'Attestation d\'équivalence certificat', fees: 15000, account: '7233' },
          { name: 'Attestation de dépôt de mémoire', fees: 10000, account: '7233' },
          { name: 'Attestation boursier', fees: 8000, account: '7233' },
          { name: 'Attestation réussite examen d\'État', fees: 12000, account: '7233' },
          { name: 'Certificat diplôme secondaire', fees: 20000, account: '7233' },
          { name: 'Certificat diplôme supérieur', fees: 25000, account: '7233' },
          { name: 'Bulletin enseignement supérieur', fees: 10000, account: '7233' },
          { name: 'Attestation réussite Master/DEA', fees: 30000, account: '7233' }
        ]
      },
      {
        id: 'INTERIEUR',
        name: 'Ministère Intérieur',
        icon: '🏛️',
        description: 'Ventes d\'imprimés et documentation',
        subCategories: [
          { name: 'Ventes d\'imprimés et documentation', fees: 15000, account: '7223000' },
          { name: 'Vente des drapeaux', fees: 25000, account: '7223000' },
          { name: 'Vente des lois et ordonnances', fees: 20000, account: '7223000' }
        ]
      },
      {
        id: 'JUSTICE',
        name: 'Ministère Justice',
        icon: '⚖️',
        description: 'Droits de contentieux et amendes',
        subCategories: [
          { name: 'Droits de contentieux', fees: 45000, account: '7233200' },
          { name: 'Amendes judiciaires', fees: 30000, account: '7243000' }
        ]
      },
      {
        id: 'RELATIONS_EXTERIEURES',
        name: 'Relations Extérieures',
        icon: '🌍',
        description: 'Droits sur services consulaires',
        subCategories: [
          { name: 'Frais obtention documents', fees: 20000, account: '7233' },
          { name: 'Frais agrément sociétés', fees: 50000, account: '7233' },
          { name: 'Visas et passeports ambassades', fees: 35000, account: '7231200' }
        ]
      },
      {
        id: 'DOCUMENTS_VOYAGE',
        name: 'Documents de Voyage',
        icon: '🛂',
        description: 'Passeports et visas',
        subCategories: [
          { name: 'Passeports & titres de voyages', fees: 40000, account: '7231100' },
          { name: 'Visas & passeports ambassades', fees: 35000, account: '7231200' },
          { name: 'Visas & immatriculations étrangers', fees: 30000, account: '7231300' }
        ]
      },
      {
        id: 'LICENCES',
        name: 'Licences Exploitation',
        icon: '🍷',
        description: 'Licences débits de boissons, restaurants et hôtels',
        subCategories: [
          { name: 'Licence débit de boissons', fees: 50000, account: '7232600' },
          { name: 'Licence exploitation restaurants', fees: 45000, account: '7232610' },
          { name: 'Licence exploitation hôtels', fees: 60000, account: '7232620' },
          { name: 'Licence exploitation boîtes de nuit', fees: 75000, account: '7232620' }
        ]
      },
      {
        id: 'TRANSPORT',
        name: 'Transport & Garages',
        icon: '🚗',
        description: 'Agréments transport et garages',
        subCategories: [
          { name: 'Autorisation de convoi', fees: 30000, account: '7232510' },
          { name: 'Agrément des garages', fees: 40000, account: '7232710' },
          { name: 'Carte agrément agences transport', fees: 50000, account: '7233870' },
          { name: 'Autorisation de transport', fees: 40000, account: '7232500' },
          { name: 'Permis de conduire', fees: 35000, account: '7232' },
          { name: 'Contrôle technique des véhicules', fees: 20000, account: '7232400' }
        ]
      },
      {
        id: 'AGRICULTURE',
        name: 'Agriculture & Élevage',
        icon: '🌾',
        description: 'Ventes semences et services vétérinaires',
        subCategories: [
          { name: 'Ventes des semences', fees: 15000, account: '7227000' },
          { name: 'Vente des graines forestières', fees: 12000, account: '7227000' },
          { name: 'Vente des bovins', fees: 25000, account: '7227002' },
          { name: 'Vente du maïs ANAGESSA', fees: 18000, account: '7227001' },
          { name: 'Prestation services vétérinaires', fees: 20000, account: '7226000' }
        ]
      },
      {
        id: 'SANTE',
        name: 'Santé',
        icon: '🏥',
        description: 'Prestations de santé et pharmacies',
        subCategories: [
          { name: 'Prestation services de santé', fees: 30000, account: '7225000' },
          { name: 'Revenu CAM', fees: 15000, account: '7225001' },
          { name: 'Ouverture pharmacies', fees: 50000, account: '7232700' },
          { name: 'Renouvellement pharmacies', fees: 30000, account: '7232700' },
          { name: 'Ouverture infirmeries', fees: 35000, account: '7232700' }
        ]
      },
      {
        id: 'DIVIDENDES',
        name: 'Dividendes d\'État',
        icon: '📈',
        description: 'Dividendes entreprises financières et non financières',
        subCategories: [
          { name: 'Dividendes entreprises financières', fees: 0, account: '7211200', type: 'pourcentage' },
          { name: 'Dividendes entreprises non financières', fees: 0, account: '7211300', type: 'pourcentage' }
        ]
      },
      {
        id: 'AMENDES',
        name: 'Amendes Routières & Commerciales',
        icon: '🚨',
        description: 'Infractions et pénalités',
        subCategories: [
          { name: 'Infraction réglementation routière', fees: 20000, account: '7241000' },
          { name: 'Infraction réglementation commerciale', fees: 25000, account: '7242000' },
          { name: 'Autres amendes et pénalités', fees: 30000, account: '7248000' },
          { name: 'Procès verbaux accidents', fees: 35000, account: '7233300' }
        ]
      },
      {
        id: 'AUTRES',
        name: 'Autres Produits Non Fiscaux',
        icon: '📦',
        description: 'Produits divers non classés',
        subCategories: [
          { name: 'Autres produits non fiscaux nca', fees: 15000, account: '7280000' },
          { name: 'Remboursement MFE', fees: 25000, account: '7280110' },
          { name: 'Location stands marchés', fees: 30000, account: '7213500' },
          { name: 'Permis de sortie bateaux', fees: 40000, account: '7232300' },
          { name: 'Contribution spécial bancs et manuels', fees: 0, account: '7233', type: 'pourcentage' },
          { name: 'Taxe main d\'œuvre étrangère', fees: 0, account: '7144250', type: 'pourcentage' },
          { name: 'Redevance domaniales', fees: 35000, account: '7213300' },
          { name: 'Frais titre foncier sécurisé', fees: 50000, account: '7213400' },
          { name: 'Vente vieux boisements', fees: 25000, account: '7227003' },
          { name: 'Vente produits locaux', fees: 15000, account: '7227002' },
          { name: 'Dépôt et publication marque', fees: 30000, account: '7233100' },
          { name: 'Vérification poids et mesures', fees: 20000, account: '7232200' },
          { name: 'Redevance attestations fiscales', fees: 15000, account: '7233700' },
          { name: 'Redevance réimpression NIF', fees: 10000, account: '7233810' },
          { name: 'Redevances environnementales forfaitaires', fees: 25000, account: '7233' }
        ]
      },
      {
        id: 'LONA',
        name: 'LONA',
        icon: '🏦',
        description: 'Recettes de LONA',
        subCategories: [
          { name: 'Recettes de LONA', fees: 30000, account: 'LONA' }
        ]
      },
      {
        id: 'ABREMA',
        name: 'ABREMA',
        icon: '🏛️',
        description: 'Redevance administrative des services ABREMA',
        subCategories: [
          { name: 'Redevance administrative ABREMA', fees: 25000, account: 'ABREMA' }
        ]
      },
      {
        id: 'OHP',
        name: 'OHP - Huile de Palme',
        icon: '🌴',
        description: 'Frais d\'extraction de l\'huile de palme',
        subCategories: [
          { name: 'Autorisation unité extraction huile palme', fees: 50000, account: 'OHP' },
          { name: 'Valorisation champs palmier à huile', fees: 35000, account: 'OHP' }
        ]
      }
    ];

    this.services = [];
    this.categories.forEach(cat => {
      cat.subCategories.forEach((sub: any) => {
        const fees = sub.fees || Math.round((0.5 + Math.random() * 5) * 100) / 100;
        const feesType = sub.type || (fees > 0 ? 'fixe' : 'pourcentage');
        
        const service: Service = {
          id: `${cat.id}-${String(100 + Math.floor(Math.random() * 900)).padStart(3, '0')}`,
          key: `${cat.id}_${sub.name.replace(/\s/g, '_')}`,
          name: sub.name,
          icon: cat.icon,
          category: cat.name,
          subCategory: cat.id,
          accountNumber: sub.account || `RNF-${cat.id}-${String(100 + Math.floor(Math.random() * 900)).padStart(3, '0')}`,
          status: Math.random() > 0.3 ? 'actif' : 'inactif',
          fees: fees,
          feesType: feesType as 'fixe' | 'pourcentage',
          plafond: Math.round((10000 + Math.random() * 1000000) / 100) * 100,
          commission: Math.round((1 + Math.random() * 5) * 100) / 100,
          totalRevenue: 0,
          transactions: 0,
          description: `Service de ${sub.name} relevant de ${cat.name}`,
          requiredDocuments: ['Demande écrite', 'Pièce d\'identité', 'Photo d\'identité', 'Reçu de paiement'],
          procedure: [
            '1. Déposer une demande écrite auprès du service compétent',
            '2. Fournir les pièces justificatives requises',
            '3. Payer les frais de service',
            '4. Attendre le traitement de la demande (délai: 5 jours ouvrables)',
            '5. Récupérer le document ou l\'autorisation'
          ],
          legalText: `Conformément à la loi budgétaire 2025-2026, le service "${sub.name}" est soumis aux dispositions de l'article ${sub.account || '723'} du code des impôts et taxes. Les frais de service sont fixés à ${fees} ${feesType === 'fixe' ? 'BIF' : '%'} conformément à la réglementation en vigueur.`
        };
        this.services.push(service);
      });
    });

    this.ensureClientsForAllServices();
    this.generateRevenues();
    this.saveData();
  }

  private ensureClientsForAllServices(): void {
    const services = this.services.filter(s => s.status === 'actif');
    
    services.forEach(service => {
      const existingClients = this.clients.filter(c => c.serviceId === service.id);
      if (existingClients.length < 10) {
        const needed = 10 - existingClients.length;
        for (let i = 0; i < needed; i++) {
          const nameIndex = Math.floor(Math.random() * this.clientNames.length);
          const name = this.clientNames[nameIndex] || 'Client Inconnu';
          const amount = service.fees + Math.floor(Math.random() * 50000);

          const client: Client = {
            id: `CL-${String(100000 + this.clients.length + 1).padStart(6, '0')}`,
            name: name,
            email: `${name.toLowerCase().replace(/\s/g, '.')}@email.com`,
            phone: `+257 79 ${String(100 + Math.floor(Math.random() * 900)).padStart(3, '0')} ${String(100 + Math.floor(Math.random() * 900)).padStart(3, '0')}`,
            serviceId: service.id,
            serviceName: service.name,
            requestDate: new Date(Date.now() - Math.floor(Math.random() * 60) * 86400000).toLocaleDateString('fr-FR'),
            status: ['en_attente', 'approuve', 'rejete'][Math.floor(Math.random() * 3)] as any,
            amount: Math.round(amount),
            reference: `REF-CL-${String(100000 + this.clients.length + 1).padStart(6, '0')}`,
            address: `${Math.floor(100 + Math.random() * 900)} Avenue de la République, Bujumbura`,
            idNumber: `CNI-${String(100000 + Math.floor(Math.random() * 900000)).padStart(6, '0')}`
          };
          this.clients.push(client);
        }
      }
    });
  }

  private generateRevenues(): void {
    const today = new Date();
    const services = this.services.filter(s => s.status === 'actif');
    const paymentMethods = ['Wallet', 'Mobile Money', 'Banque', 'Cash'];

    this.revenues = [];

    for (let i = 0; i < 200; i++) {
      const service = services[Math.floor(Math.random() * services.length)];
      if (!service) continue;

      const date = new Date(today);
      date.setDate(date.getDate() - Math.floor(Math.random() * 90));

      const amount = service.fees + Math.floor(Math.random() * 30000);
      const randomIndex = Math.floor(Math.random() * paymentMethods.length);
      const paymentMethod = paymentMethods[randomIndex] || 'Wallet';
      const clientNameIndex = Math.floor(Math.random() * this.clientNames.length);
      const clientName = this.clientNames[clientNameIndex] || 'Client Inconnu';

      const revenue: ServiceRevenue = {
        id: `REV-${String(100000 + i + 1).padStart(6, '0')}`,
        date: date.toLocaleDateString('fr-FR'),
        serviceId: service.id,
        serviceName: service.name,
        category: service.category,
        subCategory: service.subCategory,
        amount: Math.round(amount),
        reference: `REF-${String(100000 + i + 1).padStart(6, '0')}`,
        statut: ['collecte', 'transfert', 'valide'][Math.floor(Math.random() * 3)] as any,
        paymentMethod: paymentMethod,
        description: `Paiement pour ${service.name}`,
        clientName: clientName,
        clientId: `CL-${String(100000 + i + 1).padStart(6, '0')}`
      };

      this.revenues.push(revenue);
      service.totalRevenue += Math.round(amount);
      service.transactions++;
      service.lastTransaction = revenue.date;
    }

    this.revenues.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  private saveData(): void {
    const data = {
      services: this.services,
      revenues: this.revenues,
      clients: this.clients
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  private loadData(): void {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.services && data.services.length > 0) {
          this.services = data.services;
        }
        if (data.revenues && data.revenues.length > 0) {
          this.revenues = data.revenues;
        }
        if (data.clients && data.clients.length > 0) {
          this.clients = data.clients;
        }
      } catch (e) {
        console.error('Erreur de chargement des données', e);
      }
    }
  }

  // ========== GETTERS ==========

  getServices(): Service[] {
    return this.services;
  }

  getServicesByCategory(categoryId: string): Service[] {
    return this.services.filter(s => s.subCategory === categoryId);
  }

  getRevenues(): ServiceRevenue[] {
    return this.revenues;
  }

  getClients(): Client[] {
    return this.clients;
  }

  getClientsByService(serviceId: string): Client[] {
    return this.clients.filter(c => c.serviceId === serviceId);
  }

  getRevenuesByService(serviceId: string): ServiceRevenue[] {
    return this.revenues.filter(r => r.serviceId === serviceId);
  }

  getServiceTotalRevenue(serviceId: string): number {
    return this.getRevenuesByService(serviceId).reduce((sum, r) => sum + r.amount, 0);
  }

  getServiceTotalRevenueFormatted(serviceId: string): string {
    return this.getServiceTotalRevenue(serviceId).toLocaleString('fr-FR');
  }

  getServiceClientCount(serviceId: string): number {
    return this.getClientsByService(serviceId).length;
  }

  getTotalPages(type: string): number {
    let items: any[] = [];
    switch(type) {
      case 'services': items = this.services; break;
      case 'revenues': items = this.revenues; break;
      default: return 1;
    }
    return Math.ceil(items.length / this.pageSize);
  }

  getPaginatedRevenues(): ServiceRevenue[] {
    const page = this.currentPages['revenues'] || 1;
    const start = (page - 1) * this.pageSize;
    return this.revenues.slice(start, start + this.pageSize);
  }

  getPaginatedClients(serviceId: string): Client[] {
    const clients = this.getClientsByService(serviceId);
    const page = this.currentPages['clients'] || 1;
    const start = (page - 1) * 10;
    return clients.slice(start, start + 10);
  }

  getTotalClientPages(serviceId: string): number {
    const clients = this.getClientsByService(serviceId);
    return Math.ceil(clients.length / 10);
  }

  getCurrentPage(type: string): number {
    return this.currentPages[type] || 1;
  }

  nextPage(type: string): void {
    const total = this.getTotalPages(type);
    const current = this.currentPages[type] || 1;
    if (current < total) this.currentPages[type] = current + 1;
  }

  prevPage(type: string): void {
    const current = this.currentPages[type] || 1;
    if (current > 1) this.currentPages[type] = current - 1;
  }

  nextClientPage(serviceId: string): void {
    const total = this.getTotalClientPages(serviceId);
    const current = this.currentPages['clients'] || 1;
    if (current < total) this.currentPages['clients'] = current + 1;
  }

  prevClientPage(serviceId: string): void {
    const current = this.currentPages['clients'] || 1;
    if (current > 1) this.currentPages['clients'] = current - 1;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
    this.currentPages[tab] = 1;
  }

  private updateCounts(): void {
    this.tabs = this.tabs.map(tab => {
      switch(tab.key) {
        case 'services': return { ...tab, count: this.services.length };
        case 'revenues': return { ...tab, count: this.revenues.length };
        default: return tab;
      }
    });
  }

  // ========== MÉTHODES POUR LE TEMPLATE ==========

  getTotalRevenues(): number {
    return this.revenues.reduce((sum, r) => sum + r.amount, 0);
  }

  getTotalRevenuesFormatted(): string {
    return this.getTotalRevenues().toLocaleString('fr-FR');
  }

  getActiveServicesCount(): number {
    return this.services.filter(s => s.status === 'actif').length;
  }

  getServicesByCategoryCount(categoryId: string): number {
    return this.services.filter(s => s.subCategory === categoryId).length;
  }

  getRevenuesByCategoryId(categoryId: string): number {
    return this.revenues.filter(r => r.subCategory === categoryId).reduce((sum, r) => sum + r.amount, 0);
  }

  getRevenuesByCategoryIdFormatted(categoryId: string): string {
    return this.getRevenuesByCategoryId(categoryId).toLocaleString('fr-FR');
  }

  getTotalRevenuesByCategory(category: string): string {
    const total = this.revenues.filter(r => r.category === category).reduce((sum, r) => sum + r.amount, 0);
    return total.toLocaleString('fr-FR');
  }

  // ========== EXPORT EXCEL ==========

  exportToExcel(): void {
    const excelData = this.services.map(service => ({
      'Service': service.name,
      'Catégorie': service.category,
      'Compte': service.accountNumber,
      'Frais': `${service.fees} ${service.feesType === 'fixe' ? 'BIF' : '%'}`,
      'Statut': service.status === 'actif' ? 'Actif' : 'Inactif',
      'Clients': this.getServiceClientCount(service.id),
      'Revenus': this.getServiceTotalRevenue(service.id),
      'Transactions': service.transactions
    }));

    const revenueData = this.revenues.map(r => ({
      'Date': r.date,
      'Client': r.clientName || 'N/A',
      'Service': r.serviceName,
      'Catégorie': r.category,
      'Montant': r.amount,
      'Référence': r.reference,
      'Méthode': r.paymentMethod,
      'Statut': r.statut
    }));

    this.exportToCSV(excelData, 'services');
    this.exportToCSV(revenueData, 'revenus');
    this.toast('Export Excel effectué avec succès', 'success');
  }

  private exportToCSV(data: any[], filename: string): void {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvRows = [];
    csvRows.push(headers.join(','));
    
    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header] !== undefined ? row[header] : '';
        return `"${String(val).replace(/"/g, '""')}"`;
      });
      csvRows.push(values.join(','));
    }
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // ========== IMPRIMER ==========

  printServices(): void {
    window.print();
    this.toast('Impression lancée', 'info');
  }

  // ========== ACTIONS CLIENTS ==========

  openClientDetail(client: Client): void {
    this.selectedClient = client;
    this.showClientModal = true;
  }

  closeClientModal(): void {
    this.showClientModal = false;
    this.selectedClient = null;
  }

  approveClient(client: Client): void {
    client.status = 'approuve';
    this.saveData();
    this.toast(`Client ${client.name} approuvé avec succès`, 'success');
  }

  rejectClient(client: Client): void {
    client.status = 'rejete';
    this.saveData();
    this.toast(`Client ${client.name} rejeté`, 'warning');
  }

  // ========== DÉSACTIVATION AVEC PIN ==========

  openDesactivatePinModal(service: Service): void {
    this.serviceToDesactivate = service;
    this.desactivatePinCode = '';
    this.showDesactivatePinModal = true;
  }

  // ========== DETAIL MODAL ==========

  openDetailModal(service: Service): void {
    this.selectedService = service;
    this.currentPages['clients'] = 1;
    this.showDetailModal = true;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedService = null;
  }

  // ========== KPI DATA ==========

  getKpiData(): any[] {
    const totalRevenues = this.getTotalRevenues();
    const today = new Date().toLocaleDateString('fr-FR');
    const daily = this.revenues.filter(r => r.date === today).reduce((sum, r) => sum + r.amount, 0);
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    const weekly = this.revenues.filter(r => new Date(r.date) >= weekAgo).reduce((sum, r) => sum + r.amount, 0);
    
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    const monthly = this.revenues.filter(r => new Date(r.date) >= monthAgo).reduce((sum, r) => sum + r.amount, 0);

    const activeServices = this.getActiveServicesCount();
    const totalTransactions = this.revenues.length;
    const totalClients = this.clients.length;

    return [
      {
        icon: '💰',
        label: 'Total Revenus',
        value: totalRevenues.toLocaleString('fr-FR') + ' BIF',
        color: '#1a1a2e',
        textColor: '#ffffff',
        trend: 'up',
        trendValue: '+15%'
      },
      {
        icon: '📅',
        label: 'Aujourd\'hui',
        value: daily.toLocaleString('fr-FR') + ' BIF',
        color: '#2e7d32',
        textColor: '#ffffff',
        trend: 'up',
        trendValue: 'journalier'
      },
      {
        icon: '📊',
        label: 'Cette semaine',
        value: weekly.toLocaleString('fr-FR') + ' BIF',
        color: '#1a237e',
        textColor: '#ffffff',
        trend: 'up',
        trendValue: 'hebdomadaire'
      },
      {
        icon: '📈',
        label: 'Ce mois',
        value: monthly.toLocaleString('fr-FR') + ' BIF',
        color: '#4a148c',
        textColor: '#ffffff',
        trend: 'up',
        trendValue: 'mensuel'
      },
      {
        icon: '👥',
        label: 'Clients',
        value: totalClients.toString(),
        color: '#0d47a1',
        textColor: '#ffffff',
        trend: 'up',
        trendValue: `${totalClients} clients`
      },
      {
        icon: '📋',
        label: 'Transactions',
        value: totalTransactions.toString(),
        color: '#bf360c',
        textColor: '#ffffff',
        trend: 'up',
        trendValue: `${totalTransactions} transactions`
      }
    ];
  }

  // ========== REVENUS PAR CATÉGORIE ==========

  getRevenuesByCategory(): any[] {
    const map: { [key: string]: number } = {};
    this.revenues.forEach(r => {
      map[r.category] = (map[r.category] || 0) + r.amount;
    });
    return Object.entries(map).map(([category, total]) => ({
      category,
      total,
      count: this.revenues.filter(r => r.category === category).length
    })).sort((a, b) => b.total - a.total);
  }

  getRevenuesByServiceList(): any[] {
    const map: { [key: string]: number } = {};
    this.revenues.forEach(r => {
      map[r.serviceName] = (map[r.serviceName] || 0) + r.amount;
    });
    return Object.entries(map).map(([service, total]) => ({
      service,
      total,
      count: this.revenues.filter(r => r.serviceName === service).length
    })).sort((a, b) => b.total - a.total);
  }

  // ========== ACTIONS SUR LES SERVICES ==========

  openServiceModal(service: Service, action: string): void {
    this.selectedService = service;
    this.modalType = action;
    
    switch(action) {
      case 'activer':
        this.modalTitle = `Activer ${service.name}`;
        break;
      case 'modifier_frais':
        this.modalTitle = `Modifier les frais - ${service.name}`;
        this.formData = { fees: service.fees, feesType: service.feesType };
        break;
      case 'definir_plafond':
        this.modalTitle = `Définir le plafond - ${service.name}`;
        this.formData = { plafond: service.plafond };
        break;
      case 'definir_commission':
        this.modalTitle = `Définir la commission - ${service.name}`;
        this.formData = { commission: service.commission };
        break;
      case 'modifier_documents':
        this.modalTitle = `Modifier les documents requis - ${service.name}`;
        this.formData = { documents: service.requiredDocuments.join(', ') };
        break;
      case 'modifier_procedure':
        this.modalTitle = `Modifier la procédure - ${service.name}`;
        this.formData = { procedure: service.procedure.join('\n') };
        break;
      default:
        this.modalTitle = `Action sur ${service.name}`;
    }
    
    this.showModal = true;
  }

  confirmModal(): void {
    if (!this.selectedService) return;

    switch(this.modalType) {
      case 'activer':
        this.selectedService.status = 'actif';
        this.toast(`Service ${this.selectedService.name} activé avec succès`, 'success');
        break;
      case 'modifier_frais':
        this.selectedService.fees = this.formData.fees;
        this.selectedService.feesType = this.formData.feesType;
        this.toast(`Frais de ${this.selectedService.name} modifiés avec succès`, 'success');
        break;
      case 'definir_plafond':
        this.selectedService.plafond = this.formData.plafond;
        this.toast(`Plafond de ${this.selectedService.name} défini avec succès`, 'success');
        break;
      case 'definir_commission':
        this.selectedService.commission = this.formData.commission;
        this.toast(`Commission de ${this.selectedService.name} définie avec succès`, 'success');
        break;
      case 'modifier_documents':
        this.selectedService.requiredDocuments = this.formData.documents.split(',').map((d: string) => d.trim());
        this.toast(`Documents de ${this.selectedService.name} modifiés avec succès`, 'success');
        break;
      case 'modifier_procedure':
        this.selectedService.procedure = this.formData.procedure.split('\n').filter((d: string) => d.trim());
        this.toast(`Procédure de ${this.selectedService.name} modifiée avec succès`, 'success');
        break;
    }

    this.saveData();
    this.showModal = false;
    this.selectedService = null;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedService = null;
  }

  // ========== PIN MODAL ==========

  openPinModal(): void {
    this.pinCode = '';
    this.showPinModal = true;
  }

  // ========== TOASTS ==========

  toast(message: string, type: Toast['type'] = 'info'): void {
    const id = ++this.toastSeq;
    this.toasts.push({ id, message, type });
    setTimeout(() => this.dismissToast(id), 5000);
  }

  dismissToast(id: number): void {
    this.toasts = this.toasts.filter(t => t.id !== id);
  }

  // ========== UTILITAIRES ==========

  getStatutLabel(statut: string): string {
    const labels: Record<string, string> = {
      collecte: '📥 Collectée',
      transfert: '🔄 En transfert',
      valide: '✅ Validée',
      actif: '✅ Actif',
      inactif: '⛔ Inactif',
      en_attente: '⏳ En attente',
      approuve: '✅ Approuvé',
      rejete: '❌ Rejeté'
    };
    return labels[statut] || statut;
  }

  getCategoryIcon(categoryId: string): string {
    const cat = this.categories.find(c => c.id === categoryId);
    return cat?.icon || '📦';
  }

  getCategoryName(categoryId: string): string {
    const cat = this.categories.find(c => c.id === categoryId);
    return cat?.name || categoryId;
  }
}