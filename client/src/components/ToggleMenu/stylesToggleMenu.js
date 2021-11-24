import { makeStyles } from "@material-ui/core/styles";

/*
* Edit main color scheme within editPalette object
*/
const editPalette = {
  tanBgColor: "#C6AD8F",
}

/*
* Edit font sizes within editFontSizes object
*/
const editFontSizes = {
  controlLabelFontSize: "14px"
}

export const useStyles = makeStyles(theme => ({
  toggleContainer: {
    margin: "20px 0 0 20px",
  },

  toggleSwitchOrder: {},
 
  toggleSwitchOrderLabel: {
    color: editPalette.tanBgColor,
  },

  formControlLabel: {
    color: editPalette.tanBgColor,
    fontSize: editFontSizes.controlLabelFontSize
  }
}));
