import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import store from './Redux/store';
import {Provider} from 'react-redux'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: 'Times New Roman',
      textTransform: 'none',
      fontSize: 18,
      fontWeight:'900'
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
       <App />
    </ThemeProvider>
  </Provider>
);
