import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Typography from "@material-ui/core/Typography";

const ModalHeader = ({classes, curItem, handleClose}) => {
  return (
    <>
      <div className={classes.modalIconHolder}>
        <IconButton
          className={classes.modalHeaderClose}
          onClick={handleClose}
        >
          <HighlightOffIcon className={classes.filterBtnIcon} />
        </IconButton>
      </div>
      <div className={classes.modalChipHolder}>
        <Chip
          className={classes.chip}
          label={curItem?.fields["Source Type"]}
        />
        <Typography
          variant='body2'
          color='textSecondary'
          component='p'
          className={classes.modalTextHolderCountryLang}
        >
          {curItem?.fields["Country (from ID copy)"]} -{" "}
          {curItem?.fields["Language (from Article)"]}
        </Typography>
      </div>
      <Typography
        variant='body2'
        color='textSecondary'
        component='p'
        className={classes.modalTextHolderHeader}
      >
        {curItem?.fields["Title (from ID copy)"]}
      </Typography>
      <Typography
        variant='body2'
        color='textSecondary'
        component='p'
        className={classes.modalTextHolder}
      >
        <b>Publisher:</b>{" "}
        {curItem?.fields["Publisher (from ID copy)"]}
      </Typography>
      <Typography
        variant='body2'
        color='textSecondary'
        component='p'
        className={classes.modalTextHolder}
      >
        <b>Published:</b> {curItem?.fields["Date (from Article)"]}
      </Typography>
      <Typography
        variant='body2'
        color='textSecondary'
        component='p'
        className={classes.modalTextHolderLast}
      >
        <b>Subject(s):</b>{" "}
        {curItem?.fields["Subject(s) (from Article)"]?.map(
          (subject, index) =>
            `${subject}${
              index ===
              curItem?.fields["Subject(s) (from Article)"].length - 1
                ? ""
                : ", "
            }`
        )}
      </Typography>
    </>
  );
};

export default ModalHeader;
