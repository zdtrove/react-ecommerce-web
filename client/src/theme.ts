import { createTheme, makeStyles } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import pink from '@material-ui/core/colors/pink';
import green from '@material-ui/core/colors/green';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    green: Palette['primary'];
    aquamarine: Palette['primary'];
    antiquewhite: Palette['primary'];
    chartreuse: Palette['primary'];
  }
  interface PaletteOptions {
    green: PaletteOptions['primary'];
    aquamarine: PaletteOptions['primary'];
    antiquewhite: PaletteOptions['primary'];
    chartreuse: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
      dark: teal[600],
      light: teal[400]
    },
    secondary: {
      dark: pink[900],
      main: pink[500],
      light: pink[400]
    },
    green: {
      main: green['A400'],
      dark: green['A700'],
      light: green['A200']
    },
    aquamarine: {
      main: 'aquamarine',
      dark: 'chartreuse'
    },
    antiquewhite: {
      main: 'antiquewhite'
    },
    chartreuse: {
      main: 'chartreuse'
    }
  },
  typography: {
    fontFamily: 'Montserrat'
  }
});

export const useGlobalStyles = makeStyles(() => ({
  boxShadow: {
    boxShadow:
      '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)'
  }
}));
