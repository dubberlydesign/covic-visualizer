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

const Articles = props => {
  const theme = createTheme();

  const classes = useStyles(theme);
  const [data, setData] = useState([]);
  const [dataOffset, setDataOffset] = useState("");
  const [searchValue, setSearchVal] = useState("");
  const requestAmount = 50;

  const [open, setOpen] = useState(false);
  const [curItem, setCurItem] = useState(null);

  const requestData = (
    queryType = "",
    filterType = "",
    term = "",
    fieldCol = ""
  ) => {
    axios
      .get("/api/v1/covic-data", {
        params: {
          baseType: "Articles",
          offset: dataOffset,
          requestAmount,
          queryType,
          filterType,
          term,
          fieldCol,
        },
      })
      .then(response => {
        setData(data.concat(response.data.records));
        setDataOffset(response.data.offset);
      });
  };

  useEffect(() => {
    requestData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleScroll = () => {
    if (searchValue !== "") {
      requestData("search", "FIND", searchValue);
    } else {
      requestData();
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
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
    if (item?.fields["Figure Count (Figures relation)"] === 0) return null;
    const imgList = item?.fields["Image (from Figures relation)"].map(
      (figure, index) => {
        if (figure.thumbnails && index <= 3) {
          return (
            <img
              src={figure.thumbnails.large.url}
              alt=''
              className={isModal ? classes.cardImageModal : classes.cardImage}
            />
          );
        } else {
          return [];
        }
      }
    );
    if (isModal) {
      return imgList.length > 0 ? imgList : null;
    } else {
      return imgList.length > 0 ? imgList[0] : null;
    }
  };

  const handleApplyFilter = filterObject => {
    setData(data.splice(0, data.length));
    requestData("filter", "FIND", filterObject);
  };

  const handleOpen = item => {
    console.log("dfklasdlfsadjf", item);
    setCurItem(item);
    setOpen(true);
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
          <FilterMenu handleApplyFilter={handleApplyFilter} />
        </AppBar>
      </ElevationScroll>
      <Container maxWidth={false} className={classes.containerScroll}>
        <Box my={6}>
          <Grid container spacing={3} style={{ padding: 20 }}>
            <InfiniteScroll
              dataLength={data.length}
              next={data.length === 0 ? () => {} : handleScroll}
              hasMore={data.length === 0 ? false : true}
              className={classes.box}
              loader={<CircularProgress className={classes.loader} />}
            >
              {data.map(item => {
                if (item.fields && item.fields["Subject Present"] === "okay") {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                      xl={3}
                      key={item.id}
                    >
                      <Paper className={classes.paper}>
                        <Card key={item.id}>
                          <CardContent className={classes.cardContainer}>
                            {renderImg(item)}
                            <Typography
                              variant='body2'
                              color='textSecondary'
                              component='p'
                            >
                              {item?.fields["Title"]}
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
                                href={item.fields["URL"]}
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
                } else {
                  return null;
                }
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
          <Paper className={classes.paper}>
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
                  <Chip className={classes.chip} label='Government' clickable />
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
                  {curItem?.fields["Data Source"] === "None"
                    ? curItem?.fields["Publisher"]
                    : curItem?.fields["Data Source"]}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolderLast}
                >
                  <b>Title:</b> {curItem?.fields["Title"]}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolder}
                >
                  <b>Publisher:</b> {curItem?.fields["Publisher"]}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolder}
                >
                  <b>Published:</b> {curItem?.fields["Date"]}
                </Typography>
                <Typography
                  variant='body2'
                  color='textSecondary'
                  component='p'
                  className={classes.modalTextHolderLast}
                >
                  <b>Date Recorded:</b> {curItem?.fields["Date Recorded"]}
                </Typography>

                <div className={classes.modalImagesHolder}>
                  {renderImg(curItem, true)}
                </div>

                <div className={classes.modalButtonHolder}>
                  <Button
                    variant='contained'
                    disableElevation
                    className={classes.links}
                    href={curItem?.fields["URL"]}
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
