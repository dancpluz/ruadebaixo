import CircularProgress from '@mui/material/CircularProgress';
import { CenterScreen } from '@/components/styles/OtherStyles.styled'

export default function Loading() {
  return (
    <CenterScreen>
      <CircularProgress color="inherit" />
    </CenterScreen>
  )
}