import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },

  fullList: {
    backgroundColor: "#F6F4F2",
    width: "auto",
    [theme.breakpoints.up("lg")]: {
      height: "100%",
      overflowY: "scroll",
      width: "344px",
      "& hr": {
        display: "none"
      }
    },
  },

  formControl: {
    margin: "8px 24px 24px 24px",
    minWidth: 120,
    width: "95%",
    [theme.breakpoints.up("lg")]: {
      margin: 0
    },
  },

  chips: {
    display: "flex",
    flexWrap: "wrap",
  },

  chip: {
    margin: 2,
  },

  noLabel: {
    marginTop: theme.spacing(3),
  },

  filterHeaderContainer: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
  
  filterHeader: {
    fontFamily: "sans-serif",
    fontSize: 20,
    color: "#C6AD8F",
    letterSpacing: "-1px",
    borderColor: "#C6AD8F",
    margin: "20px 20px 0 20px",
  },

  filterHeaderClose: {
    fontFamily: "sans-serif",
    fontSize: 30,
    color: "#C6AD8F",
    letterSpacing: "-1px",
    borderColor: "#C6AD8F",
    margin: "5px 20px 0 20px",
    cursor: "pointer",
    [theme.breakpoints.up("lg")]: {
      visibility: "hidden"
    },
  },

  filterBtnIcon: {
    fontFamily: "sans-serif",
    fontSize: 30,
  },

  filterButton: {
    fontSize: 16,
    fontWeight: 700,
    color: "#425664",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },

  },

  filterIcon: {
    fontSize: 40,
    color: "#425664",
  },

  filterButtonsHolder: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "0px 10px 20px 20px",
    flexDirection: "column",
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: "40px 0 20px 0",
      width: "100%"
    }
  },

  resetIconHolder: {
    margin: "0px 0px 0px 20px",
    flex: "0 0 100%",
    [theme.breakpoints.up("lg")]: {
      margin: "0",
      flex: "0 0 50%"
    }
  },

  infoIconHolder: {
    margin: "0px 0px 0px 20px",
    flex: "0 0 100%",
    [theme.breakpoints.up("lg")]: {
      margin: "0",
      flex: "0 0 50%"
    }
  },

  disableIconHolder: {
    opacity: ".25",
    margin: "0px 66px 20px 20px",
  },

  filterInfoIcon: {
    fontSize: 60,
    color: "#C6AD8F",
  },

  links: {
    marginTop: "20px",
    backgroundColor: "#C6AD8F",
    color: "white",
    width: "92%",
    [theme.breakpoints.up("lg")]: {
      marginTop: 0,
      width: "150px",
    }
  },

  dateRange: {
    padding: "35px 0px 0 25px",
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 0
    }
  },

  datePickers: {
    margin: "8px 40px 24px 40px",
    minWidth: 120,
    width: "92%",
    [theme.breakpoints.up('lg')]: {
      margin: "0 8px",
      display: "flex",
      flexDirection: "row",
    },
  },

  filterHeaders: {
    margin: "40px 0 10px 20px",
    fontWeight: "700",
    color: "#C6AD8F",
    [theme.breakpoints.up("lg")]: {
      margin: "40px 0 10px 0",
    },
  },

  datePickerKeyboard: {
    paddingLeft: "9px",
  },

  toggleMenuFilter: {
    padding: '20px 0 20px 5px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    display: "block",
    [theme.breakpoints.up("lg")]: {
      padding: '20px 0 20px 20px',
      display: "none",
    },
  },

  searchFilterHolder: {
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "20px",
      paddingBottom: "20px",
    },
  },
  
  disableFilterApply: {
    opacity: '.25',
    pointerEvents: 'none',
  },

  filterCTA: {
    color: "#C6AD8F",
    fontWeight: "900",
    textTransform: "uppercase",
    padding: "0 40px 40px 40px",
    [theme.breakpoints.up("lg")]: {
      padding: '0',
    },
  },

  filterCTAHide: {
    display: "none",
  },
}));