// src/app/modules/auth/enums/role.enum.ts
export enum Role {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  ADMIN = 'ADMIN'
}

export const RoleLabels: Record<Role, string> = {
  [Role.SYSTEM_ADMIN]: 'System Administrator',
  [Role.ADMIN]: 'Administrator'
};
