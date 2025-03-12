import DarkModeToggle from "@/components/DarkModeToggle";
import { fetchGeneral } from "../actions/db/read";
import * as Sentry from "@sentry/nextjs";

export default async function Home() {
  // Utilizando o padrão Result para lidar com possíveis erros
  const generalResult = await fetchGeneral();
  
  // Valores padrão caso ocorra erro
  let generalData: any = { links: [], questions: [] };
  
  if (generalResult.isOk()) {
    generalData = generalResult.value.data;
  } else {
    // Registra o erro no Sentry, mas continua com valores padrão
    Sentry.captureException(generalResult.error, {
      extra: { action: 'home-page' }
    });
  }
  
  return (
    <div>
      <pre>
        {JSON.stringify(generalData.links, null, 2)}
        {JSON.stringify(generalData, null, 2)}
      </pre>
      <DarkModeToggle />
    </div>
  )
}
