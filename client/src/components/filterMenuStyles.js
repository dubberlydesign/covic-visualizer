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

  filterButtonsHolder: {
    display: "flex",
    justifyContent: "flex-end",
  },

  resetIconHolder: {
    margin: "0px 10px 20px 20px",
  },

  infoIconHolder: {
    margin: "0px 66px 20px 20px",
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
    width: "150px",
  },

  dateRange: {
    padding: "35px 0px 0 25px",
  },

  datePickers: {
    margin: "8px 40px 24px 40px",
    minWidth: 120,
    width: "92%",
  },
}));
