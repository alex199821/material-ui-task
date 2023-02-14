import { createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(25, 118, 210, 1)",
    },
    secondary: {
      main: "rgba(0, 0, 0, 0.54)",
    },
    // text: {
    //   //   primary: "red",
    // },
  },
  typography: {
    fontFamily: "Calibri, Sans-Serif",
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        head: {
          textTransform: "none",
          fontWeight: "600",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          padding: "0px",
          fontWeight: "600",
          minWidth: "fit-content",
        },
      },
    },
    MuiFormGroup: {
      styleOverrides: {
        root: {
          padding: "15px",
        },
      },
    },
    MUIDataTableViewCol: {
      styleOverrides: {
        title: {
          padding: "15px 15px 0px 15px",
        },
      },
    },
    MUIDataTableFilter: {
      styleOverrides: {
        reset: {
          display: "flex",
          alignItems: "center",
          columnGap: "10px",
        },
      },
    },
    // MuiTextField: {
    //   styleOverrides: {
    //     root: {
    //       padding: "0px",
    //     },
    //   },
    // },
  },
});
