import React from 'react';
import Button from "@material-ui/core/Button";

import ModalHeader from "./ModalHeader";

const ModalArticleFigures = ({
  classes,
  curItem,
  handleClose,
  hasArticleFiguresModal,
  hasPageImageModal,
  modalState,
  renderImgArticleFiguresModal,
  setModalState
}) => {
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
        {renderImgArticleFiguresModal(curItem, true)}
      </div>
    </>
  );
};

export default ModalArticleFigures;
