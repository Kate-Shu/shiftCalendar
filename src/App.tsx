import { CssBaseline, ThemeProvider } from '@mui/material'
import ShiftCalendarPage from './pages/ShiftCalendarPage'
import theme from './themes/CssVariableTheme'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ShiftCalendarPage />
    </ThemeProvider>
  )
}
export default App
