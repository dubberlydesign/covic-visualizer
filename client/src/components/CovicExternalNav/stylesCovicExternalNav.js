import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  covicExternalNavMenuHolder: {},

  covicExternalNavList: {
    display: "flex",
    color: "#C6AD8F",
    listStyle: "none"
  },

  covicExternalNavListItem: {
    textDecoration: "none",
    marginRight: "40px",
    marginTop: "20px",
  },

  covicMenuLabel: {
    marginTop: "10px",
    cursor: "pointer",
    fontWeight: "900",
  },

  covicLogo: {
    margin: "auto",
    display: "block",
    width: "125px",
  }
}));
