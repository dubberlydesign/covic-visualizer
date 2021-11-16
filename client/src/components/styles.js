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
    zIndex: 5,
  },

  cardImageModal: {
    boxSizing: "border-box",
    border: "1px solid #333",
    display: "block",
    margin: "0 auto",
    maxWidth: "100%",
    width: "auto",
  },

  cardVideoModal: {
    maxWidth: "100%",
    width: "auto",
  },

  altMediaFormat: {
    fontWeight: 900,
    color: "#C6AD8F",
    marginBottom: "10px",
    width: "100%",
  },

  modalImagesHolder: {
    display: "block",
    position: "relative",
    textAlign: "center",
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
      paddingTop: "20px",
      margin: "0 auto 0 auto",
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

  // start
  // styles for Search Filter
  //
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
  // end
  // styles for Search Filter
  //

  // start
  // styles for Modal
  //
  modal: {
    padding: 0,
    overflow: "scroll",
    position: "absolute",
    padding: "100px",
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
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
    height: "auto",
    [theme.breakpoints.down("xs")]: {
      backgroundColor: "#fff",
      borderRadius: 0,
      height: "100vh",
      margin: 0,
      padding: 0
    },
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
    maxWidth: "100%",
    width: "auto",
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
    borderRadius: 0,
    color: "white",
    flex: "0 0 auto",
    width: "auto",
    marginRight: "10px",
    [theme.breakpoints.down("xs")]: {
      borderRadius: "50%",
      flex: "0 0 64px",
      fontSize: "12px",
      height: "64px",
      padding: 0
    }
  },

  hideLabelsForToggle: {
    display: "none",
  },

  cardIconSet: {
    cursor: "pointer",
  },
  // end
  // styles for Modal
  //

  //
  // styles for Header Main
  //
  mainHeader: {
    position: "relative",
    zIndex: "1300",
    margin: "0",
    [theme.breakpoints.up('lg')]: {
      display: "flex",
      justifyContent: "space-between",
      margin: "0",
    },
  },

  searchClearIcon: {
    color: "#C6AD8F",
    opacity: ".5",
  },

  toggleMenu: {
    padding: '20px 0 20px 5px',
    display: "none",
    [theme.breakpoints.up("lg")]: {
      padding: '0px 0 20px 20px',
      display: "block",
    },
  },

  menuRight: {
    display: "none",
    [theme.breakpoints.up("lg")]: {
      display: "block",
    },
  },

  filterMenuWrapper: {
    margin: "10px auto",
    [theme.breakpoints.up("lg")]: {
      margin: 0,
    },
  }
}));
