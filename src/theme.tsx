import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    // primary: {
    //   main: purple[500],
    // },
    // secondary: {
    //   main: green[500],
    // },
    // text: {
    //   //   primary: "red",
    // },
  },
  typography: {
    fontFamily: "Calibri, Sans-Serif",
  },
  components: {
    MUIDataTableBodyCell: {
      styleOverrides: {
        root: {
          padding: "15px 0px",
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          //   color: "rgb(255, 255, 255)",
          //   borderBottom: "none",
          textTransform: "none",
          padding: "0px",
          fontWeight: "700",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          //   color: "rgb(255, 255, 255)",
          //   borderBottom: "none",
          textTransform: "none",
          padding: "0px",
          fontWeight: "700",

        },
      },
    },
  },
});
