// src/app/modules/auth/enums/permission.enum.ts
export enum Permission {
  // User management
  USER_CREATE = 'USER_CREATE',
  USER_READ = 'USER_READ',
  USER_UPDATE = 'USER_UPDATE',
  USER_DELETE = 'USER_DELETE',
  USER_SUSPEND = 'USER_SUSPEND',
  USER_ACTIVATE = 'USER_ACTIVATE',

  // Role management
  ROLE_CREATE = 'ROLE_CREATE',
  ROLE_READ = 'ROLE_READ',
  ROLE_UPDATE = 'ROLE_UPDATE',
  ROLE_DELETE = 'ROLE_DELETE',
  ROLE_ASSIGN = 'ROLE_ASSIGN',

  // Permission management
  PERMISSION_READ = 'PERMISSION_READ',
  PERMISSION_ASSIGN = 'PERMISSION_ASSIGN',
  PERMISSION_REVOKE = 'PERMISSION_REVOKE',

  // Dashboard
  DASHBOARD_VIEW = 'DASHBOARD_VIEW',

  // System
  SYSTEM_SETTINGS = 'SYSTEM_SETTINGS',
  AUDIT_LOG_VIEW = 'AUDIT_LOG_VIEW'
}

export const PermissionLabels: Record<Permission, string> = {
  [Permission.USER_CREATE]: 'Create Users',
  [Permission.USER_READ]: 'View Users',
  [Permission.USER_UPDATE]: 'Update Users',
  [Permission.USER_DELETE]: 'Delete Users',
  [Permission.USER_SUSPEND]: 'Suspend Users',
  [Permission.USER_ACTIVATE]: 'Activate Users',
  [Permission.ROLE_CREATE]: 'Create Roles',
  [Permission.ROLE_READ]: 'View Roles',
  [Permission.ROLE_UPDATE]: 'Update Roles',
  [Permission.ROLE_DELETE]: 'Delete Roles',
  [Permission.ROLE_ASSIGN]: 'Assign Roles',
  [Permission.PERMISSION_READ]: 'View Permissions',
  [Permission.PERMISSION_ASSIGN]: 'Assign Permissions',
  [Permission.PERMISSION_REVOKE]: 'Revoke Permissions',
  [Permission.DASHBOARD_VIEW]: 'View Dashboard',
  [Permission.SYSTEM_SETTINGS]: 'System Settings',
  [Permission.AUDIT_LOG_VIEW]: 'View Audit Logs'
};
