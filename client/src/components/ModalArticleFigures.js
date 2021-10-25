import React from 'react';

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
      {renderImgArticleFiguresModal(curItem, true)}
    </>
  );
};

export default ModalArticleFigures;
