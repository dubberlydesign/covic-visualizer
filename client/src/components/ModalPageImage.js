import React from 'react';

import ModalHeader from './ModalHeader';

const ModalPageImage = ({classes, curItem, renderImgPageModal, setModalState}) => {
  return (
    <>
      <ModalHeader
        classes={classes}
        curItem={curItem}
        handleClose={() => setModalState('article figures')}
      />
      <div className={classes.modalImagesHolder}>
        {renderImgPageModal(curItem, true)}
      </div>
    </>
  );
};

export default ModalPageImage;
