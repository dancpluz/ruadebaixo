import CircularProgress from '@mui/material/CircularProgress';
import { Screen } from '@/components/styles/OtherStyles.styled'

export default function Loading() {

  return (
    <Screen>
      <CircularProgress color="inherit" />
    </Screen>
  )
}