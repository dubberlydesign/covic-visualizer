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
  setModalState,
  totalFiguresInModal,
}) => {

  const combinedMetaArray = [
    ...(curItem?.fields['Visualization Type']?.length ? [...curItem?.fields['Visualization Type']] : []),
    ...(curItem?.fields['Visual Technique']?.length ? [...curItem?.fields['Visual Technique']] : []),
    ...(curItem?.fields['Interaction Technique']?.length ? [...curItem?.fields['Interaction Technique']] : [])
  ];

  const getFormattedDate = (date) => {
    const dateParts = date[0]?.split('-');

    return date ? `${dateParts[1]}/${dateParts[2]}/${dateParts[0].slice(2,4)}` : null;
  };

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
            {getFormattedDate(curItem?.fields["Date (from Article)"])}
          </Typography>
          <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.modalTextHolder}
          >
            {curItem?.fields["Subject(s) (from Article)"]?.join(', ')}
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
      {modalState === 'article figures' && <div>
        <Typography
            variant='body2'
            color='textSecondary'
            component='p'
            className={classes.modalTextHolderCountryLang}
        >
          {`${totalFiguresInModal} ${totalFiguresInModal > 1 ? 'Figures' : 'Figure'}`}
        </Typography>
      </div>}
    </div>
  );
};

export default ModalHeader;
