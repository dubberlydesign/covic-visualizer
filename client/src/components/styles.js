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
    boxSizing: "border-box",
    border: "1px solid #333",
    display: "block",
    margin: "0 auto",
    maxWidth: "100%",
    width: "auto"
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
    display: "block",
    textAlign: "center"
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
    margin: "40px 0 0 20px",
    [theme.breakpoints.up('lg')]: {
      margin: "20px auto 0 auto",
    },
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
    paddingRight: "10px",
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
    clear: "both"
  },

  modalIconHolder: {
    display: "flex",
    flex: "1 1 auto",
    justifyContent: "flex-end"
  },

  ModalHeaderNavWrapper: {
    display: "flex",
    margin: "20px 0"
  },

  modalHeaderPagingContainer: {
    margin: "0 0 20px"
  },

  modalHeaderMetaContainer: {
    clear: "both",
    display: "flex"
  },

  modalHeaderMetaLeftColumn: {
    flex: "0 1 67%"
  },

  modalHeaderMetaRightColumn: {
    flex: "0 1 33%",
    textAlign: "right"
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
    display: "block",
    height: "auto",
    margin: "0 auto",
    maxWidth: "100%",
  },

  modalPageImagePdf: {
    cursor: "pointer"
  },

  ModalHeaderWrapper: {
    margin: "0 0 40px"
  },

  modalHeaderClose: {
    fontFamily: "sans-serif",
    fontSize: 50,
    color: "#C6AD8F",
    letterSpacing: "-1px",
    borderColor: "#C6AD8F",
    margin: 0,
    cursor: "pointer",
  },

  modalHeaderPrevious: {
    color: "#C6AD8F",
    cursor: "pointer",
    float: "left"
  },

  modalHeaderNext: {
    color: "#C6AD8F",
    cursor: "pointer",
    float: "right"
  },

  modalButton: {
    backgroundColor: "#C6AD8F",
    color: "white",
    flex: "0 0 auto",
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
    paddingBottom: "40px",
    paddingLeft: "40px",
    [theme.breakpoints.up('lg')]: {
      display: "flex",
      justifyContent: "space-around",
      left: "10%",
      marginTop: "10px",
    },
  },

  searchClearIcon: {
    color: "#C6AD8F",
    opacity: ".5",
  }
}));
