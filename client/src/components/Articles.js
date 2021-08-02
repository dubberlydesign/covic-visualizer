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

import { useStyles } from "./styles";

const Articles = () => {
  const theme = createTheme();

  const classes = useStyles(theme);
  const [data, setData] = useState([]);
  const [dataOffset, setDataOffset] = useState("");
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

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
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
                <Grid item xs={3}>
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
