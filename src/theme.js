import { createTheme } from "@mui/material/styles";

export const getTheme = (mode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#1976d2" },
      secondary: { main: "#7c4dff" },
      background: {
        default: mode === "light" ? "#f6f7fb" : "#0f0f0f",
        paper: mode === "light" ? "#fff" : "#121212",
      },
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily:
        'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
      h6: { fontWeight: 700 },
    },
    components: {
      MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } },
      MuiContainer: { defaultProps: { maxWidth: "lg" } },
    },
  });
