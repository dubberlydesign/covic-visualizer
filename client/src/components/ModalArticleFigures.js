import React from 'react';
import Button from "@material-ui/core/Button";

import ModalHeader from "./ModalHeader";

const ModalArticleFigures = ({
  classes,
  curItem,
  handleClose,
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
        hasPageImageModal={hasPageImageModal}
        modalState={modalState}
        setModalState={setModalState}
      />
      <div className={classes.modalArticleFiguresHolder}>
        {renderImgArticleFiguresModal(curItem, true)}
      </div>
    </>
  );
};

export default ModalArticleFigures;
