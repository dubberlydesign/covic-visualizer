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
  handleClose,
  hasArticleFiguresModal,
  hasPageImageModal,
  modalState,
  renderImgModal,
  setModalState
}) => {
  console.log('modal figures modal');
  console.log(curItem);
  return (
    <>
      <ModalHeader
        classes={classes}
        curItem={curItem}
        handleClose={handleClose}
        hasArticleFiguresModal={hasArticleFiguresModal}
        hasPageImageModal={hasPageImageModal}
        modalState={modalState}
        setModalState={setModalState}
      />
      <div className={classes.modalImagesHolder}>
        {renderImgModal(curItem, true)}
      </div>
    </>
  );
};

export default ModalFigures;
