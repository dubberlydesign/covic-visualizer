import React from 'react';
import Typography from "@material-ui/core/Typography";

const GridContent = ({item, classes, getDisplayLabels, handleOpen}) => {
  const combinedMetaArray = [
    ...(curItem?.fields['Visualization Type']?.length ? [...curItem?.fields['Visualization Type']] : []),
    ...(curItem?.fields['Visual Technique']?.length ? [...curItem?.fields['Visual Technique']] : []),
    ...(curItem?.fields['Interaction Technique']?.length ? [...curItem?.fields['Interaction Technique']] : [])
  ];

  const getFormattedDate = (date) => {
    const dateParts = date[0]?.split('-');

    return date ? `${dateParts[1]}/${dateParts[2]}/${dateParts[0].slice(2,4)}` : null;
  ;}

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
