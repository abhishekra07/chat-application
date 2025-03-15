import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#023E8A", // Deep Blue for Sidebar
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#ADE8F4", // Light Blue for highlights
      contrastText: "#003B5C",
      hover: "#0353A4",
    },
    background: {
      default: "#E3F6FD",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h5: { fontWeight: 700 },
    button: { textTransform: "none" },
  },
  shape: { borderRadius: 12 },
});

export default theme;
