import React, { useState, useEffect } from "react";
import axios from "axios";

import InfiniteScroll from "react-infinite-scroll-component";
import { createTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ElevationScroll from "./ElavationScroll";

import FilterMenu from "./FilterMenu";
import { useStyles } from "./styles";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Chip from "@material-ui/core/Chip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

let globFilter = {};
let resetField = false;

const Articles = props => {
  const theme = createTheme();

  const classes = useStyles(theme);
  const [data, setData] = useState([]);
  const [dataOffset, setDataOffset] = useState("");
  const [searchValue, setSearchVal] = useState("");
  const [filteringValues, setFilterValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const requestAmount = 100;

  const [open, setOpen] = useState(false);
  const [curItem, setCurItem] = useState(null);
  const [curFigureData, setCurFigureData] = useState("");
  const [isMoreEntries, setIsMoreEntries] = useState(true);

  const requestData = (
    queryType = "",
    filterType = "",
    term = "",
    fieldCol = ""
  ) => {
    setIsLoading(true);
    axios
      .get("/api/v1/covic-data", {
        params: {
          baseType: "Figures",
          offset: dataOffset,
          requestAmount,
          queryType,
          filterType,
          term,
          fieldCol,
          fieldReset: resetField,
        },
      })
      .then(response => {
        const chronological = response.data.records
          .slice()
          .sort(
            (a, b) =>
              new Date(a.fields["Date (from Article)"]) -
              new Date(b.fields["Date (from Article)"])
          );

        setIsLoading(false);
        setData(data.concat(chronological));
        setDataOffset(response.data.offset);
        if (response.data.offset === undefined) {
          setIsMoreEntries(false);
        }
      });
  };

  const requestMetaData = () => {
    axios
      .get("/api/v1/covic-data/metadata", {
        params: { baseType: "Metadata", offset: 0, requestAmount: 50 },
      })
      .then(response => {
        const filterValuesObject = {};
        response.data.records.forEach(record => {
          if (record?.fields["Field Options"]) {
            filterValuesObject[record.fields["Field Name"]] = record?.fields[
              "Field Options"
            ]
              ?.split(", ")
              .sort();
          }
        });

        setFilterValues(filterValuesObject);

        requestData();
      });
  };

  useEffect(() => {
    requestMetaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {}, [filteringValues]);

  const isEmpty = obj => {
    return Object.keys(obj).length === 0;
  };

  const handleScroll = () => {
    resetField = false;
    if (searchValue !== "") {
      requestData("search", "FIND", searchValue);
    } else {
      if (isEmpty(globFilter)) {
        requestData();
      } else {
        requestData("filter", "FIND", globFilter);
      }
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    resetField = true;
    setData(data.splice(0, data.length));
    requestData("search", "FIND", searchValue);
  };

  const handleChange = e => {
    setTimeout(() => {
      setSearchVal(e.target.value);
    }, 500);
  };

  const renderImg = (item, isModal = false) => {
    if (item === null) return [];

    const imgList = item?.fields["Image"]?.map((figure, index) => {
      if (figure.thumbnails && index <= 3) {
        return (
          <img
            src={figure.thumbnails.large.url}
            alt=''
            className={isModal ? classes.cardImageModal : classes.cardImage}
            key={Math.random() * 100}
          />
        );
      } else {
        return (
          <div className={classes.altMediaFormat}>
            <div>
              <b>Media Type: </b>
              {figure.type}
            </div>
            <div>
              <b>FileName: </b>
              {figure.filename}
            </div>
          </div>
        );
      }
    });

    return imgList?.length > 0 ? imgList[0] : null;
  };

  const renderImgModal = (item, isModal = false) => {
    if (curFigureData.length === 0) return [];
    const imgList = curFigureData.map((figure, index) => {
      return (
        <img
          src={figure}
          alt=''
          className={isModal ? classes.cardImageModal : classes.cardImage}
          key={Math.random() * 100}
        />
      );
    });

    return imgList?.length > 0 ? imgList : null;
  };

  const handleApplyFilter = filterObject => {
    globFilter = filterObject;
    resetField = true;
    setIsMoreEntries(true);
    setData(data.splice(0, data.length));
    requestData("filter", "FIND", filterObject);
  };

  const handleOpen = item => {
    axios
      .get("/api/v1/covic-data/figures", {
        params: {
          baseType: "Figures",
          offset: 0,
          requestAmount: 3,
          queryType: item?.fields.ID,
        },
      })
      .then(response => {
        setCurItem(item);
        setCurFigureData([]);

        response?.data?.records?.forEach(record => {
          if (record?.fields?.Image[0]?.thumbnails?.large?.url) {
            setCurFigureData(curFigureData => [
              ...curFigureData,
              record?.fields?.Image[0]?.thumbnails?.large?.url,
            ]);
          }
        });

        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar className={classes.appBar}>
          <>
            <form className={classes.formHolder}>
              <TextField
                id='standard-full-width'
                style={{ margin: 8 }}
                placeholder='Search Visualizations...'
                helperText='Search'
                fullWidth
                margin='normal'
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
                InputProps={{
                  className: classes.inputText,
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        style={{
                          padding: "0",
                        }}
                        onClick={handleSubmit}
                        type='submit'
                      >
                        <SearchOutlinedIcon
                          style={{
                            fontSize: 65,
                            color: "#C6AD8F",
                            letterSpacing: "-2.5px",
                            opacity: ".5",
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={handleChange}
              />
            </form>
          </>
          <FilterMenu
            handleApplyFilter={handleApplyFilter}
            filteringValues={filteringValues}
          />
        </AppBar>
      </ElevationScroll>
      {isLoading && <CircularProgress className={classes.initLoader} />}
      <Container maxWidth={false} className={classes.containerScroll}>
        <Box my={6}>
          <Grid container spacing={3} style={{ padding: 20 }}>
            <InfiniteScroll
              dataLength={data.length}
              next={data.length === 0 ? () => {} : handleScroll}
              hasMore={isMoreEntries}
              className={classes.box}
            >
              {data.map(item => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={data.length < 4 ? 12 : 6}
                    lg={data.length < 4 ? 12 : 4}
                    xl={data.length < 4 ? 12 : 3}
                    key={item.id}
                  >
                    <Paper className={classes.paper}>
                      <Card key={item.id}>
                        <CardContent className={classes.cardContainer}>
                          {renderImg(item)}
                          <Typography
                            variant='body2'
                            color='textSecondary'
                            component='div'
                          >
                            <p className={classes.cardTitle}>
                              {item?.fields["Title"]}
                            </p>
                          </Typography>
                          <Typography
                            variant='body2'
                            color='textSecondary'
                            component='p'
                          >
                            <b>Published: </b>{" "}
                            {item?.fields["Date (from Article)"]}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='textSecondary'
                            component='p'
                          >
                            <b>Publisher: </b>{" "}
                            {item?.fields["Publisher (from ID copy)"]}
                          </Typography>
                          <Typography
                            variant='body2'
                            color='textSecondary'
                            component='p'
                          >
                            <b>Country: </b>{" "}
                            {item?.fields["Country (from ID copy)"]}
                          </Typography>
                          <div className={classes.cardButtons}>
                            <Button
                              variant='contained'
                              disableElevation
                              className={classes.links}
                              onClick={() => handleOpen(item)}
                              target='_blank'
                            >
                              Quick Look
                            </Button>
                            <Button
                              variant='contained'
                              disableElevation
                              className={classes.links}
                              href={item.fields["URL (from ID copy)"][0]}
                              target='_blank'
                            >
                              Visit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Paper>
                  </Grid>
                );
              })}
            </InfiniteScroll>
          </Grid>
        </Box>
      </Container>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Paper className={classes.paperModal}>
            <Card>
              <CardContent className={classes.cardContainer}>
                <div className={classes.modalIconHolder}>
                  <IconButton
                    className={classes.modalHeaderClose}
                    onClick={handleClose}
                  >
                    <HighlightOffIcon className={classes.filterBtnIcon} />
                  </IconButton>
                </div>
                <div className={classes.modalChipHolder}>
                  <Chip
                    className={classes.chip}
                    label={curItem?.fields["Source Type"]}
                  />
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    component='p'
                    className={classes.modalTextHolder}
                  >
                    {curItem?.fields["Country"]} - {curItem?.fields["Language"]}
                  </Typography>
                </div>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolderHeader}
                >
                  {curItem?.fields["Title"]}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolder}
                >
                  <b>Publisher:</b>{" "}
                  {curItem?.fields["Publisher (from ID copy)"]}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolder}
                >
                  <b>Published:</b> {curItem?.fields["Date (from Article)"]}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolderLast}
                >
                  <b>Subject(s):</b>{" "}
                  {curItem?.fields["Subject(s) (from Article)"]?.map(
                    (subject, index) =>
                      `${subject}${
                        index ===
                        curItem?.fields["Subject(s) (from Article)"].length - 1
                          ? ""
                          : ", "
                      }`
                  )}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolder}
                >
                  {/* {curFigureData} */}
                  {curItem?.fields["Title (from ID copy)"]}
                </Typography>

                <div className={classes.modalImagesHolder}>
                  {renderImgModal(curItem, true)}
                </div>

                <div className={classes.modalButtonHolder}>
                  <Button
                    variant='contained'
                    disableElevation
                    className={classes.links}
                    href={curItem?.fields["URL (from ID copy)"][0]}
                    target='_blank'
                  >
                    Visit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default Articles;
