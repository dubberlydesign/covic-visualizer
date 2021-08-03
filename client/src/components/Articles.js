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
  const requestAmount = 100;

  const requestData = () => {
    axios
      .get("/api/v1/covic-data", {
        params: {
          baseType: "Articles",
          offset: dataOffset,
          requestAmount,
          filterType: "",
          term: "",
          fieldCol: "",
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
    requestData();
  };

  const handleSubmit = e => {
    console.log("submitting form");
  };

  const handleChange = e => {
    console.log("handle change");
    // setSearchVal(e.target.value);
  };

  return (
    <div className={classes.root}>
      <div>
        <form onSubmit={handleSubmit} className={classes.formHolder}>
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
          next={handleScroll}
          hasMore={true}
          className={classes.box}
          loader={<CircularProgress className={classes.loader} />}
        >
          {data.map(item => {
            if (item.fields) {
              return (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                  <Paper className={classes.paper}>
                    <Card key={item.id}>
                      <CardContent className={classes.cardContainer}>
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
