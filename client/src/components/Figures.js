import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { makeStyles, createTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: "#F6F4F2",
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
    marginTop: "20px",
    backgroundColor: "#C6AD8F",
    color: "white",
    width: "150px",
  },
}));

const Figures = () => {
  const theme = createTheme();

  const classes = useStyles(theme);
  const [data, setData] = useState([]);
  const [dataOffset, setDataOffset] = useState("");
  const requestAmount = 20;

  const requestData = () => {
    axios
      .get("/api/v1/covic-data/figures", {
        params: { offset: dataOffset, requestAmount },
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
            if (
              item.fields?.Image[0] &&
              item.fields?.Image[0]?.thumbnails?.large.url !== undefined
            ) {
              return (
                <Grid item xs={3}>
                  <Paper className={classes.paper}>
                    <Card key={item.id}>
                      <CardContent className={classes.cardContainer}>
                        <img
                          src={item.fields?.Image[0]?.thumbnails?.large.url}
                          alt=''
                          className={classes.cardImage}
                        />
                        <Typography gutterBottom variant='h5' component='h2'>
                          {item.fields["Date (from Article)"]}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          component='p'
                        >
                          {item.fields["Title"]}
                        </Typography>
                        <Button
                          variant='contained'
                          disableElevation
                          className={classes.links}
                          href={item.fields["URL (from ID copy)"]}
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

export default Figures;
