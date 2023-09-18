import { fetchConfig } from '@/lib/api';

export const lookbookDate = '2023-08-11';

export const checkLocalStorageVersion = async () => {
  const config = await fetchConfig();

  return config.local_storage_version;
};

export const checkMaintenanceMode = async () => {
  const config = await fetchConfig();

  return config.maintenance_mode;
};

export const fetchMaintenanceText = async () => {
  const config = await fetchConfig();

  return config.maintenance_text;
};