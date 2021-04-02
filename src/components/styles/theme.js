import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#BB86FC",
    },
    secondary: {
      main: "#03DAC5",
    },
    error: {
      main: "#CF6679",
    },
    background: {
      paper: "#1E1E1E",
      default: "#121212",
    },
  },
  overrides: {
    MuiAppBar: {
      colorDefault: {
        backgroundColor: "#1F1F1F",
      },
    },
  },
});

export default theme;
