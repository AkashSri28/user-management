import { useMemo, useState } from 'react'
import './App.css'
import { Container, CssBaseline, ThemeProvider } from '@mui/material'
import UsersPage from './pages/UsersPage'
import { getTheme } from "./theme";
import { Route, Routes } from 'react-router-dom';
import UserDetails from './pages/UserDetails';

function App() {
  const [mode, setMode] = useState("light");
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{
        py: {xs: 2, md: 3},
      }}>
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetails />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
