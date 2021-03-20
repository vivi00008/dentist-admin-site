import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext'
import { createMuiTheme, responsiveFontSizes, MuiThemeProvider } from '@material-ui/core'

let theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2ec4b6"
    },
  },
  typography: {
    fontFamily: [
      "Kanit",
      "sans-serif"
    ].join(','),
  },
  overrides: {
    MuiAppBar: {
        root: {
            transform: 'translateZ(0)'
        }
    }
}
})
theme = responsiveFontSizes(theme)

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
