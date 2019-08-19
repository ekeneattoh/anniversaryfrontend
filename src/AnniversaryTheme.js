import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff",
      light: "#757ce8",
      dark: "#1e88e5",
      contrastText: "#424242" //text color..
    },
    secondary: {
      main: "#1e88e5", //tab liner
      light: "#ff7961",
      dark: "#ba000d",
      contrastText: "#424242"
    }
  },
  typography: {
    fontSize: 12,
    useNextVariants: true,
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
