import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#F6F4F2",
    height: "auto",
  },

  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "left",
    color: "white",
    backgroundColor: "#425664",
  },

  box: {
    display: "flex",
    flexWrap: "wrap",
  },

  cardContainer: {
    backgroundColor: "#fff",
    textAlign: "left",
    padding: "20px",
  },

  cardImage: {
    width: "100%",
    height: "400px",
    objectFit: "cover",
    margin: "auto",
    display: "block",
    boxSizing: "border-box",
    border: "1px solid #333",
    marginBottom: "20px",
  },

  cardLabel: {
    color: "#fff",
    fontFamily: "sans-serif",
    overflowWrap: "break-word",
    width: "500px",
    paddingTop: "10px",
  },

  loader: {
    position: "fixed",
    bottom: "0",
    left: "50%",
    color: "#C6AD8F",
  },

  links: {
    marginTop: "20px",
    backgroundColor: "#C6AD8F",
    color: "white",
    width: "150px",
  },

  gridHolder: {
    padding: "20px",
  },

  formHolder: {
    display: "flex",
    width: "80%",
    margin: "0 auto",
    paddingTop: "50px",
  },

  inputText: {
    fontFamily: "sans-serif",
    fontSize: 50,
    color: "#C6AD8F",
    letterSpacing: "-2.5px",
    borderColor: "#C6AD8F",
  },

  helperText: {
    fontSize: 16,
    color: "#425664",
    textTransform: "uppercase",
    fontWeight: 700,
  },

  searchFilter: {
    display: "flex",
    justifyContent: "center",
    padding: "5px",
    flexWrap: "wrap",
    "& > *": {
      margin: "5px",
    },
    maxWidth: "700px",
    margin: "0 auto",
  },

  searchNarrow: {
    margin: "0 auto 50px auto",
  },

  searchNarrowLabel: {
    margin: "0 auto",
    fontFamily: "sans-serif",
    textAlign: "center",
    textTransform: "uppercase",
  },

  chip: {
    margin: "5px",
  },

  appBar: {
    backgroundColor: "#F6F4F2",
  },

  containerScroll: {
    marginTop: "220px",
    maxWidth: "none",
  },
}));
