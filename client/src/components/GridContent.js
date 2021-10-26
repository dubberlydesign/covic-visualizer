import React from 'react';
import classNames from 'classnames';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
      <div className={classNames(classes.cardButtons, getDisplayLabels())}>
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
    </>
  )
}

export default GridContent;
