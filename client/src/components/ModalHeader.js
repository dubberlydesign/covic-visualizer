import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const ModalHeader = ({
  classes,
  curItem,
  data,
  handleClose,
  handleOpen,
  hasPageImageModal,
  modalIndex,
  modalState,
  pdf,
  setModalState
}) => {

  const combinedMetaArray = [];
  if (curItem?.fields['Visualization Type']) {
    combinedMetaArray.push(curItem.fields['Visualization Type']);
  }
  if (curItem?.fields['Visual Technique']) {
    combinedMetaArray.push(curItem.fields['Visual Technique']);
  }
  if(curItem?.fields['Interaction Technique']) {
    combinedMetaArray.push(curItem?.fields['Interaction Technique']);
  }

  return (
    <div className={classes.ModalHeaderWrapper}>
      <div className={classes.ModalHeaderNavWrapper}>
        <Button
          variant='contained'
          disabled={modalState === 'figures'}
          disableElevation
          className={classes.modalButton}
          onClick={() => setModalState('figures')}
        >
          Figure
        </Button>
        <Button
          variant='contained'
          disabled={modalState === 'article figures'}
          disableElevation
          className={classes.modalButton}
          onClick={() => setModalState('article figures')}
        >
          In Article
        </Button>
        <Button
          variant='contained'
          disabled={modalState === 'page image' || !hasPageImageModal}
          disableElevation
          className={classes.modalButton}
          onClick={() => {
            if (pdf) {
              window.open(pdf);
              return;
            }
            setModalState('page image');
          }}
        >
          Page
        </Button>
        <Button
          variant='contained'
          disableElevation
          className={classes.modalButton}
          href={curItem?.fields["URL (from ID copy)"][0]}
          target='_blank'
        >
          Visit
        </Button>
        <div className={classes.modalIconHolder}>
          <IconButton
            className={classes.modalHeaderClose}
            onClick={handleClose}
          >
            <HighlightOffIcon className={classes.filterBtnIcon} />
          </IconButton>
        </div>
      </div>
      <div className={classes.modalHeaderPagingContainer}>
        {modalIndex !== 0 &&
          <IconButton
            className={classes.modalHeaderPrevious}
            onClick={() => {
              setModalState('figures');
              handleOpen(data[modalIndex - 1]);
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        }
        {modalIndex !== data.length - 1 &&
          <IconButton
            className={classes.modalHeaderNext}
            onClick={() => {
              setModalState('figures');
              handleOpen(data[modalIndex + 1]);
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        }
      </div>
      {/*METADATA INFO STARTS HERE */}
      {/*Publisher, Country: Language */}
      <div className={classes.modalHeaderMetaContainer}>
        <div className={classes.modalHeaderMetaLeftColumn}>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.modalTextHolder}
          >
            {curItem?.fields["Publisher (from ID copy)"]}, {curItem?.fields["Country (from ID copy)"]}: {curItem?.fields["Language (from Article)"]}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.modalTextHolderHeader}
          >
            {curItem?.fields["Title (from Article)"]}
          </Typography>
          {modalState === 'figures' &&<Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.modalTextHolder}
          >
            {curItem?.fields["File Name"]}
          </Typography>}
        </div>
        <div className={classes.modalHeaderMetaRightColumn}>
          <Chip
            className={classes.chip}
            label={curItem?.fields["Source Type"]}
          />
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.modalTextHolder}
          >
            {curItem?.fields["Date (from Article)"]}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.modalTextHolder}
          >
            Subject(s): {curItem?.fields["Subject(s) (from Article)"]?.join(', ')}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.modalTextHolder}
          >
            {curItem?.fields["Article Technique (from Article)"]?.join(', ')}
          </Typography>
        </div>
      </div>
      {modalState === 'figures' && <div>
        <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.modalTextHolderCountryLang}
        >
          {combinedMetaArray?.join(', ')}
        </Typography>
      </div>}
      {/*METATDATA INFO ENDS HERE */}
    </div>
  );
};

export default ModalHeader;
