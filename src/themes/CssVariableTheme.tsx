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
   contrastText: '#ffffff',
  },
  background: {
   default: '#f4f1f0'
  },
  action: {
   hover: '#ebe5e3'
  }
 },
});
export default theme;