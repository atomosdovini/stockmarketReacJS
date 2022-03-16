import React from 'react';
import { createTheme } from '@material-ui/core/styles';


const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: 'var(--light-primary-color)',

      },
      secondary: {
        // This is green.A700 as hex.
        main: 'var(--light-primary-color)',
      },

    },
    typography: {
      fontFamily: [
        'Roboto',
      ],
    },
    
  });



export default theme
