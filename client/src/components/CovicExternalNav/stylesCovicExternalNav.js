import { makeStyles } from "@material-ui/core/styles";

/*
* Edit main color scheme within editPalette object
*/
const editPalette = {
  creamBgColor: "#F6F4F2",
  lightGreyBgColor: "#b3bbc1",
  tanBgColor: "#C6AD8F",
}

/*
* Edit font sizes within editFontSizes object
*/
const editFontSizes = {
  covicExternalNavMenuFontSize: "16px"
}

export const useStyles = makeStyles(theme => ({
  covicExternalNavMenuHolder: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: editFontSizes.covicExternalNavMenuFontSize,
    margin: "20px 0 0 20px",
    [theme.breakpoints.up("lg")]: {
      display: "block",
      margin: "0",
      paddingBottom: "40px",
    },
  },

  covicExternalNavList: {
    display: "flex",
    color: editPalette.tanBgColor,
    listStyle: "none"
  },

  covicExternalNavListItem: {
    textDecoration: "none",
    margin: "0",
    [theme.breakpoints.up("lg")]: {
      marginRight: "40px",
      marginTop: "20px",
    },
  },

  covicMenuLabel: {
    marginTop: "10px",
    cursor: "pointer",
    fontWeight: "900",
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },

  covicMenuSelected: {
    textDecoration: "underline",
    color: editPalette.lightGreyBgColor,
  },

  covicLogo: {
    margin: "auto",
    display: "block",
    width: "125px",
    cursor: "pointer",
  },

  covicFlyOut: {
    display: "block",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  }
}));
