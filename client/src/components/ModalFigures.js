import React from 'react';

import ModalHeader from './ModalHeader';

const ModalFigures = ({
  classes,
  curItem,
  handleClose,
  hasPageImageModal,
  modalState,
  renderImg,
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
      <div className={classes.modalImagesHolder}>
        {renderImg(curItem, true)}
      </div>
    </>
  );
};

export default ModalFigures;
