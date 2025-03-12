import { fetchGeneral } from '@/app/actions/db/read';
import LogoAnimation from '@/components/LogoAnimation'
import SocialIcons from '@/components/SocialIcons'
import { DEFAULT_VALUES } from '@/lib/const';
import * as Sentry from "@sentry/nextjs";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: "MANUTENÇÃO",
  description: "O site está em manutenção. Por favor, volte mais tarde.",
};

export default async function Maintenance() {
  let maintenanceText = DEFAULT_VALUES.general.data.maintenance_text;
  
  const generalResult = await fetchGeneral();

  if (generalResult.isOk()) {
    maintenanceText = generalResult.value.data.maintenance_text || DEFAULT_VALUES.general.data.maintenance_text;
  } else {
    Sentry.captureException(generalResult.error, {
      extra: { action: 'maintenance-page' }
    });
  }

  return (
    <main className="flex flex-col flex-1 justify-center items-center gap-2 px-5">
      <LogoAnimation />
      <h1 className="text-4xl text-center font-semibold uppercase clash">Estamos em Manutenção</h1>
      <p className="text-xl text-center text-muted-foreground mb-6 lg:mb-4">{maintenanceText}</p>
      <SocialIcons />
    </main>
  )
}