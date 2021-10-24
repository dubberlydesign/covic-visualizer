import React from 'react';

import ModalHeader from './ModalHeader';

const ModalPageImage = ({
  classes,
  curItem, 
  handleClose,
  hasArticleFiguresModal,
  hasPageImageModal,
  modalState,
  renderImgPageModal,
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
        {renderImgPageModal(curItem, true)}
      </div>
    </>
  );
};

export default ModalPageImage;
