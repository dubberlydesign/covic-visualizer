import React from 'react';
import Typography from "@material-ui/core/Typography";

const GridContent = ({item, classes, getDisplayLabels}) => {
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
        {`${item?.fields["Publisher (from ID copy)"]}, ${getFormattedDate(item?.fields["Date (from Article)"])}`}
      </Typography>
      <Typography
        variant='body2'
        color='textSecondary'
        component='p'
        className={getDisplayLabels()}
      >
        {item?.fields['Visualization Type']?.join(', ')}
      </Typography>
      <Typography
        variant='body2'
        color='textSecondary'
        component='p'
        className={getDisplayLabels()}
      >
        {item?.fields["File Name"]}
      </Typography>
    </>
  )
}

export default GridContent;
