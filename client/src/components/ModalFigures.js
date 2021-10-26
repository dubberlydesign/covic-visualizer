import React from 'react';

import ModalHeader from './ModalHeader';

const ModalFigures = ({
  classes,
  curItem,
  renderImg,
}) => {

  return (
    <>
      <div className={classes.modalImagesHolder}>
        {renderImg(curItem, true)}
      </div>
    </>
  );
};

export default ModalFigures;
