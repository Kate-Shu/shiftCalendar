import { createTheme } from '@mui/material/styles';

const theme = createTheme({
 palette: {
  primary: {
   main: '#009D72',
  },
  secondary: {
   main: 'rgb(139, 196, 180)',
   light: 'rgb(190,214,207)',
   dark: '#000000',
   contrastText: 'rgba(0, 0, 0, 0.6)',
  },
  background: {
   default: '#f4f1f0'
  },
  action: {
   hover: '#ebe5e3'
  },
 },
 breakpoints: {
  values: {
   xs: 0,
   sm: 600,
   md: 900,
   lg: 1200,
   xl: 1536,
  },
 },
});
export default theme;