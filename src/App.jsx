import { useMemo, useState } from 'react'
import './App.css'
import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import UsersPage from './pages/UsersPage'
import { getTheme } from "./theme";

function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{
        py: {xs: 2, md: 3},
      }}>
        <UsersPage/>
      </Container>
    </ThemeProvider>
  )
}

export default App
