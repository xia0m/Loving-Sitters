import { createTheme, adaptV4Theme } from '@mui/material';

export const theme = createTheme(
  adaptV4Theme({
    typography: {
      fontFamily: '"Poppins", "sans-serif"',
      fontSize: 12,
      button: {
        textTransform: 'none',
        fontWeight: 700,
      },
    },
    palette: {
      primary: { main: '#F04040' },
      secondary: { main: '#A9A9A9' },
      info: { main: '#64b5f6' },
    },
    shape: {
      borderRadius: 5,
    },
  }),
);
