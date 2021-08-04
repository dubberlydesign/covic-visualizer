import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  list: {
    width: 250,
  },

  fullList: {
    width: "auto",
  },

  formControl: {
    margin: "8px 24px 24px 24px",
    minWidth: 120,
    width: "95%",
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
    justifyContent: "space-between",
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
  },

  filterBtnIcon: {
    fontFamily: "sans-serif",
    fontSize: 30,
  },

  filterButton: {
    fontSize: 16,
    fontWeight: 700,
    color: "#425664",
  },

  filterIcon: {
    fontSize: 40,
    color: "#425664",
  },

  infoIconHolder: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "0px 75px 20px 20px",
  },

  filterInfoIcon: {
    fontSize: 60,
    color: "#C6AD8F",
  },

  links: {
    marginTop: "20px",
    backgroundColor: "#C6AD8F",
    color: "white",
    width: "150px",
  },
}));
