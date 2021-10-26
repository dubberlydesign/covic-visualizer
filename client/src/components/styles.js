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
    backgroundColor: "#b3bbc1",
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
    position: "relative"
  },

  cardButtons: {
    display: "flex",
    justifyContent: "center",
  },

  cardImage: {
    width: "100%",
    height: "400px",
    objectFit: "contain",
    margin: "auto",
    display: "block",
    boxSizing: "border-box",
    border: "1px solid #333",
    marginBottom: "20px",
    maxWidth: "600px",
  },
  cardVideo: {
    width: "100%",
    height: "400px",
    objectFit: "contain",
    margin: "auto",
    display: "block",
    boxSizing: "border-box",
    border: "1px solid #333",
    marginBottom: "20px",
    maxWidth: "600px",
  },

  cardImageOverLay: {
    cursor: "pointer",
    height: "400px",
    left: "20px",
    position: "absolute",
    width: "calc(100% - 40px)",
    zIndex: 5
  },

  cardImageModal: {
    objectFit: "cover",
    boxSizing: "border-box",
    border: "1px solid #333",
    width: "100%"
  },

  cardVideoModal: {
    width: "100%"
  },

  altMediaFormat: {
    fontWeight: 900,
    color: "#C6AD8F",
    marginBottom: "10px",
    width: "100%"
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

  formHolderSide: {
    display: "flex",
    margin: "0 auto",
  },

  inputText: {
    fontFamily: "sans-serif",
    fontSize: 16,
    color: "#000",
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
    marginTop: "80px",
    maxWidth: "none",
  },

  modal: {
    overflow: "scroll",
    position: "absolute",
    padding: "100px",
  },

  modalPageView: {
    outline: 0,
  },

  paperModal: {
    padding: theme.spacing(2),
    margin: theme.spacing(2),
    textAlign: "left",
    color: "white",
    backgroundColor: "#b3bbc1",
  },

  modalTextHolder: {
    maxWidth: "600px",
  },

  modalTextHolderCountryLang: {
    paddingRight: "30px",
  },

  modalTextHolderImg: {
    paddingLeft: "20px",
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

  modalArticleFiguresWrapper: {
    listStyle: "none",
    margin: 0,
    padding: 0,
  },

  modalArticleFiguresItem: {
    display: "flex",
    margin: "0 0 20px",
  },

  modalArticleFigureImageWrapper: {
    flex: "0 0 50%",
    textAlign: "center"
  },

  modalArticleFigureImage: {
    display: "block",
    height: "auto",
    width: "100%",
  },

  modalArticleFiguresVizWrapper: {
    flex: "0 0 50%",
    listStyle: "none",
    margin: 0,
    padding: 0,
    textAlign: "right",
  },

  modalPageImage: {
    height: "auto",
    width: "100%",
  },

  modalPageImagePdf: {
    cursor: "pointer"
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

  modalButton: {
    marginTop: "30px",
    backgroundColor: "#C6AD8F",
    color: "white",
    width: "auto",
    marginRight: "10px",
  },

  hideLabelsForToggle: {
    display: "none",
  },

  cardIconSet: {
    cursor: "pointer",
  },
  
  mainHeader: {
    position: "relative",
    display: "flex",
    justifyContent: "space-around",
    left: "10%",
    marginTop: "10px",
  }
}));
