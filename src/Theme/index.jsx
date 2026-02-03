import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0e7cdc",
    },
    success: {
      main: "#2E7D32",
    },
    background: {
      default: "#F8F7F7",
      paper: "#F8F7F7",
    },
    text: {
      primary: "#010b13",
      secondary: "#637381",
      disabled: "#919EAB",
    },
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,

    h6: {
      fontSize: 11,
      fontWeight: 500,
      color: "#637381",
    },
    h7: {
      fontSize: 12,
      fontWeight: 600,
      color: "#637381",
      textAlign: "center",
    },
    h8: {
      fontSize: 14,
      fontWeight: 600,
      color: "#010b13ff",
      // textAlign: "center",
    },
    body1: {
      fontSize: 14,
      fontWeight: 500,
    },

    body2: {
      fontSize: 12,
      fontWeight: 600,
      color: "#637381",
    },
    body3: {
      fontSize: 14,
      fontWeight: 600,
      color: "#010b13ff",
      textTransform: "uppercase",
      lineHeight: 1.2,
    },
    body4: {
      color: "#919EAB",
      fontSize: 12,
      fontWeight: 700,
      textTransform: "uppercase",
    },

    caption: {
      fontSize: 20,
      fontWeight: 600,
      color: "#919EAB",
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: 8,
          bgcolor: "#fff",
          borderRadius: "30px",
          border: "1px solid #637381",
          color: "#637381",
          textTransform: "none",
          minHeight: "22px",
          paddingTop: "2px",
          paddingBottom: "2px",
          paddingLeft: "12px",
          paddingRight: "12px",
          lineHeight: 1,
        },
      },
      variants: [
        {
          props: { variant: "Black-outlined" },
          style: {
            fontWeight: 600,
            fontSize: "9px",
            backgroundColor: "#fff",
            color: "#111",
            border: "1.5px solid #637381",
            "&:hover": {
              backgroundColor: "#f5f5f5",
              borderColor: " #000",
            },
          },
        },

        {
          props: { variant: "black" },
          style: {
            fontWeight: 600,
            fontSize: "9px",
            backgroundColor: "#111",
            color: "#fff",

            "&:hover": {
              backgroundColor: "#000",
            },
          },
        },
        {
          props: { variant: "error" },
          style: {
            textTransform: "none",
            fontSize: "9px",
            fontWeight: 600,
            border: "1px solid #fff",
            // borderRadius: "8px",
            // padding: "10px 16px",
            color: "#fff",
            background: "linear-gradient(180deg, #d32f2f, #b71c1c)",
            boxShadow: "none",
            "&:hover": {
              background: "linear-gradient(180deg, #e53935, #c62828)",
              boxShadow: "none",
            },
            "&.Mui-disabled": {
              background: "#f5c6c6",
              color: "#fff",
            },
          },
        },
      ],
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#111",
          fontSize: 10,
          padding: "6px 10px",
          borderRadius: "8px",
        },
        arrow: {
          color: "#111",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#637381",
          textDecoration: "none",
          fontWeight: 600,
          "&:hover": {
            textDecoration: "none",
            color: "#125ea2",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          height: 44,
          borderRadius: 8,
          paddingLeft: 16,
          paddingRight: 16,
          gap: 12,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          overflow: "hidden",
          whiteSpace: "nowrap",
          transition: "opacity 0.2s ease, max-width 0.3s ease",
          fontSize: 12,
          fontWeight: 600,
          color: "#637381",
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid #E9EDF2",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        root: {
          backgroundColor: "#F8F7F7",
          borderBottom: "1px solid #e0e0e0",
          boxShadow: "none",
          paddingTop: 6,
          paddingBottom: 6,
          paddingLeft: 12,
          paddingRight: 12,
        },
        head: {
          fontSize: 12,
          fontWeight: 600,
          color: "#637381",
          // backgroundColor: "#F4F6F8",
          textTransform: "uppercase",
          lineHeight: 1.2,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "none", // 👈 shadow remove
          border: "1px solid #e0e0e0", // 👈 normal browser-like border
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          border: "1px solid #e0e0e0",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          marginTop: 12,
          marginBottom: 12,
          // borderColor: "#fb1919",
        },
      },
    },

    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: 12,
          color: "#637381",
        },
        input: {
          "&::placeholder": {
            color: "#919EAB",
            opacity: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: 12,

          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#637381", // normal
          },

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#637381",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#637381", // 👈 blue hat gaya
            borderWidth: "1px",
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: 18,
          color: "#637381",
          minWidth: 0,
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 28,
          height: 28,
          cursor: "pointer",
        },
      },
    },
  },
});

export default theme;
