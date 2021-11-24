import { makeStyles } from "@material-ui/core/styles";

/*
* Edit main color scheme within editPalette object
*/
const editPalette = {
  creamBgColor: "#F6F4F2",
  lightGreyBgColor: "#b3bbc1",
  tanBgColor: "#C6AD8F",
  filterBgColor: "#425664"
}

/*
* Edit font sizes within editFontSizes object
*/
const editFontSizes = {
  filterHeaderFontSize: "20px",
  filterHeaderCloseFontSize: "30px",
  filterButtonIconFontSize: "30px",
  filterButtonFontSize: "16px",
  filterIconFontSize: "40px",
  filterInfoIconFontSize: "60px",
  mailToLinkFontSizes: "16px",
}

export const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },

  fullList: {
    backgroundColor: editPalette.creamBgColor,
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
    fontSize: editFontSizes.filterHeaderFontSize,
    color: editPalette.tanBgColor,
    letterSpacing: "-1px",
    borderColor: editPalette.tanBgColor,
    margin: "20px 20px 0 20px",
  },

  filterHeaderClose: {
    fontFamily: "sans-serif",
    fontSize: editFontSizes.filterHeaderCloseFontSize,
    color: editPalette.tanBgColor,
    letterSpacing: "-1px",
    borderColor: editPalette.tanBgColor,
    margin: "5px 20px 0 20px",
    cursor: "pointer",
    [theme.breakpoints.up("lg")]: {
      visibility: "hidden"
    },
  },

  filterBtnIcon: {
    fontFamily: "sans-serif",
    fontSize: editFontSizes.filterButtonIconFontSize,
  },

  filterButton: {
    fontSize: editFontSizes.filterButtonFontSize,
    fontWeight: 700,
    color: editPalette.filterBgColor,
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },

  },

  filterIcon: {
    fontSize: editFontSizes.filterIconFontSize,
    color: editPalette.filterBgColor,
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
    fontSize: editFontSizes.filterInfoIconFontSize,
    color: editPalette.tanBgColor,
  },

  links: {
    marginTop: "20px",
    backgroundColor: editPalette.tanBgColor,
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
    color: editPalette.tanBgColor,
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
    color: editPalette.tanBgColor,
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

  mailToLinkHolder: {
    margin: "80px 0 0 0",
  },

  mailtToLink: {
    color: "#000",
    fontStyle: "italic",
    fontSize: editFontSizes.mailToLinkFontSizes,
  }
}));
