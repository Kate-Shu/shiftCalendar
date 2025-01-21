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
 },
});
export default theme;