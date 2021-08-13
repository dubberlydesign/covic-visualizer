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
    minWidth: "420px",
  },

  cardButtons: {
    display: "flex",
    justifyContent: "center",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
    paddingTop: 150,
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
    maxWidth: "400px",
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },

  modalChipHolder: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
