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

import { useStyles } from "./styles";

const Articles = () => {
  const theme = createTheme();

  const classes = useStyles(theme);
  const [data, setData] = useState([]);
  const [dataOffset, setDataOffset] = useState("");
  const [searchValue, setSearchVal] = useState("");
  const requestAmount = 150;

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
        console.log("DATA", response.data.records);
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
    setDataOffset("");
    requestData("search", "FIND", searchValue);
  };

  const handleChange = e => {
    setTimeout(() => {
      setSearchVal(e.target.value);
    }, 500);
  };

  const renderImg = item => {
    if (item?.fields["Figure Count (Figures relation)"] === 0) return null;
    const imgList = item?.fields["Image (from Figures relation)"].map(
      figure => {
        if (figure.thumbnails) {
          return (
            <img
              src={figure.thumbnails.large.url}
              alt=''
              className={classes.cardImage}
            />
          );
        }
      }
    );
    return imgList.length > 0 ? imgList[0] : null;
  };

  return (
    <div className={classes.root}>
      <div>
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
      </div>
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
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={item.id}>
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
                        <Button
                          variant='contained'
                          disableElevation
                          className={classes.links}
                          href={item.fields["URL"]}
                          target='_blank'
                        >
                          Learn More
                        </Button>
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
    </div>
  );
};

export default Articles;
