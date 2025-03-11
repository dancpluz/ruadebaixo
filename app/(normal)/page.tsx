import DarkModeToggle from "@/components/DarkModeToggle";
import { fetchGeneral } from "../actions/db/read";

export default async function Home() {
  const general = await fetchGeneral();
  return (
    
    <div>
      <pre>
        {JSON.stringify(general.data.links, null, 2)}
        {JSON.stringify(general, null, 2)}
      </pre>
      <DarkModeToggle />
    </div>
  )
}
