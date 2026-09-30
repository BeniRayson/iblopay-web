

export interface SettingsAction {
  label: string;
  icon?: string;

  actionId: string;

  requiresConfirmation?: boolean;

  danger?: boolean;
}

export interface SettingsSubGroup {
  title: string;
  actions: SettingsAction[];
}

export interface SettingsSection {
  key: string;
  title: string;
  icon: string;
  description?: string;

  actions?: SettingsAction[];

  groups?: SettingsSubGroup[];
}

export interface SettingsCategory {
  key: string;
  title: string;
  icon: string;
  description: string;
  route: string;
  sectionCount: number;
}
