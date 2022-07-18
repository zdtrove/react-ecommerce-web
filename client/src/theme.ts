import { createTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import pink from '@material-ui/core/colors/pink';

export const theme = createTheme({
  palette: {
    primary: {
      main: teal[500]
    },
    secondary: {
      main: pink[500]
    }
  },
  typography: {
    fontFamily: 'cursive'
  }
});
