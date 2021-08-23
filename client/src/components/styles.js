import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#F6F4F2",
    overflowY: "scroll",
    height: "100vh",
  },

  paper: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "left",
    color: "white",
    backgroundColor: "#425664",
    maxWidth: "600px",
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

  cardButtons: {
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.up("lg")]: {
      "& > button > span": {
        fontSize: "10px"
      },
      "& > button ~ a": {
        fontSize: "10px"
      }
    }
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
    maxWidth: "600px",
  },

  cardImageModal: {
    height: "400px",
    objectFit: "cover",
    boxSizing: "border-box",
    border: "1px solid #333",
    margin: "20px",
    maxWidth: "200px",
  },

  altMediaFormat: {
    fontWeight: 900,
    color: "#C6AD8F",
    marginBottom: "10px",
  },

  modalImagesHolder: {
    display: "flex",
    flexWrap: "wrap",
  },

  cardLabel: {
    color: "#fff",
    fontFamily: "sans-serif",
    overflowWrap: "break-word",
    width: "500px",
    paddingTop: "10px",
  },

  cardTitle: {
    marginBottom: "20px",
    fontWeight: 700,
    fontSize: "18px",
  },

  initLoader: {
    position: "fixed",
    top: "250px",
    left: "49.5%",
    color: "#C6AD8F",
  },

  loader: {
    position: "fixed",
    bottom: "0",
    left: "50%",
    color: "#C6AD8F",
  },

  links: {
    marginTop: "30px",
    backgroundColor: "#C6AD8F",
    color: "white",
    width: "150px",
    marginRight: "10px",
  },

  gridHolder: {
    padding: "20px",
  },

  formHolder: {
    display: "flex",
    width: "80%",
    margin: "0 auto",
    paddingTop: "50px",
    [theme.breakpoints.up("lg")]: {
      paddingLeft: "344px"
    },
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

  modal: {
    overflow: "scroll",
    position: "absolute",
    padding: "100px",
  },

  paperModal: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "left",
    color: "white",
    backgroundColor: "#425664",
  },

  modalTextHolder: {
    maxWidth: "600px",
  },

  modalTextHolderLast: {
    maxWidth: "600px",
    marginBottom: 20,
  },

  modalTextHolderHeader: {
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 10,
  },

  modalChipHolder: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    flexWrap: "wrap",
  },

  modalIconHolder: {
    display: "flex",
    justifyContent: "flex-end",
  },

  modalHeaderClose: {
    fontFamily: "sans-serif",
    fontSize: 50,
    color: "#C6AD8F",
    letterSpacing: "-1px",
    borderColor: "#C6AD8F",
    margin: "0 0 0 0",
    cursor: "pointer",
  },

  modalButtonHolder: {
    display: "flex",
  },
}));
