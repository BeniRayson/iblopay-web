import { Permission } from '../enums/permission.enum';
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'FROZEN' | 'CLOSED';
export interface UserRole {
    role_id: string;
    name: string;
    description?: string;
    is_default: boolean;
    created_at: string;
    updated_at: string;
}
export interface UserPermission {
    permission_id: string;
    name: string;
    resource: string;
    action: string;
    description?: string;
    created_at: string;
}
export interface RolePermission {
    id: string;
    role_id: string;
    permission_id: string;
    granted_at: string;
    granted_by?: string;
}
export interface User {
    user_id: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    email?: string;
    cni_number?: string;
    photo_url?: string;
    role_id: string;
    role?: UserRole;
    status: UserStatus;
    permissions?: Permission[];
    created_at: string;
    updated_at: string;
    created_by?: string;
}
export interface CreateUserRequest {
    first_name: string;
    last_name: string;
    phone_number: string;
    email?: string;
    cni_number?: string;
    photo_url?: string;
    role_id: string;
    status?: UserStatus;
}
export interface UpdateUserRequest {
    first_name?: string;
    last_name?: string;
    phone_number?: string;
    email?: string;
    cni_number?: string;
    photo_url?: string;
    role_id?: string;
    status?: UserStatus;
}
//# sourceMappingURL=user.model.d.ts.map