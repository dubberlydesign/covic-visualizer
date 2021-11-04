import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  covicExternalNavMenuHolder: {
    fontSize: "16px",
    paddingBottom: "40px"
  },

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

  covicMenuSelected: {
    textDecoration: "underline",
    color: "#b3bbc1",
  },

  covicLogo: {
    margin: "auto",
    display: "block",
    width: "125px",
    cursor: "pointer",
  }
}));
