import React from 'react';
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import ModalHeader from './ModalHeader';

const ModalFigures = ({
  classes,
  curItem,
  // data,
  handleClose,
  // handleOpen,
  // modalIndex,
  renderImgModal,
  setModalState
}) => {
  return (
    <>
      <ModalHeader classes={classes} curItem={curItem} handleClose={handleClose} />
      <div className={classes.modalImagesHolder}>
        {renderImgModal(curItem, true)}
      </div>

      <div className={classes.modalButtonHolder}>
        <Button
          variant='contained'
          disableElevation
          className={classes.links}
          href={curItem?.fields["URL (from ID copy)"][0]}
          target='_blank'
        >
          Visit
        </Button>
        <Button
          variant='contained'
          disableElevation
          className={classes.modalButton}
          onClick={() => setModalState('article figures')}
        >
          Article Figures
        </Button>
        {/* <Button
          onClick={() => {
            console.log(modalIndex);
            handleOpen(data[modalIndex + 1])
          }}
        >
          Next
        </Button> */}
      </div>
    </>
  );
};

export default ModalFigures;
