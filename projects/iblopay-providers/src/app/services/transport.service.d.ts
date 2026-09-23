import { Observable } from 'rxjs';
import { Vehicule, Chauffeur, LigneBus, ZoneTaxi, StatsTransportGlobal, StatsParLigneOuZone, TrajetHistorique, IncidentTransport } from '../models/transport.model';
export declare class TransportService {
    /** Tarif fixé par l'État pour le transport en commun (BIF par kilomètre). Non modifiable par l'admin. */
    readonly TARIF_ETAT_PAR_KM = 65;
    /** Calcule le tarif officiel d'un trajet de bus, arrondi aux 50 BIF les plus proches. */
    calculerTarifEtat(distanceKm: number): number;
    private vehicules;
    private chauffeurs;
    private lignes;
    private zones;
    private historique;
    private incidents;
    private nextVehiculeId;
    private nextChauffeurId;
    private nextLigneId;
    private nextZoneId;
    getVehicules(): Observable<Vehicule[]>;
    getVehiculeById(id: number): Observable<Vehicule | undefined>;
    creerVehicule(v: Partial<Vehicule>): Observable<Vehicule>;
    modifierVehicule(v: Vehicule): Observable<Vehicule>;
    supprimerVehicule(id: number): Observable<void>;
    getChauffeurs(): Observable<Chauffeur[]>;
    getChauffeurById(id: number): Observable<Chauffeur | undefined>;
    creerChauffeur(c: Partial<Chauffeur>): Observable<Chauffeur>;
    modifierChauffeur(c: Chauffeur): Observable<Chauffeur>;
    toggleStatutChauffeur(id: number): Observable<Chauffeur>;
    supprimerChauffeur(id: number): Observable<void>;
    getLignes(): Observable<LigneBus[]>;
    creerLigne(l: Partial<LigneBus>): Observable<LigneBus>;
    modifierLigne(l: LigneBus): Observable<LigneBus>;
    supprimerLigne(id: number): Observable<void>;
    getZones(): Observable<ZoneTaxi[]>;
    creerZone(z: Partial<ZoneTaxi>): Observable<ZoneTaxi>;
    modifierZone(z: ZoneTaxi): Observable<ZoneTaxi>;
    supprimerZone(id: number): Observable<void>;
    getStatsGlobal(): Observable<StatsTransportGlobal>;
    getStatsParLigneOuZone(): Observable<StatsParLigneOuZone[]>;
    getHistorique(): Observable<TrajetHistorique[]>;
    getHistoriqueParLigne(ligneId: number): Observable<TrajetHistorique[]>;
    getHistoriqueParZone(zoneId: number): Observable<TrajetHistorique[]>;
    /** Vrai si un véhicule de cette ligne a une course EN_COURS actuellement (utilisé pour badge de statut). */
    ligneEstEnCours(ligneId: number, vehiculesEnCourseIds: number[]): boolean;
    getIncidents(): Observable<IncidentTransport[]>;
}
//# sourceMappingURL=transport.service.d.ts.map