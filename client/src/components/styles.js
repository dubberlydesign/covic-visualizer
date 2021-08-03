import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#F6F4F2",
    height: "100vh",
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
    margin: "0 auto 50px auto",
    paddingTop: "50px",
  },

  inputText: {
    fontSize: 50,
    color: "#C6AD8F",
    letterSpacing: "-.5px",
    borderColor: "#C6AD8F",
  },

  helperText: {
    fontSize: 16,
    color: "#425664",
    textTransform: "uppercase",
    fontWeight: 700,
  },
}));