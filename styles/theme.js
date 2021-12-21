import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        // Name of the slot

        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

export default theme;
