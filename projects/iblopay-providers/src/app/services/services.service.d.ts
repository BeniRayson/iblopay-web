import { Observable } from 'rxjs';
import { ServiceInstitution } from '../models/provider.model';
export declare class ServicesService {
    private services;
    private nextId;
    getAll(): Observable<ServiceInstitution[]>;
    getById(id: number): Observable<ServiceInstitution | undefined>;
    create(service: Partial<ServiceInstitution>): Observable<ServiceInstitution>;
    update(service: ServiceInstitution): Observable<ServiceInstitution>;
    delete(id: number): Observable<void>;
}
//# sourceMappingURL=services.service.d.ts.map