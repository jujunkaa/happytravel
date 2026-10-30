import { createTheme } from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';

export const matcha = '#BFD3A8';
export const matchaDeep = '#4F6B3C';
export const strawberry = '#F8CFD3';
export const strawberryDeep = '#A8404F';
export const milk = '#F6F8EF';
export const ink = '#2E3A27';

const font = '"Comfortaa", "Helvetica Neue", Arial, sans-serif';

export const theme = createTheme(
  {
    palette: {
      mode: 'light',
      primary: { main: matcha, dark: matchaDeep, contrastText: ink },
      secondary: { main: strawberry, dark: strawberryDeep, contrastText: strawberryDeep },
      background: { default: milk, paper: '#FFFFFF' },
      text: { primary: ink, secondary: 'rgba(46, 58, 39, 0.66)' },
      divider: 'rgba(79, 107, 60, 0.16)',
    },
    shape: { borderRadius: 12 },
    typography: {
      fontFamily: font,
      h4: { fontWeight: 700, fontSize: '2.4rem', lineHeight: 1.15 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      subtitle1: { fontWeight: 700 },
      button: { textTransform: 'none', fontWeight: 700 },
    },
    components: {
      MuiCard: {
        defaultProps: { variant: 'outlined' },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 999,
            variants: [
              { props: { variant: 'text', color: 'primary' }, style: { color: matchaDeep } },
              { props: { variant: 'outlined', color: 'primary' }, style: { color: matchaDeep, borderColor: '#9DBE86' } },
            ],
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: { textTransform: 'none', fontWeight: 700, fontSize: '0.95rem', '&.Mui-selected': { color: matchaDeep } },
        },
      },
      MuiTabs: {
        styleOverrides: {
          indicator: { backgroundColor: '#EFA3AC', height: 3, borderRadius: 3 },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: { '&.Mui-focused': { color: matchaDeep } },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: { color: matchaDeep },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          colorPrimary: { color: matchaDeep },
        },
      },
    },
  },
  ruRU,
);
