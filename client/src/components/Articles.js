import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import classNames from "classnames";

import InfiniteScroll from "react-infinite-scroll-component";
import { createTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import ElevationScroll from "./ElavationScroll";

import FilterMenu from "./FilterMenu";
import ToggleMenu from "./ToggleMenu/ToggleMenu";
import CovicExternalNav from "./CovicExternalNav/CovicExternalNav";
import GridContent from "./GridContent";
import ModalHolder from "./ModalHolder";
import { useStyles } from "./styles";
import { format } from "date-fns";
import _uniqueId from "lodash/uniqueId";

let globFilter = {};
let resetField = false;

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const Articles = props => {
  const theme = createTheme();

  const classes = useStyles(theme);
  const [data, setData] = useState([]);
  const [dataIds, setDataIds] = useState([]);
  const [dataOffset, setDataOffset] = useState("");
  const [modalIndex, setModalIndex] = useState(null);
  const [searchValue, setSearchVal] = useState("");
  const [filteringValues, setFilterValues] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const requestAmount = 100;

  const [open, setOpen] = useState(false);
  const [curItem, setCurItem] = useState(null);
  const [curFigureData, setCurFigureData] = useState("");
  const [isMoreEntries, setIsMoreEntries] = useState(true);
  const [toggleOrder, setToggleOrder] = useState(false);
  const [toggleLabels, setToggleLabels] = useState(false);

  const requestData = (
    queryType = "",
    filterType = "",
    term = "",
    fieldCol = "",
    inOrderDisplay = false,
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
          inOrderDisplay,
        },
      })
      .then(response => {
        setIsLoading(false);
        setData(data.concat(response.data.records));
        // for modal paging
        // setDataIds(response.data.records.map(record => record.id));
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
    data.splice(0, data.length);
    setData(data);
    requestData("search", "FIND", searchValue);
  };

  const handleChange = e => {
    setTimeout(() => {
      setSearchVal(e.target.value);
    }, 500);
  };

  const renderImg = (item, isModal = false) => {
    if (item === null) return [];
// if (item?.fields["File Name"].indexOf('.mp4') > -1) {
//   console.log('mp4');
//   console.log(item);
// }

    const imgList = item?.fields["Image"]?.map((figure, index) => {
      if (figure.thumbnails && index <= 3) {
        return (
          <img
            src={figure.thumbnails.large.url}
            alt=''
            className={isModal ? classes.cardImageModal : classes.cardImage}
            key={_uniqueId()}
          />
        );
      } else {
        return (
          <div className={classes.altMediaFormat}>
            <video width="100%" controls>
              <source src={figure.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      }
    });

    return imgList?.length > 0 ? imgList[0] : null;
  };

  const renderImgModal = (item, isModal = false) => {
    if (curFigureData?.video) {
      return (
        <video width="100%" controls>
          <source src={curFigureData.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    return (
      <img
        src={curFigureData?.figures[0]}
        alt=''
        className={isModal ? classes.cardImageModal : classes.cardImage}
        key={_uniqueId()}
      />
    );
  };

  const renderImgArticleFiguresModal = (item, isModal = false) => {
    if (curFigureData.figures.length === 0) return [];
    const imgList = curFigureData.figures.map((figure, index) => {
      return (
        <img
          src={figure}
          alt=''
          className={isModal ? classes.cardImageModal : classes.cardImage}
          key={_uniqueId()}
        />
      );
    });

    return imgList?.length > 0 ? imgList : null;
  };

  const renderImgPageModal = (item, isModal = false) => {
    return (
      <img
        src={curFigureData.pageImage}
        alt=''
        className={isModal ? classes.cardImageModal : classes.cardImage}
        key={_uniqueId()}
      />
    );
  };

  const handleApplyFilter = filterObject => {
    globFilter = filterObject;
    resetField = true;
    setIsMoreEntries(true);
    data.splice(0, data.length);
    setData(data);
    requestData("filter", "FIND", filterObject);
  };

  const handleOpen = item => {
    // for in modal paging
    // setModalIndex(dataIds.indexOf(item.id));

    axios
      .get("/api/v1/covic-data/figures", {
        params: {
          baseType: "Figures",
          offset: 0,
          // requestAmount: 3,
          queryType: item?.fields.ID,
        },
      })
      .then(response => {
        setCurItem(item);
        setCurFigureData(null);
console.log('response data');
console.log(response);
        const curFigObject = {};
        curFigObject.figures = [];

        response?.data?.records?.forEach((record, index) => {
          // set the main image
          if (record?.fields?.Image[0].type === 'video/mp4') {
            curFigObject.video = record?.fields?.Image[0]?.url;
          // if (index === 0) {
          //   curFigObject.mainImage = record?.fields?.Image[0]?.thumbnails?.large?.url;
          // // set the page image
          } else if (record?.fields?.['File Name'].indexOf('-0.') > -1) {
            curFigObject.pageImage = record?.fields?.Image[0]?.thumbnails?.large?.url;
          // add to article figures array
          } else {
            curFigObject.figures.push(record?.fields?.Image[0]?.thumbnails?.large?.url);
          }
        });
        setCurFigureData(curFigObject);
        setOpen(true);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [width] = useWindowSize();
  const getFilterObjectReset = () => {
    const initialStartDate = "2020-01-01T21:11:54";
    const dateFormatting = "MM/dd/yyyy";
    const initialNewDate = new Date(initialStartDate);
    const filterObject = {
      sourceType: [],
      countryType: [],
      languageType: [],
      publisherType: [],
      subjectType: [],
      visualizationType: [],
      visualTechType: [],
      interactionType: [],
      articleTechType: [],
      isDateFilter: false,
      dateRange: [
        format(initialNewDate, dateFormatting),
        format(new Date(), dateFormatting),
      ],
    };

    return filterObject;
  }

  const toggleArticleOrder = (checked) => {
    const filterObject = getFilterObjectReset();
    setToggleOrder(checked);

    globFilter = filterObject;
    resetField = true;
    setIsMoreEntries(true);
    data.splice(0, data.length);
    setData(data);
    requestData("filter", "FIND", filterObject, "", checked);
  }

  const toggleArticleLabel = (checked) => {
    setToggleLabels(checked);
  }

  const getDisplayLabels = () => {
    return toggleLabels ? classes.hideLabelsForToggle : '';
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar className={classes.appBar}>
          <div className={classes.mainHeader}>
            <CovicExternalNav />
            <ToggleMenu 
              toggleOrder={toggleArticleOrder}
              toggleLabel={toggleArticleLabel}
            />
          </div>
          <FilterMenu
            handleApplyFilter={handleApplyFilter}
            filteringValues={filteringValues}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
          />
        </AppBar>
      </ElevationScroll>
      {isLoading && (
        <CircularProgress
          className={classes.initLoader}
          style={{ ...(width > 1280 ? { left: "58%" } : null) }}
        />
      )} 
      <Container maxWidth={false} className={classes.containerScroll}>
        <Box my={6}>
          <Grid
            container
            spacing={3}
            style={{
              padding: width > 1280 ? "60px 20px 20px 344px" : "100px 20px 20px 20px",
            }}
          >
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
                    md={data.length < 4 ? 12 : 12}
                    lg={data.length < 4 ? 12 : 6}
                    xl={data.length < 4 ? 12 : 4}
                    key={item.id}
                  >
                    <Paper className={classes.paper}>
                      <Card key={item.id} elevation={0}>
                        <CardContent className={classNames(classes.cardContainer, toggleLabels ? classes.cardIconSet : '')} onClick={() => { if (toggleLabels) { handleOpen(item) }}}>
                          {renderImg(item)}
                          <GridContent
                            item={item}
                            classes={classes} 
                            getDisplayLabels={getDisplayLabels}
                            handleOpen={handleOpen}
                          />
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
      <ModalHolder 
        classes={classes}
        curItem={curItem}
        data={data}
        // handleOpen={handleOpen}
        handleClose={handleClose}
        modalIndex={modalIndex}
        open={open}
        renderImgArticleFiguresModal={renderImgArticleFiguresModal}
        renderImgModal={renderImgModal}
        renderImgPageModal={renderImgPageModal}
      />
    </div>
  );
};

export default Articles;
