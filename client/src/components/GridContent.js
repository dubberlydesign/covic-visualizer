import React from 'react';
import Typography from "@material-ui/core/Typography";

const GridContent = ({item, classes, getDisplayLabels, handleOpen}) => {
  return (
    <>
      <Typography
        variant='body2'
        color='textSecondary'
        component='div'
        className={getDisplayLabels()}
      >
        <p className={classes.cardTitle}>
          {item?.fields["Title (from Article)"]}
        </p>
      </Typography>
      <Typography
        variant='body2'
        color='textSecondary'
        component='p'
        className={getDisplayLabels()}
      >
        <b>Published: </b>{" "}
        {item?.fields["Date (from Article)"]}
      </Typography>
      <Typography
        variant='body2'
        color='textSecondary'
        component='p'
        className={getDisplayLabels()}
      >
        <b>Publisher: </b>{" "}
        {item?.fields["Publisher (from ID copy)"]}
      </Typography>
      <Typography
        variant='body2'
        color='textSecondary'
        component='p'
        className={getDisplayLabels()}
      >
        <b>Country: </b>{" "}
        {item?.fields["Country (from ID copy)"]}
      </Typography>
    </>
  )
}

export default GridContent;
