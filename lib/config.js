import { fetchConfig } from '@/lib/api';

const config = fetchConfig();

export const lookbookDate = '2023-08-11';

export const localStorageVersion = config.local_storage_version;

export const maintenanceMode = config.maintenance_mode;